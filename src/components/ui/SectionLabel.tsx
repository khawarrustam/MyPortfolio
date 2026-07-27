import React from 'react';

export function SectionLabel({ children }: { children: string }) {
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