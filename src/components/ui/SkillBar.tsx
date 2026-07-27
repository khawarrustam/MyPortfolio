import React, { useState, useEffect, useRef } from 'react';

export function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const [width, setWidth] = useState(0)
  const [displayLevel, setDisplayLevel] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number;
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(level)
            let current = 0
            const step = () => {
              current += Math.max(1, Math.floor((level - current) * 0.1))
              if (current >= level) current = level
              setDisplayLevel(current)
              if (current < level) {
                animationFrameId = requestAnimationFrame(step)
              }
            }
            animationFrameId = requestAnimationFrame(step)
          }, delay) 
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [level, delay])

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: "'Courier New', Courier, monospace" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {width > 0 ? '> LOAD_MODULE:' : '> WAIT:'} <span style={{ color: '#F8FAFC' }}>{name}</span>
        </span>
        <span style={{ fontSize: 13, color: '#34D399', fontWeight: 600, textShadow: '0 0 5px rgba(52,211,153,0.4)' }}>
          [{displayLevel.toString().padStart(3, '0')}%]
        </span>
      </div>
      <div style={{ 
        height: 14, 
        background: 'rgba(15, 23, 42, 0.8)', 
        border: '1px solid rgba(96, 165, 250, 0.3)',
        padding: 2,
        position: 'relative',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: '#3B82F6',
          boxShadow: '0 0 12px rgba(59,130,246,0.6)',
          transition: 'width 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)'
        }} />
      </div>
    </div>
  )
}