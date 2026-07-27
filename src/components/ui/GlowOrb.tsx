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
        background: color,
        opacity,
        filter: `blur(${size * 0.4}px)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}