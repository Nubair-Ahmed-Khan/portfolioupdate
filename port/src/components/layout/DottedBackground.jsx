import React, { useEffect, useRef, useState } from 'react';

const DottedBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Draw dotted pattern
  const drawDots = (canvas, cursorX = null, cursorY = null, intensity = 0) => {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    console.log('Drawing dots on:', W, 'x', H); // Debug log
    
    const spacing = 20;
    const cx = W / 2;
    const cy = H * 0.45;
    const glowR = Math.min(W, H) * 0.32;

    const influenceR = 140;
    const maxExtraRadius = 2.6;
    const maxExtraAlpha = 0.35;

    ctx.clearRect(0, 0, W, H);

    // Fill with dark background (optional - if your section doesn't have bg)
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    for (let x = 0; x < W; x += spacing) {
      for (let y = 0; y < H; y += spacing) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let baseR, alpha;

        if (dist < glowR) {
          const t = dist / glowR;
          baseR = 3.8 * (1 - t * 0.55);
          alpha = 0.6 - t * 0.44;
        } else {
          const fade = Math.min(1, (dist - glowR) / 320);
          baseR = 1.8;
          alpha = 0.13 - fade * 0.11;
        }

        // Cursor magnify influence - ZOOM EFFECT
        if (intensity > 0.001 && cursorX !== null) {
          const cdx = x - cursorX;
          const cdy = y - cursorY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < influenceR) {
            const falloff = 1 - cdist / influenceR;
            const eased = falloff * falloff;
            baseR += maxExtraRadius * eased * intensity;
            alpha += maxExtraAlpha * eased * intensity;
          }
        }

        if (alpha <= 0.01) continue;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, baseR), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(210,200,180,${Math.min(1, alpha).toFixed(2)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) {
      console.log('Canvas or section not found');
      return;
    }

    // Canvas resize
    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
      drawDots(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const mouse = { x: -200, y: -200 };
    const smooth = { x: -200, y: -200 };
    let cursorScale = 1;
    let targetCursorScale = 1;
    let cursorOpacity = 0;
    let targetCursorOpacity = 0;
    let hoverIntensity = 0;
    let targetHoverIntensity = 0;
    let cursorRAF = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseEnter = () => {
      targetCursorScale = 1.6;
      targetCursorOpacity = 1;
      targetHoverIntensity = 1;
    };

    const handleMouseLeave = () => {
      targetCursorScale = 1;
      targetCursorOpacity = 0;
      targetHoverIntensity = 0;
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const updateCursor = () => {
      smooth.x += (mouse.x - smooth.x) * 0.16;
      smooth.y += (mouse.y - smooth.y) * 0.16;
      cursorScale += (targetCursorScale - cursorScale) * 0.15;
      cursorOpacity += (targetCursorOpacity - cursorOpacity) * 0.15;
      hoverIntensity += (targetHoverIntensity - hoverIntensity) * 0.12;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform =
          `translate(${smooth.x}px, ${smooth.y}px) translate(-50%, -50%) scale(${cursorScale})`;
        cursorRingRef.current.style.opacity = cursorOpacity;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform =
          `translate(${smooth.x}px, ${smooth.y}px) translate(-50%, -50%)`;
        cursorDotRef.current.style.opacity = cursorOpacity;
      }

      const rect = canvas.getBoundingClientRect();
      drawDots(
        canvas,
        smooth.x - rect.left,
        smooth.y - rect.top,
        hoverIntensity
      );

      cursorRAF = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (cursorRAF) cancelAnimationFrame(cursorRAF);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ 
        cursor: 'none',
        backgroundColor: '#0a0a0a',
        position: 'relative'
      }}
    >
      {/* Dotted Canvas - Make sure it's visible */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          display: 'block', // Ensure it's displayed
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>

      {/* Custom Cursor - Outer Ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          border: '1.2px solid rgba(232,228,220,0.85)',
          opacity: 0,
          zIndex: 9999,
          transition: 'none',
        }}
      />

      {/* Custom Cursor - Center Dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          borderRadius: '50%',
          width: '5px',
          height: '5px',
          background: 'rgba(232,228,220,0.95)',
          opacity: 0,
          zIndex: 9999,
          transition: 'none',
        }}
      />
    </div>
  );
};

export default DottedBackground;