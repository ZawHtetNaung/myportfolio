import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
  Phone,
  Server,
  Sparkles,
  Zap,
  Wrench
} from 'lucide-react'

import SectionHeader from './components/section-header'
import WelcomeAvatar3D from './components/welcome-avatar-3d'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { cn } from './lib/utils'
import {
  education,
  experiences,
  heroStats,
  navLinks,
  portfolioFilters,
  profile,
  projects,
  services,
  skillGroups
} from './lib/data'

const aboutHighlights = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    text: 'Laravel, Vue.js, React.js, Node.js, and REST API integration.'
  },
  {
    icon: Sparkles,
    title: 'SEO & Analytics',
    text: 'Technical SEO, speed optimization, and campaign performance tracking.'
  },
  {
    icon: Server,
    title: 'Cloud & Server Ops',
    text: 'AWS, DigitalOcean, Linux setup, security hardening, and maintenance.'
  }
]

const serviceIcons = [Code2, Server, Sparkles, BriefcaseBusiness, Database, Wrench]

const quickStats = [
  { label: 'Core Strength', value: 'Full-Stack Development' },
  { label: 'Focus', value: 'SEO + E-Commerce Growth' },
  { label: 'Availability', value: 'Dubai / Remote Friendly' }
]

const backgroundPathOne = 'M -120 190 C 220 20, 520 60, 780 240 C 1040 420, 1320 460, 1720 260'
const backgroundPathTwo = 'M -180 540 C 180 360, 520 410, 820 620 C 1120 830, 1380 880, 1780 690'
const backgroundPathThree = 'M -140 900 C 200 730, 540 770, 860 980 C 1180 1190, 1460 1230, 1840 1060'

const floatingSkills = [
  { icon: Palette, text: 'UI/UX Design', className: '-left-4 top-6 sm:-left-10 lg:-left-16', duration: 7.6 },
  { icon: Code2, text: 'Development', className: '-right-3 top-1/2 -translate-y-1/2 sm:-right-9 lg:-right-14', duration: 8.6 },
  { icon: Zap, text: 'Creative Ideas', className: 'left-4 -bottom-4 sm:left-8 sm:-bottom-6', duration: 7.2 }
]

const easeOutExpo = [0.22, 1, 0.36, 1]

const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08
    }
  }
}

const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easeOutExpo
    }
  }
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 65, damping: 22, mass: 0.4 })
  const pathDraw = useTransform(smoothScroll, [0, 1], [0.1, 1])
  const pathOpacity = useTransform(smoothScroll, [0, 0.2, 0.65, 1], [0.2, 0.5, 0.75, 0.95])
  const lineDrift = useTransform(smoothScroll, [0, 1], [0, -180])
  const secondaryDrift = useTransform(smoothScroll, [0, 1], [0, -320])
  const grainShift = useTransform(smoothScroll, [0, 1], [0, -110])
  const glowOneY = useTransform(smoothScroll, [0, 1], [-60, 220])
  const glowTwoY = useTransform(smoothScroll, [0, 1], [100, -180])
  const glowThreeY = useTransform(smoothScroll, [0, 1], [40, -90])

  const headlinePhrases = useMemo(
    () =>
      profile.headline
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    []
  )

  useEffect(() => {
    if (headlinePhrases.length < 2) return undefined
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlinePhrases.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [headlinePhrases.length])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(75% 62% at 12% 12%, rgba(37,99,235,0.24) 0%, rgba(37,99,235,0) 62%), radial-gradient(70% 56% at 88% 20%, rgba(14,165,233,0.24) 0%, rgba(14,165,233,0) 64%), linear-gradient(180deg, rgba(248,250,252,0.84) 0%, rgba(241,245,249,0.98) 100%)',
            y: grainShift
          }}
        />

        <motion.div
          className="absolute -left-52 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand-300/45 blur-[120px]"
          style={{ y: glowOneY }}
          animate={{ x: [0, 42, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-44 top-[26%] h-[30rem] w-[30rem] rounded-full bg-sky-300/40 blur-[130px]"
          style={{ y: glowTwoY }}
          animate={{ x: [0, -38, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[70%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-blue-200/45 blur-[120px]"
          style={{ y: glowThreeY }}
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <svg className="absolute inset-0 h-full w-full opacity-95" viewBox="0 0 1600 1200" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bg-route-gradient" x1="0" y1="0" x2="1600" y2="1200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="0.5" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          <motion.g style={{ y: lineDrift }}>
            <path d={backgroundPathOne} stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="12 14" opacity="0.38" />
            <path d={backgroundPathTwo} stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="12 14" opacity="0.3" />
            <path d={backgroundPathThree} stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="12 14" opacity="0.22" />

            <motion.path
              d={backgroundPathOne}
              stroke="url(#bg-route-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ pathLength: pathDraw, opacity: pathOpacity }}
            />
            <motion.path
              d={backgroundPathTwo}
              stroke="url(#bg-route-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ pathLength: pathDraw, opacity: pathOpacity }}
            />
          </motion.g>

          <motion.path
            d={backgroundPathThree}
            stroke="url(#bg-route-gradient)"
            strokeWidth="4.6"
            strokeLinecap="round"
            style={{ pathLength: pathDraw, opacity: pathOpacity, y: secondaryDrift }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            y: grainShift,
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0px, rgba(15,23,42,0.06) 1px, transparent 1px, transparent 140px), repeating-linear-gradient(90deg, rgba(15,23,42,0.04) 0px, rgba(15,23,42,0.04) 1px, transparent 1px, transparent 140px)'
          }}
        />
      </div>

      <motion.header
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-slate-100/90 backdrop-blur"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-3">
          <a href="#home" className="text-lg font-bold text-slate-900 transition-colors hover:text-brand-700">
            {profile.name}
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>

          <Button variant="outline" size="sm" asChild>
            <a href={profile.cvPath} target="_blank" rel="noreferrer noopener">
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>
        </div>
      </motion.header>

      <main className="relative z-10 space-y-10 py-8 sm:space-y-14 sm:py-12">
        <section id="home" className="section-shell">
          <Reveal>
            <div className="section-wrap grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: easeOutExpo }}
              >
                <WelcomeAvatar3D />
                <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wide">
                  {profile.role}
                </Badge>
                <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">{profile.name}</h1>

                <p className="mt-3 min-h-7 text-brand-700 sm:min-h-8">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={headlinePhrases[headlineIndex]}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: easeOutExpo }}
                      className="inline-block font-medium"
                    >
                      {headlinePhrases[headlineIndex]}
                    </motion.span>
                  </AnimatePresence>
                </p>

                <p className="mt-5 max-w-2xl text-slate-600">{profile.summary}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="#portfolio">View Projects</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#contact">Get In Touch</a>
                  </Button>
                </div>

                <motion.div
                  className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {heroStats.map((stat) => (
                    <motion.div key={stat.label} variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <Card className="rounded-xl border-slate-200 bg-slate-50 transition-shadow hover:shadow-md">
                        <CardContent className="p-4">
                          <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-sm text-slate-600">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="mx-auto w-full max-w-xl"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: easeOutExpo }}
              >
                <div className="relative mx-auto max-w-[520px]">
                  <motion.div
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gradient-to-br from-brand-600 to-sky-500"
                    animate={{ x: [16, 20, 16], y: [16, 20, 16] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <motion.div
                    className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="aspect-[4/5] w-full bg-slate-100">
                      <img src={profile.image} alt={profile.name} className="h-full w-full object-cover object-top" />
                    </div>
                  </motion.div>

                  {floatingSkills.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.text}
                        className={cn(
                          'absolute z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur sm:text-base',
                          item.className
                        )}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                        transition={{
                          opacity: { duration: 0.6, delay: 0.15 + index * 0.12, ease: easeOutExpo },
                          scale: { duration: 0.6, delay: 0.15 + index * 0.12, ease: easeOutExpo },
                          y: { duration: item.duration, delay: 0.2 + index * 0.12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <Icon className="h-5 w-5 text-brand-600" />
                        <span>{item.text}</span>
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
                >
                  <img src={profile.signature} alt="Zaw Htet Naung signature" className="mx-auto w-64 max-w-full opacity-90" />
                  <p className="mt-3 text-sm italic text-slate-500">
                    Delivering modern, efficient, and feature-rich web applications.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="about" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="About"
                title="Building practical, business-focused web systems"
                description="From Myanmar to UAE projects, I deliver full-stack platforms that balance speed, maintainability, conversion, and operational reliability."
              />

              <motion.div
                className="grid gap-4 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {aboutHighlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.title} variants={fadeItem} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <Card className="rounded-2xl border-slate-200 bg-slate-50 transition-shadow hover:shadow-md">
                        <CardHeader>
                          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-600">{item.text}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>

              <motion.div
                className="mt-6 grid gap-3 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {quickStats.map((item) => (
                  <motion.div key={item.label} variants={fadeItem}>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm transition-transform duration-300 hover:-translate-y-1">
                      <p className="font-semibold text-slate-900">{item.value}</p>
                      <p className="mt-1 text-slate-500">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="Skills"
                title="Technical Skills"
                description="Production stack and tools used across web apps, e-commerce systems, and cloud operations."
              />

              <motion.div
                className="grid gap-4 md:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {skillGroups.map((group) => (
                  <motion.div key={group.title} variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                    <Card className="rounded-2xl border-slate-200 transition-shadow hover:shadow-md">
                      <CardHeader>
                        <CardTitle>{group.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {group.items.map((skill) => (
                          <div key={skill.name}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="text-slate-700">{skill.name}</span>
                              <span className="font-medium text-slate-500">{skill.level}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                              <motion.div
                                className="h-full rounded-full bg-brand-600"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 1.05, ease: easeOutExpo }}
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="resume" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="Resume"
                title="Experience & Education"
                description="Career history and academic background aligned with my CV."
              />

              <div className="grid gap-5 lg:grid-cols-2">
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <BriefcaseBusiness className="h-5 w-5 text-brand-600" />
                    Professional Journey
                  </div>
                  {experiences.map((job) => (
                    <motion.div key={`${job.company}-${job.duration}`} variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <Card className="rounded-2xl border-slate-200 transition-shadow hover:shadow-md">
                        <CardHeader>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription className="mt-1 text-slate-700">{job.company}</CardDescription>
                            </div>
                            <Badge variant="outline">{job.duration}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600">{job.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.links.map((link) => (
                              <Button key={link.href} variant="outline" size="sm" asChild>
                                <a href={link.href} target="_blank" rel="noreferrer noopener">
                                  {link.label}
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <GraduationCap className="h-5 w-5 text-brand-600" />
                    Education
                  </div>
                  {education.map((item) => (
                    <motion.div key={`${item.degree}-${item.year}`} variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <Card className="rounded-2xl border-slate-200 transition-shadow hover:shadow-md">
                        <CardHeader>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <CardTitle>{item.degree}</CardTitle>
                              <CardDescription className="mt-1 text-slate-700">{item.school}</CardDescription>
                            </div>
                            <Badge variant="secondary">{item.year}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600">{item.details}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="services" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="Services"
                title="What I Deliver"
                description="Core services based on real-world project delivery and production support."
              />

              <motion.div
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {services.map((service, idx) => {
                  const Icon = serviceIcons[idx % serviceIcons.length]
                  return (
                    <motion.div key={service.title} variants={fadeItem} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <Card className="rounded-2xl border-slate-200 bg-slate-50 transition-shadow hover:shadow-md">
                        <CardHeader>
                          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-base">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-600">{service.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="portfolio" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="Portfolio"
                title="Selected Projects"
                description="Real projects from corporate, e-commerce, and platform work."
              />

              <motion.div
                className="mb-6 flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {portfolioFilters.map((filter) => (
                  <motion.div key={filter.key} variants={fadeItem} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant={activeFilter === filter.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveFilter(filter.key)}
                    >
                      {filter.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: easeOutExpo }}
                    >
                      <Card className="group overflow-hidden rounded-2xl border-slate-200 bg-white transition-shadow hover:shadow-md">
                        <div
                          className={cn(
                            'relative aspect-[4/3] overflow-hidden bg-slate-50',
                            project.logo ? 'bg-white p-5' : '',
                            project.customLogoClass ?? ''
                          )}
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className={cn(
                              'h-full w-full transition-transform duration-500',
                              project.logo ? 'object-contain' : 'object-cover group-hover:scale-105'
                            )}
                          />

                          <div className="absolute inset-0 flex translate-y-3 items-end bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">{project.tag}</p>
                              <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
                              <div className="mt-3 flex gap-2">
                                <Button size="icon" variant="outline" asChild className="border-white/70 bg-white/90 hover:bg-white">
                                  <a href={project.image} target="_blank" rel="noreferrer noopener" aria-label={`Open ${project.title} image`}>
                                    <ArrowUpRight className="h-4 w-4" />
                                  </a>
                                </Button>
                                <Button size="icon" asChild>
                                  <a href={project.link} target="_blank" rel="noreferrer noopener" aria-label={`Visit ${project.title}`}>
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600">{project.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section-shell">
          <Reveal>
            <div className="section-wrap">
              <SectionHeader
                eyebrow="Contact"
                title="Let’s work together"
                description="Available for full-time roles and project-based work in Dubai or remote setups."
              />

              <motion.div
                className="grid gap-4 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                  <Card className="rounded-2xl border-slate-200 bg-slate-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <MapPin className="h-4 w-4 text-brand-600" /> Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{profile.location}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                  <Card className="rounded-2xl border-slate-200 bg-slate-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Phone className="h-4 w-4 text-brand-600" /> Phone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href={`tel:${profile.phone}`} className="text-sm text-slate-700 hover:text-brand-700">
                        {profile.phone}
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeItem} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                  <Card className="rounded-2xl border-slate-200 bg-slate-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Mail className="h-4 w-4 text-brand-600" /> Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href={`mailto:${profile.email}`} className="text-sm text-slate-700 hover:text-brand-700">
                        {profile.email}
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={fadeItem} whileTap={{ scale: 0.97 }}>
                  <Button asChild>
                    <a href={`mailto:${profile.email}`}>Send Email</a>
                  </Button>
                </motion.div>
                <motion.div variants={fadeItem} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" asChild>
                    <a href={profile.website} target="_blank" rel="noreferrer noopener">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  </Button>
                </motion.div>
                <motion.div variants={fadeItem} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" asChild>
                    <a href={profile.github} target="_blank" rel="noreferrer noopener">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="section-shell flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>React + Tailwind (EC2-ready build)</p>
        </div>
      </footer>
    </div>
  )
}
