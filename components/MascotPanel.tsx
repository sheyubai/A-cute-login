
import React, { useEffect, useRef } from 'react';

interface MascotPanelProps {
  isShy: boolean;
  isCelebrating: boolean;
}

const MascotPanel: React.FC<MascotPanelProps> = ({ isShy, isCelebrating }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Pupil Tracking (Purple & Black)
  const purplePupilLRef = useRef<SVGCircleElement>(null);
  const purplePupilRRef = useRef<SVGCircleElement>(null);
  const blackPupilLRef = useRef<SVGCircleElement>(null);
  const blackPupilRRef = useRef<SVGCircleElement>(null);

  // Refs for Face Group Tracking (Yellow & Orange)
  const yellowFaceRef = useRef<SVGGElement>(null);
  const orangeFaceRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isShy || isCelebrating || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate scaling factors (SVG viewBox vs Rendered Size)
      // ViewBox is 420x340
      const viewBoxW = 420;
      const viewBoxH = 340;
      const scaleX = containerRect.width / viewBoxW;
      const scaleY = containerRect.height / viewBoxH;
      // Since preserveAspectRatio is xMidYMid meet, the actual scale is the min
      const scale = Math.min(scaleX, scaleY);

      // Calculate the offset of the rendered SVG inside the container (centering)
      const renderedW = viewBoxW * scale;
      const renderedH = viewBoxH * scale;
      const offsetX = (containerRect.width - renderedW) / 2;
      const offsetY = (containerRect.height - renderedH) / 2;

      // Helper to convert SVG local coordinates to global Screen coordinates
      const getScreenPos = (svgX: number, svgY: number) => {
        return {
          x: containerRect.left + offsetX + svgX * scale,
          y: containerRect.top + offsetY + svgY * scale
        };
      };

      // --- Helper: Track Pupil ---
      const updatePupil = (pupilRef: React.RefObject<SVGCircleElement>, svgCenterX: number, svgCenterY: number, radiusLimit: number) => {
        if (!pupilRef.current) return;
        
        const eyeCenter = getScreenPos(svgCenterX, svgCenterY);
        
        const dx = e.clientX - eyeCenter.x;
        const dy = e.clientY - eyeCenter.y;
        const angle = Math.atan2(dy, dx);
        
        // Limit movement distance
        const dist = Math.min(radiusLimit * scale, Math.hypot(dx, dy) / 10); 

        // Convert back to local SVG units for transform
        const moveX = (Math.cos(angle) * dist) / scale;
        const moveY = (Math.sin(angle) * dist) / scale;
        
        pupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      // --- Helper: Track Whole Face ---
      const updateFace = (faceRef: React.RefObject<SVGGElement>, originX: number, originY: number, limit: number) => {
        if (!faceRef.current) return;
        
        const originScreen = getScreenPos(originX, originY);
        const dx = e.clientX - originScreen.x;
        const dy = e.clientY - originScreen.y;
        
        // Soft dampening
        const moveX = Math.max(-limit, Math.min(limit, dx / 20));
        const moveY = Math.max(-limit, Math.min(limit, dy / 20));

        faceRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      // 1. Purple Eyes (Global SVG coords relative to 0,0)
      // Purple Group trans(70, 30). Eyes at local (35,70) and (85,70)
      // Global: (105, 100) and (155, 100)
      updatePupil(purplePupilLRef, 105, 100, 4);
      updatePupil(purplePupilRRef, 155, 100, 4);

      // 2. Black Eyes
      // Black Group trans(160, 80). Eyes at local (32,55) and (68,55)
      // Global: (192, 135) and (228, 135)
      updatePupil(blackPupilLRef, 192, 135, 5);
      updatePupil(blackPupilRRef, 228, 135, 5);

      // 3. Yellow Face
      // Yellow Group trans(250, 130). Center roughly local (65, 75)
      // Global: (315, 205)
      updateFace(yellowFaceRef, 315, 205, 6);

      // 4. Orange Face
      // Orange Group trans(20, 150). Center roughly local (130, 75)
      // Global: (150, 225)
      updateFace(orangeFaceRef, 150, 225, 8);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isShy, isCelebrating]);

  // Reset positions when Shy/Celebrating
  useEffect(() => {
    if (isShy || isCelebrating) {
      const reset = (ref: React.RefObject<SVGElement>) => {
        if(ref.current) ref.current.style.transform = `translate(0px, 0px)`;
      };
      [purplePupilLRef, purplePupilRRef, blackPupilLRef, blackPupilRRef].forEach(reset);
      [yellowFaceRef, orangeFaceRef].forEach(reset);
    }
  }, [isShy, isCelebrating]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative bg-[#f3f4f6]">
      <svg 
        viewBox="0 0 420 340" 
        className={`w-full h-full max-h-[400px] transition-transform duration-500 ${isCelebrating ? 'scale-105' : ''}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="purple-clip">
            <rect x="0" y="0" width="120" height="240" rx="12" />
          </clipPath>
          <clipPath id="yellow-clip">
             <path d="M 0 65 A 65 65 0 0 1 130 65 V 150 H 0 Z" />
          </clipPath>
          <clipPath id="orange-clip">
            <path d="M 0 130 A 130 130 0 0 1 260 130 Z" />
          </clipPath>
        </defs>

        {/* SHADOW BASE */}
        <ellipse cx="210" cy="290" rx="190" ry="15" fill="#E5E7EB" />

        {/* --- 1. PURPLE BLOCK (Tall, Back Left) --- */}
        <g transform={`translate(70, 30) ${isCelebrating ? 'translate(0, -30)' : ''}`} className="transition-transform duration-500">
          <g clipPath="url(#purple-clip)">
            {/* Main Body */}
            <rect x="0" y="0" width="120" height="240" fill="#8B5CF6" />
            
            {/* Face Group */}
            <g className="transition-all duration-500 ease-in-out">
              
              {/* Left Eye: Slides Left & Fades (Turn Away) */}
              <g 
                className="transition-all duration-500 ease-out"
                style={{ 
                  transform: isShy ? 'translateX(-40px)' : 'translateX(0)',
                  opacity: isShy ? 0 : 1
                }}
              >
                  <g transform="translate(35, 70)">
                      <circle r="8" fill="white" />
                      <circle ref={purplePupilLRef} r="3" fill="#000" className="eye-transition" />
                  </g>
              </g>

              {/* Right Eye: Slides Left to become the "Profile" eye */}
              <g 
                className="transition-all duration-500 ease-out"
                 style={{ 
                  transform: isShy ? 'translateX(-50px)' : 'translateX(0)',
                }}
              >
                  <g transform="translate(85, 70)">
                      <circle r="8" fill="white" />
                      <circle ref={purplePupilRRef} r="3" fill="#000" className="eye-transition" />
                  </g>
              </g>

              {/* Mouth - Moved UP to y=65 to be between eyes */}
              <rect 
                x="58" y="65" width="4" height="15" rx="2" fill="#000" 
                className="transition-all duration-500 ease-out"
                style={{ 
                  transform: isShy ? 'translateX(-45px)' : 'translateX(0)',
                  opacity: isShy ? 0.3 : 1
                }}
              />
            </g>
          </g>
        </g>

        {/* --- 2. BLACK BLOCK (Middle, Raised) --- */}
        <g transform={`translate(160, 80) ${isCelebrating ? 'translate(0, -20)' : ''}`} className="transition-transform duration-500 delay-75">
          <rect x="0" y="0" width="100" height="150" rx="12" fill="#1F2937" />
          
          <g className={`transition-opacity duration-300`}>
            {/* Eyes */}
            <g transform="translate(32, 55)">
                <circle r={isShy ? 0 : 12} fill="white" className="transition-all duration-300" />
                <circle ref={blackPupilLRef} r="5" fill="#000" className={`eye-transition ${isShy ? 'opacity-0' : 'opacity-100'}`} />
            </g>
             <g transform="translate(68, 55)">
                <circle r={isShy ? 0 : 12} fill="white" className="transition-all duration-300" />
                <circle ref={blackPupilRRef} r="5" fill="#000" className={`eye-transition ${isShy ? 'opacity-0' : 'opacity-100'}`} />
            </g>
            {/* Closed Eye Lines (Shy Mode) */}
            <path d="M 22 55 H 42" stroke="white" strokeWidth="3" strokeLinecap="round" className={`transition-opacity duration-300 ${isShy ? 'opacity-100' : 'opacity-0'}`} />
            <path d="M 58 55 H 78" stroke="white" strokeWidth="3" strokeLinecap="round" className={`transition-opacity duration-300 ${isShy ? 'opacity-100' : 'opacity-0'}`} />
          </g>
        </g>

        {/* --- 3. YELLOW CYLINDER (Right) --- */}
        <g transform={`translate(250, 130) ${isCelebrating ? 'translate(0, -25)' : ''}`} className="transition-transform duration-500 delay-100">
          <g clipPath="url(#yellow-clip)">
            <path d="M 0 65 A 65 65 0 0 1 130 65 V 150 H 0 Z" fill="#FBBF24" />
            
            {/* Face Group */}
            <g ref={yellowFaceRef} className="transition-transform duration-100 ease-out">
              <circle cx="40" cy="80" r="6" fill="#000" />
              <circle cx="90" cy="75" r="6" fill="#000" />
              <path d="M 45 110 H 95" stroke="#000" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* HANDS (Vertical Slide Up + Tilt) */}
            <g transform="translate(0, 0)"> 
              {/* Left Arm: Pivot bottom, tilt right (inward) */}
              <rect 
                x="32" y="150" width="16" height="80" rx="8" fill="#F59E0B" 
                stroke="#B45309" strokeWidth="3"
                style={{ 
                    transformOrigin: '40px 150px',
                    // Tilt 15deg inward
                    transform: isShy ? 'translateY(-75px) rotate(15deg)' : 'translateY(0px) rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
               {/* Right Arm: Pivot bottom, tilt left (inward) */}
               <rect 
                x="82" y="150" width="16" height="85" rx="8" fill="#F59E0B" 
                stroke="#B45309" strokeWidth="3"
                style={{ 
                    transformOrigin: '90px 150px',
                    // Tilt -15deg inward
                    transform: isShy ? 'translateY(-80px) rotate(-15deg)' : 'translateY(0px) rotate(0deg)',
                    transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            </g>
          </g>
        </g>

        {/* --- 4. ORANGE SEMICIRCLE (Front Center) --- */}
        <g transform={`translate(20, 150) ${isCelebrating ? 'translate(0, -15)' : ''}`} className="transition-transform duration-500 delay-150">
           <g clipPath="url(#orange-clip)">
            {/* Main Body */}
            <path d="M 0 130 A 130 130 0 0 1 260 130 Z" fill="#F97316" />
            
            {/* Face Group */}
            <g ref={orangeFaceRef} className="transition-transform duration-100 ease-out">
                <circle cx="100" cy="75" r="7" fill="#000" />
                <circle cx="160" cy="75" r="7" fill="#000" />
                <path d="M 115 100 Q 130 115 145 100" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* HANDS (Vertical Slide Up + Tilt) */}
            <g transform="translate(0, 0)">
              {/* Left Arm: Tilt 15deg inward */}
              <rect 
                  x="90" y="130" width="20" height="70" rx="10" fill="#EA580C"
                  stroke="#C2410C" strokeWidth="3"
                  style={{ 
                      transformOrigin: '100px 130px',
                      transform: isShy ? 'translateY(-65px) rotate(15deg)' : 'translateY(0px) rotate(0deg)', 
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                  }}
              />

              {/* Right Arm: Tilt -15deg inward */}
               <rect 
                  x="150" y="130" width="20" height="70" rx="10" fill="#EA580C"
                  stroke="#C2410C" strokeWidth="3"
                  style={{ 
                      transformOrigin: '160px 130px',
                      transform: isShy ? 'translateY(-65px) rotate(-15deg)' : 'translateY(0px) rotate(0deg)', 
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                  }}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default MascotPanel;
