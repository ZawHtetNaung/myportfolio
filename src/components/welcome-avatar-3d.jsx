import { motion } from 'framer-motion'

export default function WelcomeAvatar3D() {
  return (
    <div className="relative mb-5 h-56 w-full max-w-[300px] sm:h-64">
      <motion.div
        className="absolute bottom-2 left-[38%] h-[182px] w-[120px] -translate-x-1/2"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full bg-slate-300" />

        <div className="absolute left-1/2 top-[52px] h-[78px] w-[12px] -translate-x-1/2 rounded-full bg-slate-300" />
        <div className="absolute left-1/2 top-[56px] h-[10px] w-[52px] -translate-x-1/2 rounded-full bg-slate-300" />
        <div className="absolute left-1/2 top-[120px] h-[12px] w-[18px] -translate-x-1/2 rounded-full bg-slate-300" />

        <motion.div
          className="absolute left-1/2 top-[61px] origin-left"
          initial={{ rotate: 145 }}
          animate={{ rotate: [145, 120, 145] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-[10px] w-[74px] rounded-full bg-slate-300" />
          <div className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-slate-300" />
        </motion.div>

        <div className="absolute left-1/2 top-[61px] origin-left rotate-[35deg]">
          <div className="h-[10px] w-[74px] rounded-full bg-slate-300" />
          <div className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-slate-300" />
        </div>

        <div className="absolute left-1/2 top-[128px] origin-top -rotate-[14deg]">
          <div className="h-[52px] w-[10px] rounded-full bg-slate-300" />
          <div className="absolute -left-[1px] -bottom-1 h-4 w-4 rounded-full bg-slate-300" />
        </div>
        <div className="absolute left-1/2 top-[128px] origin-top rotate-[14deg]">
          <div className="h-[52px] w-[10px] rounded-full bg-slate-300" />
          <div className="absolute -left-[1px] -bottom-1 h-4 w-4 rounded-full bg-slate-300" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute top-0 z-10"
        style={{ right: -98 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="188" height="126" viewBox="0 0 188 126" fill="none">
          <ellipse cx="108" cy="44" rx="76" ry="38" fill="white" stroke="#111827" strokeWidth="3.2" />
          <circle cx="45" cy="92" r="13" fill="white" stroke="#111827" strokeWidth="3.2" />
          <circle cx="18" cy="111" r="9" fill="white" stroke="#111827" strokeWidth="3" />
          <motion.text
            x="108"
            y="55"
            textAnchor="middle"
            fill="#b91c1c"
            fontSize="22"
            fontStyle="italic"
            fontWeight="600"
            fontFamily="'Segoe Script', 'Brush Script MT', cursive"
            animate={{ opacity: [0.88, 1, 0.9] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            Welcome
          </motion.text>
        </svg>
      </motion.div>
    </div>
  )
}
