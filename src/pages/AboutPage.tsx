import React, { useState, useEffect, useRef } from 'react';
import { icons, projects, skills, timeline, navLinks } from '../data';
import { Icon } from '../components/ui/Icon';
import { GlowOrb } from '../components/ui/GlowOrb';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SkillBar } from '../components/ui/SkillBar';


export default function AboutPage({ setActive }: { setActive: (id: string) => void }) {
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