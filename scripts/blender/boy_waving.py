import math
import os
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path.cwd()
OUTPUT_DIR = ROOT / "assets" / "blender"
PREVIEW_DIR = OUTPUT_DIR / "previews"
BLEND_PATH = OUTPUT_DIR / "boy_waving.blend"


def ensure_dirs():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)


def parent_keep_transform(child, parent):
    child.parent = parent
    child.matrix_parent_inverse = parent.matrix_world.inverted()


def set_material(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)


def shade_smooth(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.shade_smooth()
    bpy.ops.object.select_all(action="DESELECT")


def add_bevel(obj, width=0.04, segments=4):
    modifier = obj.modifiers.new(name="Bevel", type="BEVEL")
    modifier.width = width
    modifier.segments = segments
    modifier.limit_method = "ANGLE"


def make_material(name, color, roughness=0.55, metallic=0.0):
    material = bpy.data.materials.new(name=name)
    material.use_nodes = True
    bsdf = material.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return material


def add_cube(name, location, scale, material, bevel=0.03):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    if bevel:
        add_bevel(obj, width=bevel)
    set_material(obj, material)
    shade_smooth(obj)
    return obj


def add_uv_sphere(name, location, radius, material, scale=(1.0, 1.0, 1.0)):
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=radius,
        location=location,
        segments=48,
        ring_count=24,
    )
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    set_material(obj, material)
    shade_smooth(obj)
    return obj


def add_cylinder(name, location, radius, depth, material, rotation=(0.0, 0.0, 0.0)):
    bpy.ops.mesh.primitive_cylinder_add(
        radius=radius,
        depth=depth,
        location=location,
        rotation=rotation,
        vertices=32,
    )
    obj = bpy.context.active_object
    obj.name = name
    set_material(obj, material)
    shade_smooth(obj)
    return obj


def add_empty(name, location, size=0.14):
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=location)
    empty = bpy.context.active_object
    empty.name = name
    empty.empty_display_size = size
    return empty


def look_at(obj, target, track="-Z", up="Y"):
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat(track, up).to_euler()


def create_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ensure_dirs()

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.resolution_percentage = 100
    scene.render.fps = 24
    scene.frame_start = 1
    scene.frame_end = 96
    scene.frame_current = 1

    if hasattr(scene, "eevee"):
        if hasattr(scene.eevee, "taa_render_samples"):
            scene.eevee.taa_render_samples = 64
        if hasattr(scene.eevee, "use_gtao"):
            scene.eevee.use_gtao = True

    world = scene.world
    if world is None:
        world = bpy.data.worlds.new("World")
        scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (0.92, 0.96, 1.0, 1.0)
    bg.inputs[1].default_value = 0.9

    materials = {
        "skin": make_material("Skin", (0.965, 0.78, 0.67), roughness=0.62),
        "hair": make_material("Hair", (0.17, 0.12, 0.09), roughness=0.55),
        "shirt": make_material("Shirt", (0.20, 0.48, 0.92), roughness=0.38),
        "shorts": make_material("Shorts", (0.09, 0.17, 0.31), roughness=0.48),
        "shoe": make_material("Shoe", (0.96, 0.96, 0.98), roughness=0.42),
        "eye_white": make_material("EyeWhite", (1.0, 1.0, 1.0), roughness=0.15),
        "pupil": make_material("Pupil", (0.05, 0.05, 0.07), roughness=0.25),
        "ground": make_material("Ground", (0.84, 0.89, 0.92), roughness=0.95),
        "shadow": make_material("Shadow", (0.74, 0.80, 0.85), roughness=1.0),
    }

    ground = add_cube(
        "Ground",
        location=(0.0, 0.12, -0.07),
        scale=(4.6, 1.6, 0.06),
        material=materials["ground"],
        bevel=0.02,
    )
    shadow = add_uv_sphere(
        "ShadowBlob",
        location=(0.0, -0.02, 0.01),
        radius=0.45,
        material=materials["shadow"],
        scale=(1.4, 0.44, 0.08),
    )

    bpy.ops.object.camera_add(location=(0.0, -7.0, 1.45))
    camera = bpy.context.active_object
    camera.name = "Camera"
    look_at(camera, Vector((0.0, 0.0, 1.18)))
    camera.data.lens = 45
    scene.camera = camera

    bpy.ops.object.light_add(type="AREA", location=(-2.2, -2.9, 4.5))
    key_light = bpy.context.active_object
    key_light.data.energy = 3400
    key_light.data.shape = "RECTANGLE"
    key_light.data.size = 5.5
    key_light.data.size_y = 3.5
    look_at(key_light, Vector((0.0, 0.0, 1.2)), track="-Z", up="Y")

    bpy.ops.object.light_add(type="POINT", location=(2.5, -1.8, 2.8))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 700
    fill_light.data.shadow_soft_size = 1.3

    boy_root = add_empty("Boy_Root", (0.0, 0.0, 0.84), size=0.18)
    head_ctrl = add_empty("Head_CTRL", (0.0, 0.0, 1.72), size=0.12)
    parent_keep_transform(head_ctrl, boy_root)

    pelvis = add_cube(
        "Pelvis",
        location=(0.0, 0.0, 0.74),
        scale=(0.22, 0.12, 0.15),
        material=materials["shorts"],
    )
    torso = add_cube(
        "Torso",
        location=(0.0, 0.0, 1.15),
        scale=(0.32, 0.14, 0.34),
        material=materials["shirt"],
    )
    neck = add_cylinder(
        "Neck",
        location=(0.0, 0.0, 1.46),
        radius=0.07,
        depth=0.14,
        material=materials["skin"],
    )
    head = add_uv_sphere(
        "Head",
        location=(0.0, 0.0, 1.72),
        radius=0.23,
        material=materials["skin"],
        scale=(1.0, 0.95, 1.06),
    )
    hair = add_uv_sphere(
        "Hair",
        location=(0.0, 0.03, 1.82),
        radius=0.235,
        material=materials["hair"],
        scale=(1.02, 0.88, 0.72),
    )
    fringe = add_cube(
        "Fringe",
        location=(0.0, -0.13, 1.83),
        scale=(0.19, 0.03, 0.05),
        material=materials["hair"],
        bevel=0.015,
    )
    eye_l = add_uv_sphere(
        "Eye_L",
        location=(-0.082, -0.20, 1.74),
        radius=0.042,
        material=materials["eye_white"],
        scale=(1.0, 0.42, 1.0),
    )
    eye_r = add_uv_sphere(
        "Eye_R",
        location=(0.082, -0.20, 1.74),
        radius=0.042,
        material=materials["eye_white"],
        scale=(1.0, 0.42, 1.0),
    )
    pupil_l = add_uv_sphere(
        "Pupil_L",
        location=(-0.082, -0.225, 1.74),
        radius=0.018,
        material=materials["pupil"],
        scale=(1.0, 0.4, 1.0),
    )
    pupil_r = add_uv_sphere(
        "Pupil_R",
        location=(0.082, -0.225, 1.74),
        radius=0.018,
        material=materials["pupil"],
        scale=(1.0, 0.4, 1.0),
    )

    leg_l = add_cylinder(
        "Leg_L",
        location=(-0.12, 0.0, 0.36),
        radius=0.085,
        depth=0.7,
        material=materials["skin"],
    )
    leg_r = add_cylinder(
        "Leg_R",
        location=(0.12, 0.0, 0.36),
        radius=0.085,
        depth=0.7,
        material=materials["skin"],
    )
    foot_l = add_cube(
        "Foot_L",
        location=(-0.12, -0.03, 0.03),
        scale=(0.13, 0.19, 0.055),
        material=materials["shoe"],
        bevel=0.018,
    )
    foot_r = add_cube(
        "Foot_R",
        location=(0.12, -0.03, 0.03),
        scale=(0.13, 0.19, 0.055),
        material=materials["shoe"],
        bevel=0.018,
    )

    shoulder_r = add_empty("Shoulder_R_CTRL", (0.34, 0.0, 1.26))
    elbow_r = add_empty("Elbow_R_CTRL", (0.82, 0.0, 1.26), size=0.11)
    upper_arm_r = add_cylinder(
        "UpperArm_R",
        location=(0.58, 0.0, 1.26),
        radius=0.07,
        depth=0.48,
        material=materials["skin"],
        rotation=(0.0, math.radians(90.0), 0.0),
    )
    forearm_r = add_cylinder(
        "Forearm_R",
        location=(1.03, 0.0, 1.26),
        radius=0.064,
        depth=0.42,
        material=materials["skin"],
        rotation=(0.0, math.radians(90.0), 0.0),
    )
    hand_r = add_uv_sphere(
        "Hand_R",
        location=(1.27, 0.0, 1.26),
        radius=0.09,
        material=materials["skin"],
        scale=(1.05, 0.7, 0.72),
    )

    shoulder_l = add_empty("Shoulder_L_CTRL", (-0.34, 0.0, 1.26))
    elbow_l = add_empty("Elbow_L_CTRL", (-0.82, 0.0, 1.26), size=0.11)
    upper_arm_l = add_cylinder(
        "UpperArm_L",
        location=(-0.58, 0.0, 1.26),
        radius=0.07,
        depth=0.48,
        material=materials["skin"],
        rotation=(0.0, math.radians(90.0), 0.0),
    )
    forearm_l = add_cylinder(
        "Forearm_L",
        location=(-1.03, 0.0, 1.26),
        radius=0.064,
        depth=0.42,
        material=materials["skin"],
        rotation=(0.0, math.radians(90.0), 0.0),
    )
    hand_l = add_uv_sphere(
        "Hand_L",
        location=(-1.27, 0.0, 1.26),
        radius=0.09,
        material=materials["skin"],
        scale=(1.05, 0.7, 0.72),
    )

    for obj in (
        pelvis,
        torso,
        neck,
        leg_l,
        leg_r,
        foot_l,
        foot_r,
        shoulder_r,
        shoulder_l,
    ):
        parent_keep_transform(obj, boy_root)

    for obj in (head, hair, fringe, eye_l, eye_r, pupil_l, pupil_r):
        parent_keep_transform(obj, head_ctrl)

    parent_keep_transform(elbow_r, shoulder_r)
    parent_keep_transform(upper_arm_r, shoulder_r)
    parent_keep_transform(forearm_r, elbow_r)
    parent_keep_transform(hand_r, elbow_r)

    parent_keep_transform(elbow_l, shoulder_l)
    parent_keep_transform(upper_arm_l, shoulder_l)
    parent_keep_transform(forearm_l, elbow_l)
    parent_keep_transform(hand_l, elbow_l)

    shoulder_l.rotation_euler = (0.0, math.radians(-68.0), 0.0)
    elbow_l.rotation_euler = (0.0, math.radians(-8.0), 0.0)

    wave_keys = [
        (1, -40.0, -28.0, -2.5, -2.0, 0.00, 1.5),
        (12, -56.0, -10.0, 1.5, 2.0, 0.03, -1.0),
        (24, -34.0, -52.0, -1.5, -2.0, 0.00, 1.0),
        (36, -58.0, -10.0, 1.8, 2.5, 0.03, -1.5),
        (48, -34.0, -54.0, -1.6, -2.0, 0.00, 1.2),
        (60, -56.0, -12.0, 1.5, 2.0, 0.03, -1.2),
        (72, -34.0, -52.0, -1.5, -2.0, 0.00, 1.0),
        (84, -56.0, -10.0, 1.5, 2.2, 0.03, -1.2),
        (96, -40.0, -28.0, -2.5, -2.0, 0.00, 1.5),
    ]

    for frame, shoulder_angle, elbow_angle, head_tilt, body_tilt, body_lift, body_shift in wave_keys:
        scene.frame_set(frame)

        shoulder_r.rotation_euler = (0.0, math.radians(shoulder_angle), 0.0)
        elbow_r.rotation_euler = (0.0, math.radians(elbow_angle), 0.0)
        head_ctrl.rotation_euler = (0.0, 0.0, math.radians(head_tilt))
        boy_root.rotation_euler = (0.0, 0.0, math.radians(body_tilt))
        boy_root.location = (0.0, 0.0, 0.84 + body_lift)
        torso.location.x = body_shift * 0.003

        shoulder_r.keyframe_insert(data_path="rotation_euler", frame=frame)
        elbow_r.keyframe_insert(data_path="rotation_euler", frame=frame)
        head_ctrl.keyframe_insert(data_path="rotation_euler", frame=frame)
        boy_root.keyframe_insert(data_path="rotation_euler", frame=frame)
        boy_root.keyframe_insert(data_path="location", frame=frame)
        torso.keyframe_insert(data_path="location", frame=frame)

    scene.frame_set(1)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))

    preview_frames = [(12, PREVIEW_DIR / "boy_waving_012.png"), (24, PREVIEW_DIR / "boy_waving_024.png")]
    for frame, path in preview_frames:
        scene.frame_set(frame)
        scene.render.filepath = str(path)
        bpy.ops.render.render(write_still=True)


if __name__ == "__main__":
    create_scene()
