import React from 'react';
import { Cpu, Network, Server, Cloud, Activity, Layers, Shuffle } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedCpuIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer subtle halo */}
      <span className="absolute inset-0 rounded-lg bg-cyan-500/20 animate-beacon-wave pointer-events-none" />
      <div className="relative text-cyan-400">
        <Cpu className={sizeMap[size]} />
        {/* Core activity micro-dot */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-sm animate-ping-slow pointer-events-none" />
      </div>
    </div>
  );
};

export const AnimatedNetworkIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-emerald-500/15 animate-beacon-wave pointer-events-none" />
      <div className="relative text-emerald-400 animate-float-slow">
        <Network className={sizeMap[size]} />
      </div>
    </div>
  );
};

export const AnimatedWormholeIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-cyan-500/15 animate-beacon-wave pointer-events-none" />
      <div className="relative text-cyan-400 flex items-center">
        <Shuffle className={`${sizeMap[size]} animate-pulse`} />
        {/* Micro flit packet indicator */}
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute -top-1 -right-1 animate-ping-slow" />
      </div>
    </div>
  );
};

export const AnimatedServerRackIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="relative text-indigo-400">
        <Server className={sizeMap[size]} />
        {/* Blinking rack activity LEDs */}
        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-emerald-400 animate-led-blink-1" />
        <span className="absolute top-2.5 right-1 w-1 h-1 rounded-full bg-cyan-400 animate-led-blink-2" />
        <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-amber-400 animate-led-blink-3" />
      </div>
    </div>
  );
};

export const AnimatedCloudIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-blue-500/15 animate-beacon-wave pointer-events-none" />
      <div className="relative text-blue-400 animate-float-slow">
        <Cloud className={sizeMap[size]} />
      </div>
    </div>
  );
};

export const AnimatedActivityIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-rose-500/15 animate-beacon-wave pointer-events-none" />
      <div className="relative text-rose-400">
        <Activity className={`${sizeMap[size]} animate-pulse`} />
      </div>
    </div>
  );
};

export const AnimatedMemoryIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-amber-500/15 animate-beacon-wave pointer-events-none" />
      <div className="relative text-amber-400 animate-float-slow">
        <Layers className={sizeMap[size]} />
      </div>
    </div>
  );
};
