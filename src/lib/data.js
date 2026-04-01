export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume', label: 'Resume' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
]

export const profile = {
  name: 'Zaw Htet Naung',
  role: 'Software Engineer',
  headline: 'Full-Stack Developer, Laravel Engineer, Vue.js Developer, SEO & Performance Specialist',
  summary:
    'I build modern web applications and e-commerce platforms with Laravel, Vue.js, React.js, Node.js, and WordPress/WooCommerce. I focus on practical delivery, clean architecture, SEO growth, and reliable production operations.',
  location: 'MQB3 Building, Room No. 705, Al Rigga Ward, Dubai Township',
  phone: '+971503786299',
  email: 'banyein.nk@gmail.com',
  nationality: 'Burmese',
  website: 'https://zawhtetnaung.com',
  github: 'https://github.com/Zaw',
  cvPath: '/assets/cv/zawhtetnaungCV.pdf',
  image: '/assets/img/profile/zaw.jpg',
  signature: '/assets/img/misc/signature-zaw.svg'
}

export const heroStats = [
  { label: 'Projects Delivered', value: '15+' },
  { label: 'Years Experience', value: '6+' },
  { label: 'Companies Worked', value: '4' }
]

export const skillGroups = [
  {
    title: 'Frontend & UI',
    items: [
      { name: 'HTML/CSS/JavaScript', level: 95 },
      { name: 'Vue.js (Laravel/Next/Vuetify)', level: 90 },
      { name: 'React.js', level: 80 }
    ]
  },
  {
    title: 'Backend & APIs',
    items: [
      { name: 'PHP (Laravel)', level: 92 },
      { name: 'Node.js (Express)', level: 82 },
      { name: 'REST API Integration', level: 90 }
    ]
  },
  {
    title: 'Databases & Platforms',
    items: [
      { name: 'MySQL & MongoDB', level: 88 },
      { name: 'Firebase & NoSQL', level: 82 },
      { name: 'WordPress/WooCommerce', level: 86 }
    ]
  },
  {
    title: 'Cloud, DevOps & Tools',
    items: [
      { name: 'AWS/S3/DigitalOcean', level: 84 },
      { name: 'Docker/SSH/Linux', level: 80 },
      { name: 'Git/Bitbucket', level: 92 }
    ]
  }
]

export const experiences = [
  {
    title: 'Software Engineer / SEO Executive',
    company: 'Messara Living UAE',
    duration: '2025 - Present',
    description:
      'Managed websites built with WordPress, WooCommerce, Laravel, React.js, and Vue.js. Improved SEO, speed, and mobile UX while handling analytics, ads tracking, and production deployments.',
    links: [
      { label: 'messaraliving.com', href: 'https://www.messaraliving.com/' },
      { label: 'messaratrading.com', href: 'https://www.messaratrading.com/' },
      { label: 'mcouturerugs.com', href: 'https://mcouturerugs.com/' }
    ]
  },
  {
    title: 'Software Developer',
    company: 'Bagan Innovation Myanmar',
    duration: '2023 - 2024',
    description:
      'Worked on high-end Laravel projects and chatbot platforms using Laravel, Vue.js, and Node.js. Maintained campaign chatbots and shipped new platform features.',
    links: [{ label: 'tharapa.ai', href: 'https://tharapa.ai/' }]
  },
  {
    title: 'Web Developer',
    company: 'Myanmar Online Technology',
    duration: '2021 - 2023',
    description:
      'Built and maintained Laravel applications with payment integration, MongoDB live chat, OTP flows, and production server operations.',
    links: [
      { label: 'shweshops.com', href: 'https://shweshops.com/' },
      { label: 'gentlementailor.shop', href: 'https://gentlementailor.shop/' }
    ]
  },
  {
    title: 'Junior Web Developer',
    company: 'Next Innovation JAPAN',
    duration: '2020 - 2021',
    description:
      'Developed dynamic websites with HTML/CSS/JavaScript, custom WordPress themes, and mid-range Laravel systems.',
    links: [{ label: 'next-innovations.ltd', href: 'https://next-innovations.ltd/' }]
  }
]

export const education = [
  {
    degree: 'BSc (Hons) Computing',
    school: 'University of Greenwich',
    year: '2019 - 2020',
    details: 'Focused on software development foundations and modern web technologies.'
  },
  {
    degree: 'Level 4 and Level 5 Diploma in Computing',
    school: 'Diploma Program',
    year: '2017 - 2019',
    details: 'Completed core computing and software engineering modules.'
  },
  {
    degree: 'High School',
    school: 'B.E.H.S No(3), Botahtaung',
    year: 'Language: English',
    details: 'Nationality: Burmese.'
  }
]

export const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'Build modern web applications using Laravel, Vue.js, React.js, and Node.js.'
  },
  {
    title: 'Server Security & Maintenance',
    description: 'Secure deployment, backups, optimization, and ongoing Linux server support.'
  },
  {
    title: 'SEO & Performance',
    description: 'Improve technical SEO, Core Web Vitals, and conversion-focused website speed.'
  },
  {
    title: 'E-Commerce Development',
    description: 'Develop and maintain WooCommerce and custom commerce workflows, including payments.'
  },
  {
    title: 'Cloud Deployment',
    description: 'Deploy and scale on AWS, DigitalOcean, and S3 with reliable release workflows.'
  },
  {
    title: 'API & System Integration',
    description: 'Integrate REST APIs, analytics, ads tracking, and third-party systems.'
  }
]

export const portfolioFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'ai', label: 'AI/Automation' },
  { key: 'platform', label: 'Platforms' }
]

export const projects = [
  {
    id: 'messara-living',
    title: 'Messara Living',
    category: 'ecommerce',
    tag: 'E-Commerce',
    image: '/assets/img/portfolio/portfolio-1.webp',
    description: 'WordPress/WooCommerce management, SEO optimization, and performance improvements.',
    link: 'https://www.messaraliving.com/',
    logo: true
  },
  {
    id: 'messara-trading',
    title: 'Messara Trading',
    category: 'corporate',
    tag: 'Corporate',
    image: '/assets/img/portfolio/portfolio-10.webp',
    description: 'Corporate website support with front-end and SEO updates.',
    link: 'https://www.messaratrading.com/',
    logo: true
  },
  {
    id: 'mcouture-rugs',
    title: 'MCouture Rugs',
    category: 'corporate',
    tag: 'Corporate',
    image: '/assets/img/portfolio/portfolio-7.svg',
    description: 'Corporate website and platform support, including performance and content improvements.',
    link: 'https://mcouturerugs.com/',
    logo: true,
    customLogoClass: 'p-8 sm:p-10'
  },
  {
    id: 'tharapa-ai',
    title: 'Tharapa AI',
    category: 'ai',
    tag: 'AI/Automation',
    image: '/assets/img/portfolio/portfolio-4.webp',
    description: 'Laravel/Vue/Node-based project with chatbot and feature maintenance.',
    link: 'https://tharapa.ai/',
    logo: true
  },
  {
    id: 'shweshops',
    title: 'ShweShops',
    category: 'ecommerce',
    tag: 'E-Commerce',
    image: '/assets/img/portfolio/portfolio-2.webp',
    description: 'Laravel commerce platform with payments, logging, and live chat support.',
    link: 'https://shweshops.com/',
    logo: true
  },
  {
    id: 'gentleman-tailor',
    title: 'Gentleman Tailor Shop',
    category: 'ecommerce',
    tag: 'E-Commerce',
    image: '/assets/img/portfolio/portfolio-11.webp',
    description: 'Full-stack commerce features and production maintenance.',
    link: 'https://gentlementailor.shop/'
  },
  {
    id: 'next-innovations',
    title: 'Next Innovations',
    category: 'platform',
    tag: 'Platform',
    image: '/assets/img/portfolio/portfolio-8.webp',
    description: 'Corporate web platform delivered during junior web developer role.',
    link: 'https://next-innovations.ltd/',
    logo: true
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'platform',
    tag: 'Platform',
    image: '/assets/img/portfolio/portfolio-5.webp',
    description: 'Portfolio website showcasing projects, skills, and experience.',
    link: 'https://zawhtetnaung.com',
    logo: true
  }
]
