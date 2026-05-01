'use client'

import React from 'react';

interface LogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function Logo({ className = "", width = 140, height = 140 }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 140 140" 
      className={className} 
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <mask id="logo-mask">
          <image 
            href="/images/logo-white.png" 
            width="140" 
            height="140"
          />
        </mask>
      </defs>
      <rect 
        width="140" 
        height="140" 
        fill="currentColor" 
        mask="url(#logo-mask)" 
      />
    </svg>
  );
}
