import React from 'react';
import { icons, navLinks } from '../../data';
import { Icon } from '../ui/Icon';

export function Footer({ setActive }: { setActive: (id: string) => void }) {
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