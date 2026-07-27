import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { icons, projects, skills, timeline, navLinks } from '../data';
import { Icon } from '../components/ui/Icon';
import { GlowOrb } from '../components/ui/GlowOrb';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SkillBar } from '../components/ui/SkillBar';


export default function HomePage() {
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
              <Link to="/projects" className="btn-primary" style={{ textDecoration: 'none' }}>
                <Icon d={icons.folder} size={16} />
                View Projects
              </Link>
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