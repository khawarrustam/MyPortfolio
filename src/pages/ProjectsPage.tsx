import React, { useState, useEffect, useRef } from 'react';
import { icons, projects, skills, timeline, navLinks } from '../data';
import { Icon } from '../components/ui/Icon';
import { GlowOrb } from '../components/ui/GlowOrb';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SkillBar } from '../components/ui/SkillBar';


export default function ProjectsPage() {
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
                  loading="lazy"
                  decoding="async"
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