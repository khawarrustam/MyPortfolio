import React, { useState, useEffect, useRef } from 'react';
import { icons, projects, skills, timeline, navLinks } from '../data';
import { Icon } from '../components/ui/Icon';
import { GlowOrb } from '../components/ui/GlowOrb';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SkillBar } from '../components/ui/SkillBar';


export default function SkillsPage() {

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
        <SectionLabel>Skills</SectionLabel>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#F8FAFC', marginBottom: 16 }}>
          Skills & <span className="gradient-text">Experience</span>
        </h2>
        <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, maxWidth: 500, marginBottom: 56 }}>
          A progressive skill set built through academic projects, self-directed learning, and hands-on application development.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
          {skillTabs.map(tab => (
            <div key={tab} className="glass" style={{ borderRadius: 20, padding: '32px 28px' }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#93BBFD', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tab}</h4>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {skills[tab as keyof typeof skills].map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 50} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools & certifications */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 56 }}>
          <div className="glass" style={{ borderRadius: 20, padding: '32px 28px' }}>
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

          <div className="glass" style={{ borderRadius: 20, padding: '32px 28px' }}>
            <h3 className="section-heading" style={{ fontSize: 18, color: '#F8FAFC', marginBottom: 24 }}>Key Focus Areas</h3>
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