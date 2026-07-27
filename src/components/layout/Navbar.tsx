import React, { useState, useEffect } from 'react';
import { navLinks, icons } from '../../data';
import { Icon } from '../ui/Icon';

export function Navbar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
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