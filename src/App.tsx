import { useState, useEffect, useRef } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ d, size = 20, className = '', style }: { d: string; size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d={d} />
  </svg>
)

const icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  folder: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  external: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  brain: "M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M20 6L9 17l-5-5",
  timeline: "M12 2v20 M2 12h20",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  sparkle: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z",
  database: "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5z M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5 M2 12c0 2.76 4.48 5 10 5s10-2.24 10-5",
  tool: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  x: "M18 6L6 18 M6 6l12 12",
  whatsapp: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { id: 'home', label: 'Home', icon: icons.home },
  { id: 'about', label: 'About', icon: icons.user },
  { id: 'projects', label: 'Projects', icon: icons.folder },
  { id: 'resume', label: 'Resume', icon: icons.file },
  { id: 'contact', label: 'Contact', icon: icons.mail },
]

const projects = [
  {
    title: 'InsightFlow CRM',
    description: 'AI-powered CRM and competitive intelligence platform featuring lead management, sales pipelines, and AI-generated strategy recommendations.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Groq AI'],
    category: 'Full-Stack + AI',
    color: '#7C3AED',
    images: [
      '/screenshots/insightflow/landing.png',
      '/screenshots/insightflow/dashboard.png',
      '/screenshots/insightflow/ai-strategy.png',
      '/screenshots/insightflow/competitors.png',
      '/screenshots/insightflow/employees.png',
    ],
    github: 'https://github.com/khawarrustam',
    demo: 'https://insightflow-fyp-ai.vercel.app',
  },
  {
    title: 'Career Catalyst',
    description: 'AI-powered resume builder and job match analyzer. Generate tailored resumes, score job description matches, and export clean PDFs instantly.',
    tech: ['React.js', 'Python Flask', 'Node.js', 'Groq AI'],
    category: 'AI / LLMs',
    color: '#2563EB',
    images: [
      '/screenshots/career-catalyst/landing.png',
      '/screenshots/career-catalyst/analyzer.png',
      '/screenshots/career-catalyst/ai-suggestions.png',
      '/screenshots/career-catalyst/auth.png',
    ],
    github: 'https://github.com/khawarrustam',
    demo: 'https://career-catalyst-fyp.vercel.app',
  },
]

const skills = {
  'Frontend & UI': [
    { name: 'React.js, Hooks & Router', level: 95 },
    { name: 'TypeScript & JavaScript', level: 90 },
    { name: 'Tailwind CSS, shadcn/ui & Radix', level: 85 },
    { name: 'Vite & Recharts', level: 80 },
  ],
  'Backend & DB': [
    { name: 'Node.js & Express.js', level: 90 },
    { name: 'Python, FastAPI & Flask', level: 85 },
    { name: 'MongoDB, Mongoose & PostgreSQL', level: 85 },
    { name: 'Firebase & Supabase', level: 80 },
  ],
  'AI & Machine Learning': [
    { name: 'LLMs & Prompt Engineering', level: 90 },
    { name: 'Groq, OpenAI & Anthropic', level: 85 },
    { name: 'RAG & Vector Databases', level: 80 },
    { name: 'Scikit-learn & TensorFlow', level: 75 },
  ],
  'Tools & Productivity': [
    { name: 'Agentic Coding (Cursor, Claude, Copilot)', level: 95 },
    { name: 'Git & GitHub', level: 90 },
    { name: 'Postman & REST APIs', level: 90 },
    { name: 'Docker & Deployment (Vercel, Netlify)', level: 80 },
  ],
  'Architecture & Quality': [
    { name: 'Component-Based UI & Dashboard Design', level: 90 },
    { name: 'Responsive Design & Accessibility', level: 85 },
    { name: 'State-Driven UI & Protected Routes', level: 85 },
    { name: 'Clean Code & Performance Optimization', level: 80 },
  ],
  'Testing & SQA': [
    { name: 'Manual & API Testing', level: 85 },
    { name: 'Jest, Supertest, Vitest & Pytest', level: 80 },
    { name: 'Test Case Design & Defect Tracking', level: 85 },
    { name: 'Debugging & Chrome DevTools', level: 90 },
  ],
}

const timeline = [
  {
    year: '2025',
    title: 'Software Engineer Intern',
    desc: 'Joined Tiers Limited, built responsive MERN applications, integrated payment flows, and utilized AI-assisted development tools.',
    icon: icons.code,
    color: '#2563EB',
  },
  {
    year: '2022',
    title: 'BS Computer Science',
    desc: 'Enrolled at The University of Lahore. Maintained a CGPA of 3.91/4.00 and earned a spot on the Dean\'s Honour List.',
    icon: icons.star,
    color: '#7C3AED',
  },
  {
    year: '2020',
    title: 'F.Sc. Pre-Engineering',
    desc: 'Forman Christian College & University — built a strong mathematical and analytical foundation.',
    icon: icons.layers,
    color: '#059669',
  },
]

// ─── Shared Components ────────────────────────────────────────────────────────

function GlowOrb({ x, y, color = '#2563EB', size = 300, opacity = 0.08 }: { x: string; y: string; color?: string; size?: number; opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity,
        filter: `blur(${size * 0.4}px)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{
        width: 32,
        height: 2,
        background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
        borderRadius: 1,
      }} />
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#2563EB',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {children}
      </span>
    </div>
  )
}

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setWidth(level), delay) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>{name}</span>
        <span style={{ fontSize: 12, color: '#94A3B8', fontFamily: "'Space Grotesk', sans-serif" }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(11,17,32,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => setActive('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}>
              Rana Khawar
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActive(link.id)}
                className={`nav-link ${active === link.id ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: active === link.id ? '#F8FAFC' : '#94A3B8',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/Resume/RanaKhawarAli-Associate-SWE.pdf"
              download
              className="btn-primary"
              style={{ marginLeft: 12, padding: '9px 20px', fontSize: 13, textDecoration: 'none' }}
            >
              <Icon d={icons.download} size={15} />
              Download CV
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F8FAFC', padding: 8 }}
          >
            <div style={{ transition: 'transform 0.3s ease', transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)', display: 'flex' }}>
              <Icon d={menuOpen ? icons.x : icons.menu} size={22} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: 68,
            right: 0,
            bottom: 0,
            width: 260,
            background: 'rgba(11,17,32,0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            padding: '24px',
            boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setActive(link.id); setMenuOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '16px 0',
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: active === link.id ? '#2563EB' : '#94A3B8',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  transition: 'color 0.2s ease, padding-left 0.2s ease',
                }}
              >
                <Icon d={link.icon} size={18} />
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ setActive }: { setActive: (id: string) => void }) {
  const techBadges = [
    { label: 'React.js', color: '#61DAFB' },
    { label: 'Node.js', color: '#68A063' },
    { label: 'Python', color: '#FFD43B' },
    { label: 'MongoDB', color: '#47A248' },
    { label: 'TypeScript', color: '#3178C6' },
    { label: 'AI / ML', color: '#A855F7' },
  ]

  const stats = [
    { value: '10+', label: 'Projects Built', icon: icons.folder, color: '#2563EB' },
    { value: 'BSCS', label: 'Computer Science', icon: icons.cpu, color: '#7C3AED' },
    { value: '10+', label: 'Technologies', icon: icons.code, color: '#059669' },
    { value: 'AI', label: 'Future Focus', icon: icons.brain, color: '#DC2626' },
  ]

  return (
    <div className="mesh-bg grid-bg" style={{ minHeight: '100vh', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
      <GlowOrb x="10%" y="30%" color="#2563EB" size={500} opacity={0.08} />
      <GlowOrb x="85%" y="20%" color="#7C3AED" size={400} opacity={0.07} />
      <GlowOrb x="50%" y="90%" color="#2563EB" size={350} opacity={0.05} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,80px) 80px' }}>
        {/* Hero */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Left */}
          <div className="animate-slide-up">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.25)',
              borderRadius: 9999,
              padding: '6px 16px',
              marginBottom: 28,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22D3EE', boxShadow: '0 0 8px #22D3EE' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#93BBFD', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
                Available for opportunities
              </span>
            </div>

            <h1 className="section-heading" style={{ fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.08, color: '#F8FAFC', marginBottom: 16 }}>
              Rana Khawar<br />
              <span className="gradient-text">Ali</span>
            </h1>

            <p style={{ fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 500, color: '#94A3B8', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 20, letterSpacing: '0.01em' }}>
              Associate Software Engineer<br />
              <span style={{ color: '#2563EB' }}>Full-Stack Web & AI Developer</span>
            </p>

            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, maxWidth: 460, marginBottom: 36 }}>
              Building scalable full-stack web applications with expertise in React.js, Node.js, Python, and AI integrations.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => setActive('projects')} className="btn-primary">
                <Icon d={icons.folder} size={16} />
                View Projects
              </button>
              <a href="/Resume/RanaKhawarAli-Associate-SWE.pdf" download className="btn-secondary" style={{ textDecoration: 'none' }}>
                <Icon d={icons.download} size={16} />
                Download Resume
              </a>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
              {[
                { label: 'GitHub', icon: icons.github, href: 'https://github.com/khawarrustam' },
                { label: 'LinkedIn', icon: icons.linkedin, href: 'https://linkedin.com/in/khawarrustam' },
                { label: 'Email', icon: icons.mail, href: 'mailto:rajputkhawarali@gmail.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.label !== 'Email' ? "_blank" : undefined} rel="noopener noreferrer" style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(37,99,235,0.15)'
                    el.style.borderColor = 'rgba(37,99,235,0.4)'
                    el.style.color = '#F8FAFC'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.04)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.color = '#94A3B8'
                  }}
                >
                  <Icon d={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right – Dev Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 'min(440px, calc(100% - 60px))' }}>
              {/* Main card */}
              <div className="animate-float glass" style={{
                borderRadius: 20,
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Code editor header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFC12D' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#29CB41' }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: '#475569', fontFamily: "'Space Grotesk', sans-serif" }}>portfolio.tsx</span>
                </div>

                {/* Code lines */}
                {[
                  { color: '#7C3AED', text: 'const', rest: ' developer = {', indent: 0 },
                  { color: '#2563EB', text: '  name', rest: ": 'Rana Khawar',", indent: 1 },
                  { color: '#2563EB', text: '  role', rest: ": 'Associate Software Engineer',", indent: 1 },
                  { color: '#2563EB', text: '  stack', rest: ': [React, Node.js, Python],', indent: 1 },
                  { color: '#2563EB', text: '  focus', rest: ": 'Full-Stack + AI',", indent: 1 },
                  { color: '#2563EB', text: '  status', rest: ": '🟢 Available',", indent: 1 },
                  { color: '#7C3AED', text: '}', rest: '', indent: 0 },
                ].map((line, i) => (
                  <div key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 0 }}>
                    <span style={{ width: 24, fontSize: 11, color: '#334155', fontFamily: "'Space Grotesk', monospace", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontFamily: "'Space Grotesk', monospace" }}>
                      <span style={{ color: line.color }}>{line.text}</span>
                      <span style={{ color: '#94A3B8' }}>{line.rest}</span>
                    </span>
                  </div>
                ))}

                {/* Cursor blink */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, fontSize: 11, color: '#334155', fontFamily: "'Space Grotesk', monospace" }}>9</span>
                  <div style={{
                    width: 2,
                    height: 16,
                    background: '#2563EB',
                    animation: 'pulse 1.2s ease-in-out infinite',
                  }} />
                </div>
              </div>

              {/* Floating tech badges */}
              {techBadges.map((badge, i) => {
                const positions = [
                  { top: -16, right: 20 },
                  { top: 20, right: -25 },
                  { top: 100, right: -20 },
                  { bottom: 80, right: -25 },
                  { bottom: -16, right: 30 },
                  { top: 50, left: -25 },
                ]
                const pos = positions[i]
                return (
                  <div key={badge.label} style={{
                    position: 'absolute',
                    ...pos,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    background: 'rgba(17,24,39,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${badge.color}30`,
                    borderRadius: 10,
                    padding: '7px 14px',
                    whiteSpace: 'nowrap',
                    animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: badge.color, boxShadow: `0 0 8px ${badge.color}` }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: badge.color, fontFamily: "'Space Grotesk', sans-serif" }}>{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 16,
          marginTop: 'clamp(40px,6vw,72px)',
        }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="glass glass-hover" style={{ borderRadius: 16, padding: '24px 20px', textAlign: 'center', cursor: 'default' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${stat.color}18`,
                border: `1px solid ${stat.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                color: stat.color,
              }}>
                <Icon d={stat.icon} size={20} />
              </div>
              <div style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 700, color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em', marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#64748B', fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </div>
  )
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({ setActive }: { setActive: (id: string) => void }) {
  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
      <GlowOrb x="80%" y="15%" color="#7C3AED" size={400} opacity={0.07} />
      <GlowOrb x="15%" y="70%" color="#2563EB" size={350} opacity={0.06} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,80px) 80px' }}>
        <SectionLabel>About Me</SectionLabel>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          Passionate about building<br />
          <span className="gradient-text">impactful software</span>
        </h2>
        <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.8, maxWidth: 600, marginBottom: 56 }}>
          Associate Software Engineer with hands-on experience building scalable full-stack web applications using React.js, TypeScript, Node.js, Express.js, Python, and MongoDB. Experienced in AI-powered applications, CRM systems, dashboards, secure authentication, and REST API integration.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: 'clamp(28px,4vw,48px)', marginBottom: 64 }} className="about-grid">
          {/* Who I am */}
          <div className="glass" style={{ borderRadius: 20, padding: '36px 32px' }}>
            <h3 className="section-heading" style={{ fontSize: 20, color: '#F8FAFC', marginBottom: 20 }}>Who I Am</h3>
            {[
              { label: 'Background', value: 'Computer Science graduate with hands-on experience building responsive Full-Stack AI applications.' },
              { label: 'Passion', value: 'I am deeply passionate about building performant REST APIs, engaging React UIs, and integrating LLMs for intelligent workflows.' },
              { label: 'Approach', value: 'I believe in writing clean, maintainable code that solves real problems — not just code that works.' },
              { label: 'Growth Mindset', value: 'Constantly optimizing code efficiency and adopting modern web technologies for clean, maintainable systems.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#7C3AED)', marginTop: 8, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', fontFamily: "'Space Grotesk', sans-serif", display: 'block', marginBottom: 4 }}>{item.label}</span>
                  <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <div className="glass gradient-border" style={{ borderRadius: 20, padding: '32px 28px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg,#2563EB,#7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon d={icons.star} size={22} className="" />
                </div>
                <div>
                  <h4 className="section-heading" style={{ fontSize: 16, color: '#F8FAFC', marginBottom: 6 }}>The University of Lahore</h4>
                  <p style={{ fontSize: 13, color: '#2563EB', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>BS Computer Science</p>
                  <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Expected Graduation: 2026</p>
                  <p style={{ fontSize: 12, color: '#64748B' }}>CGPA: <strong style={{ color: '#F8FAFC' }}>3.91/4.00</strong></p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                    {['Software Design', 'Algorithms', 'Database Systems', 'AI Fundamentals'].map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="glass" style={{ borderRadius: 20, padding: '28px' }}>
              <h4 className="section-heading" style={{ fontSize: 15, color: '#F8FAFC', marginBottom: 18 }}>Quick Facts</h4>
              {[
                { label: 'Location', value: 'Pakistan' },
                { label: 'Focus', value: 'Backend + AI' },
                { label: 'Status', value: 'Open to Work' },
                { label: 'Languages', value: 'English, Urdu' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#64748B' }}>{f.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', fontFamily: "'Space Grotesk', sans-serif" }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <SectionLabel>Learning Journey</SectionLabel>
        <h3 className="section-heading" style={{ fontSize: 'clamp(22px,3vw,32px)', color: '#F8FAFC', marginBottom: 40 }}>The road so far</h3>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #2563EB, #7C3AED, #2563EB)',
            opacity: 0.3,
          }} />

          {timeline.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < timeline.length - 1 ? 32 : 0 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: -22,
                top: 14,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: item.color,
                border: '2px solid rgba(11,17,32,1)',
                boxShadow: `0 0 12px ${item.color}60`,
              }} />

              <div className="glass glass-hover" style={{ borderRadius: 16, padding: '24px 28px', cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 14px',
                    borderRadius: 9999,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}35`,
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: item.color,
                    letterSpacing: '0.05em',
                  }}>
                    {item.year}
                  </span>
                  <h4 className="section-heading" style={{ fontSize: 16, color: '#F8FAFC' }}>{item.title}</h4>
                </div>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:1024px){.about-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}

// ─── Projects Page ─────────────────────────────────────────────────────────────

function ProjectsPage() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    if (hovered === null) return
    const interval = setInterval(() => {
      setImgIdx(prev => prev + 1)
    }, 1500)
    return () => clearInterval(interval)
  }, [hovered])

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
      <GlowOrb x="90%" y="30%" color="#2563EB" size={400} opacity={0.06} />
      <GlowOrb x="10%" y="60%" color="#7C3AED" size={350} opacity={0.06} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,80px) 80px' }}>
        <SectionLabel>Portfolio</SectionLabel>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#F8FAFC', marginBottom: 16 }}>
          Projects I've <span className="gradient-text">built</span>
        </h2>
        <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, maxWidth: 500, marginBottom: 56 }}>
          A collection of real-world applications spanning mobile development, web engineering, and AI-powered tools.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: 24,
        }} className="projects-grid">
          {projects.map((proj, i) => (
            <div
              key={i}
              onMouseEnter={() => { setHovered(i); setImgIdx(0); }}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === i ? `0 20px 48px ${proj.color}20` : '0 4px 16px rgba(0,0,0,0.2)',
                borderColor: hovered === i ? `${proj.color}40` : 'rgba(255,255,255,0.06)',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#0f1929' }}>
                <img
                  src={hovered === i ? proj.images[imgIdx % proj.images.length] : proj.images[0]}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease, opacity 0.3s ease', transform: hovered === i ? 'scale(1.04)' : 'scale(1)' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${proj.color}30, rgba(11,17,32,0.7))`,
                }} />
                {/* Dots indicator */}
                {hovered === i && (
                  <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
                    {proj.images.map((_, dotIdx) => (
                      <div key={dotIdx} style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: (imgIdx % proj.images.length) === dotIdx ? proj.color : 'rgba(255,255,255,0.4)',
                        transition: 'background 0.3s ease'
                      }} />
                    ))}
                  </div>
                )}
                <span style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  padding: '5px 14px',
                  background: 'rgba(11,17,32,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${proj.color}40`,
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 600,
                  color: proj.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.05em',
                }}>
                  {proj.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 className="section-heading" style={{ fontSize: 20, color: '#F8FAFC', marginBottom: 10 }}>{proj.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>{proj.description}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {proj.tech.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={proj.github} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#94A3B8',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = '#F8FAFC' }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = '#94A3B8' }}
                  >
                    <Icon d={icons.github} size={15} />
                    GitHub
                  </a>
                  <a href={proj.demo} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    padding: '10px 16px',
                    background: `${proj.color}18`,
                    border: `1px solid ${proj.color}35`,
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: proj.color,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.background = `${proj.color}28` }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.background = `${proj.color}18` }}
                  >
                    <Icon d={icons.external} size={15} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:1024px){.projects-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}

// ─── Resume Page ───────────────────────────────────────────────────────────────

function ResumePage() {
  const [activeSkillTab, setActiveSkillTab] = useState('Frontend & UI')
  const skillTabs = Object.keys(skills)

  const experience = [
    {
      role: 'Software Engineer Intern',
      org: 'Tiers Limited',
      period: 'July 2025 – Nov 2025',
      desc: 'Built responsive MERN applications, integrated backend APIs, Firebase, and Stripe Payments. Improved delivery speed through AI-assisted tools.',
      tags: ['React.js', 'Node.js', 'Stripe', 'Firebase'],
      color: '#7C3AED',
    },
    {
      role: 'Full-Stack Developer',
      org: 'Academic Projects',
      period: '2022 – 2026',
      desc: 'Designed and built InsightFlow CRM, leveraging Puppeteer, Recharts, and LLM APIs for competitive intelligence.',
      tags: ['MongoDB', 'Express.js', 'TypeScript', 'LLMs'],
      color: '#2563EB',
    },
  ]

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
      <GlowOrb x="20%" y="20%" color="#2563EB" size={400} opacity={0.07} />
      <GlowOrb x="85%" y="65%" color="#7C3AED" size={350} opacity={0.06} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,80px) 80px' }}>
        <SectionLabel>Resume</SectionLabel>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#F8FAFC', marginBottom: 16 }}>
          Skills & <span className="gradient-text">Experience</span>
        </h2>
        <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, maxWidth: 500, marginBottom: 56 }}>
          A progressive skill set built through academic projects, self-directed learning, and hands-on application development.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 'clamp(24px,4vw,48px)', marginBottom: 56 }} className="resume-grid">
          {/* Skills */}
          <div className="glass" style={{ borderRadius: 20, padding: '32px 28px' }}>
            <h3 className="section-heading" style={{ fontSize: 18, color: '#F8FAFC', marginBottom: 24 }}>Technical Skills</h3>

            {/* Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {skillTabs.map(tab => (
                <button key={tab} onClick={() => setActiveSkillTab(tab)} style={{
                  padding: '7px 16px',
                  borderRadius: 8,
                  border: '1px solid',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: activeSkillTab === tab ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'rgba(255,255,255,0.04)',
                  borderColor: activeSkillTab === tab ? 'transparent' : 'rgba(255,255,255,0.08)',
                  color: activeSkillTab === tab ? 'white' : '#94A3B8',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {skills[activeSkillTab as keyof typeof skills].map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 100} />
            ))}
          </div>

          {/* Tools & certifications */}
          <div>
            <div className="glass" style={{ borderRadius: 20, padding: '32px 28px', marginBottom: 20 }}>
              <h3 className="section-heading" style={{ fontSize: 18, color: '#F8FAFC', marginBottom: 24 }}>Core Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['React.js', 'TypeScript', 'Node.js', 'Express.js', 'Python', 'MongoDB', 'Tailwind CSS', 'JWT', 'Jest', 'Supertest', 'Git', 'Puppeteer'].map(t => (
                  <span key={t} style={{
                    padding: '8px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#94A3B8',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(37,99,235,0.4)'; el.style.color = '#93BBFD'; el.style.background = 'rgba(37,99,235,0.08)' }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = '#94A3B8'; el.style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass" style={{ borderRadius: 20, padding: '28px' }}>
              <h3 className="section-heading" style={{ fontSize: 16, color: '#F8FAFC', marginBottom: 20 }}>Key Focus Areas</h3>
              {[
                { label: 'Full-Stack Architecture', pct: 85 },
                { label: 'AI Integrations', pct: 80 },
                { label: 'System Design', pct: 75 },
                { label: 'REST API Design', pct: 90 },
              ].map((item, i) => (
                <SkillBar key={item.label} name={item.label} level={item.pct} delay={i * 150} />
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        <SectionLabel>Experience</SectionLabel>
        <h3 className="section-heading" style={{ fontSize: 'clamp(22px,3vw,30px)', color: '#F8FAFC', marginBottom: 36 }}>Project Experience</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
          {experience.map((exp, i) => (
            <div key={i} className="glass glass-hover" style={{ borderRadius: 18, padding: '28px 32px', cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <h4 className="section-heading" style={{ fontSize: 17, color: '#F8FAFC', marginBottom: 6 }}>{exp.role}</h4>
                  <span style={{ fontSize: 13, color: exp.color, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{exp.org}</span>
                </div>
                <span style={{
                  padding: '5px 14px',
                  background: `${exp.color}15`,
                  border: `1px solid ${exp.color}30`,
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: exp.color,
                }}>
                  {exp.period}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 16 }}>{exp.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div style={{
          borderRadius: 24,
          padding: 'clamp(36px,5vw,56px)',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))',
          border: '1px solid rgba(37,99,235,0.25)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.08), transparent 70%)',
          }} />
          <div style={{ position: 'relative' }}>
            <h3 className="section-heading" style={{ fontSize: 'clamp(22px,3vw,32px)', color: '#F8FAFC', marginBottom: 14 }}>
              Ready to collaborate?
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Download my full resume to see my complete experience, education, and project details.
            </p>
            <a href="/Resume/RanaKhawarAli-Associate-SWE.pdf" download className="btn-primary" style={{ fontSize: 15, padding: '14px 36px', display: 'inline-flex', textDecoration: 'none', color: '#fff' }}>
              <Icon d={icons.download} size={18} />
              Download Full Resume (PDF)
            </a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:1024px){.resume-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}

// ─── Contact Page ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const contactLinks = [
    { label: 'Email', value: 'rajputkhawarali@gmail.com', icon: icons.mail, color: '#2563EB', href: 'mailto:rajputkhawarali@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/khawarrustam', icon: icons.linkedin, color: '#0A66C2', href: 'https://linkedin.com/in/khawarrustam' },
    { label: 'GitHub', value: 'github.com/khawarrustam', icon: icons.github, color: '#94A3B8', href: 'https://github.com/khawarrustam' },
    { label: 'WhatsApp', value: '+923494047056', icon: icons.whatsapp, color: '#25D366', href: 'https://wa.me/923494047056' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("https://formsubmit.co/ajax/rajputkhawarali@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        })
      })
      if (response.ok) {
        setSent(true)
        setTimeout(() => setSent(false), 5000)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        alert("Failed to send message. Please try emailing directly.")
      }
    } catch (error) {
      alert("An error occurred. Please try emailing directly.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10,
    fontSize: 14,
    color: '#F8FAFC',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  }

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', paddingTop: 68, position: 'relative', overflow: 'hidden' }}>
      <GlowOrb x="15%" y="25%" color="#7C3AED" size={400} opacity={0.07} />
      <GlowOrb x="85%" y="70%" color="#2563EB" size={350} opacity={0.06} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,80px) 80px' }}>
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#F8FAFC', marginBottom: 16 }}>
          Let's build something<br />
          <span className="gradient-text">together</span>
        </h2>
        <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, maxWidth: 480, marginBottom: 56 }}>
          Whether you have an opportunity, a project idea, or just want to connect — my inbox is always open.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)', gap: 'clamp(24px,4vw,48px)' }} className="contact-grid">
          {/* Contact links */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {contactLinks.map((c, i) => (
                <a key={i} href={c.href} style={{ textDecoration: 'none' }}>
                  <div className="glass glass-hover" style={{ borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18, cursor: 'pointer' }}>
                    <div style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: c.color,
                      flexShrink: 0,
                    }}>
                      <Icon d={c.icon} size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#64748B', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                      <div style={{ fontSize: 14, color: '#94A3B8', fontFamily: "'Inter', sans-serif" }}>{c.value}</div>
                    </div>
                    <Icon d={icons.external} size={16} className="" style={{ marginLeft: 'auto', color: '#334155' } as React.CSSProperties} />
                  </div>
                </a>
              ))}
            </div>

            {/* Availability banner */}
            <div style={{
              borderRadius: 16,
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))',
              border: '1px solid rgba(37,99,235,0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22D3EE', boxShadow: '0 0 8px #22D3EE', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#22D3EE', fontFamily: "'Space Grotesk', sans-serif" }}>Currently Available</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                Open to full-time roles, internships, and freelance projects in software engineering and AI development.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass" style={{ borderRadius: 20, padding: 'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.12)',
                  border: '2px solid rgba(34,197,94,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#22C55E',
                }}>
                  <Icon d={icons.check} size={28} />
                </div>
                <h3 className="section-heading" style={{ fontSize: 22, color: '#F8FAFC', marginBottom: 10 }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: '#64748B' }}>Thanks for reaching out. I will get back to you shortly.</p>
              </div>
            ) : (
              <form action="https://formsubmit.co/rajputkhawarali@gmail.com" method="POST" target="_blank">
                <h3 className="section-heading" style={{ fontSize: 20, color: '#F8FAFC', marginBottom: 28 }}>Send a message</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Subject</label>
                  <input
                    type="text"
                    name="_subject"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  <Icon d={icons.send} size={17} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:1024px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer({ setActive }: { setActive: (id: string) => void }) {
  return (
    <footer style={{
      background: '#080E1C',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '48px clamp(20px,5vw,80px) 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 8,
            }}>
              Rana Khawar
            </div>
            <p style={{ fontSize: 13, color: '#475569', fontFamily: "'Inter', sans-serif" }}>
              Associate Software Engineer · Full-Stack Web & AI Developer
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {[
              { icon: icons.github, label: 'GitHub' },
              { icon: icons.linkedin, label: 'LinkedIn' },
              { icon: icons.mail, label: 'Email' },
            ].map(s => (
              <button key={s.label} style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#2563EB'; el.style.borderColor = 'rgba(37,99,235,0.3)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#475569'; el.style.borderColor = 'rgba(255,255,255,0.07)' }}
              >
                <Icon d={s.icon} size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => setActive(link.id)} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              color: '#475569',
              fontFamily: "'Inter', sans-serif",
              transition: 'color 0.2s ease',
              padding: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#334155', fontFamily: "'Inter', sans-serif" }}>
            © 2026 Rana Khawar. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: '#334155', fontFamily: "'Space Grotesk', sans-serif" }}>
            Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const handleSetActive = (id: string) => {
    setActivePage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage setActive={handleSetActive} />,
    about: <AboutPage setActive={handleSetActive} />,
    projects: <ProjectsPage />,
    resume: <ResumePage />,
    contact: <ContactPage />,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B1120' }}>
      <Navbar active={activePage} setActive={handleSetActive} />
      <main>{pages[activePage]}</main>
      <Footer setActive={handleSetActive} />
    </div>
  )
}
