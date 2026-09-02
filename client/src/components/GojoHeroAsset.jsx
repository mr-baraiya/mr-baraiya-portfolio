import React, { useState, useRef } from 'react';

export const GojoHeroAsset = () => {
  const [transformStyle, setTransformStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt calculation
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Background Volumetric Aura Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#15D8B3]/20 via-[#49A4BB]/15 to-[#8B5CF6]/25 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
      
      {/* Spinning Outer Cyan Energy Ring */}
      <div className="absolute w-[85%] h-[85%] rounded-full border border-[#15D8B3]/40 shadow-[0_0_30px_rgba(21,216,179,0.3)] animate-[spin_20s_linear_infinite] border-dashed pointer-events-none"></div>
      
      {/* Spinning Inner Violet Energy Ring (Reverse direction) */}
      <div className="absolute w-[70%] h-[70%] rounded-full border border-[#8B5CF6]/50 shadow-[0_0_25px_rgba(139,92,246,0.35)] animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

      {/* Ambient Particle Dots */}
      <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-[#15D8B3] animate-ping opacity-75"></div>
      <div className="absolute bottom-16 right-12 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse opacity-80"></div>
      <div className="absolute top-1/4 right-8 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping opacity-60"></div>
      <div className="absolute bottom-1/3 left-8 w-2 h-2 rounded-full bg-indigo-400 animate-bounce opacity-70"></div>

      {/* Floating 3D Character Model Image */}
      <div 
        style={transformStyle}
        className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-300 transform-gpu"
      >
        <img
          src="/images/gojo_3d_hero.png"
          alt="Gojo Satoru 3D Character Asset"
          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(21,216,179,0.4)] transition-all duration-500 animate-[bounce_4s_easeInOut_infinite]"
          style={{
            filter: 'drop-shadow(0 0 25px rgba(21, 216, 179, 0.45)) drop-shadow(0 0 45px rgba(139, 92, 246, 0.3))'
          }}
        />
      </div>

      {/* Floating Interactive Badge at Bottom */}
      <div className="absolute bottom-2 z-20 px-3.5 py-1.5 rounded-full bg-[#050814]/90 border border-[#15D8B3]/40 backdrop-blur-md shadow-lg flex items-center gap-2 text-[11px] font-mono text-[#15D8B3] tracking-wide pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#15D8B3] animate-ping"></span>
        <span>Interactive 3D Asset</span>
      </div>
    </div>
  );
};

export default GojoHeroAsset;
