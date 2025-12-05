import React, { useEffect, useState } from 'react';
import { ConfettiParticle } from '../types';

const COLORS = ['#8B5CF6', '#FBBF24', '#F97316', '#EF4444', '#3B82F6', '#10B981'];

const CelebrationOverlay: React.FC = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: ConfettiParticle[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10, // start above screen
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            animation: `confetti-fall 3s linear forwards`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default CelebrationOverlay;