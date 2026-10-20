import React from 'react';
import { HelpCircle, Clock, Mic, Award, Sparkles } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedQuizIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer ambient pulsing halo */}
      <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-beacon-wave pointer-events-none" />
      {/* Levitating Container */}
      <div className="relative animate-float-slow text-cyan-400">
        <HelpCircle className={sizeMap[size]} />
        <Sparkles className="absolute -top-1.5 -right-1.5 w-3 h-3 text-cyan-300 animate-pulse" />
      </div>
    </div>
  );
};

export const AnimatedExamIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Concentric radar beacon */}
      <span className="absolute inset-0 rounded-full bg-amber-500/25 animate-beacon-wave pointer-events-none" />
      
      {/* Bezel */}
      <div className="relative text-amber-400">
        <Clock className={sizeMap[size]} />
        {/* Animated minute hand dot */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-clock-hand origin-bottom -translate-y-1" />
        </span>
      </div>
    </div>
  );
};

export const AnimatedOralIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Soundwave emission rings */}
      <span className="absolute inset-0 rounded-full bg-purple-500/20 animate-beacon-wave pointer-events-none" />
      
      <div className="relative flex items-center gap-1 text-purple-400">
        <Mic className={sizeMap[size]} />
        
        {/* Equalizer mini sound bars moving autonomously */}
        <div className="flex items-end gap-0.5 h-3 ml-0.5">
          <span className="w-0.5 h-2.5 bg-purple-400 rounded-full animate-sound-wave-1" />
          <span className="w-0.5 h-3.5 bg-purple-300 rounded-full animate-sound-wave-2" />
          <span className="w-0.5 h-2 bg-purple-400 rounded-full animate-sound-wave-3" />
        </div>
      </div>
    </div>
  );
};

export const AnimatedTrophyIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-beacon-wave pointer-events-none" />
      <div className="relative animate-float-slow text-emerald-400">
        <Award className={sizeMap[size]} />
      </div>
    </div>
  );
};
