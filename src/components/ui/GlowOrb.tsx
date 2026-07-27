import React from 'react';

export function GlowOrb({ x, y, color = '#2563EB', size = 300, opacity = 0.08 }: { x: string; y: string; color?: string; size?: number; opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}