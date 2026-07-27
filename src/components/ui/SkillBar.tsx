import React, { useState, useEffect, useRef } from 'react';

export function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
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
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${width}%`,
          background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
          transition: 'width 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }} />
      </div>
    </div>
  )
}