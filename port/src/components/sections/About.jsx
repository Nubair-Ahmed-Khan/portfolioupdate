import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { splitTextWithReveal } from '../../utils/splitText';
import styles from './About.module.css';
import aboutprofile from '../../../public/aboutprofile.jpg';

const About = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Dotted pattern drawing function with cursor zoom effect
  const drawDots = (canvas, cursorX = null, cursorY = null, intensity = 0) => {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const spacing = 25;
    const cx = W / 2;
    const cy = H * 0.45;
    const glowR = Math.min(W, H) * 0.32;

    const influenceR = 140;
    const maxExtraRadius = 2.6;
    const maxExtraAlpha = 0.35;

    ctx.clearRect(0, 0, W, H);
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
        if (intensity > 0.001 && cursorX !== null && cursorY !== null) {
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
    if (titleRef.current) {
      splitTextWithReveal(titleRef.current);
    }

    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        },
      }
    );

    // Setup canvas and cursor
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    // Mouse tracking with smooth interpolation
    const mouse = { x: -200, y: -200 };
    const smooth = { x: -200, y: -200 };
    let cursorScale = 1;
    let targetCursorScale = 1;
    let cursorOpacity = 0;
    let targetCursorOpacity = 0;
    let hoverIntensity = 0;
    let targetHoverIntensity = 0;
    let animationFrameId = null;

    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      drawDots(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse event handlers
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
      // Reset mouse position when leaving
      mouse.x = -200;
      mouse.y = -200;
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const updateCursor = () => {
      // Lerp everything for smoothness
      smooth.x += (mouse.x - smooth.x) * 0.16;
      smooth.y += (mouse.y - smooth.y) * 0.16;
      cursorScale += (targetCursorScale - cursorScale) * 0.15;
      cursorOpacity += (targetCursorOpacity - cursorOpacity) * 0.15;
      hoverIntensity += (targetHoverIntensity - hoverIntensity) * 0.12;

      // Update custom cursor - Outer Ring
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform =
          `translate(${smooth.x}px, ${smooth.y}px) translate(-50%, -50%) scale(${cursorScale})`;
        cursorRingRef.current.style.opacity = cursorOpacity;
      }

      // Update custom cursor - Center Dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform =
          `translate(${smooth.x}px, ${smooth.y}px) translate(-50%, -50%)`;
        cursorDotRef.current.style.opacity = cursorOpacity;
      }

      // Redraw dots with cursor position
      const rect = canvas.getBoundingClientRect();
      drawDots(
        canvas,
        smooth.x - rect.left,
        smooth.y - rect.top,
        hoverIntensity
      );

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const technologies = {
    left: ['Next.js', 'TailwindCSS', 'MYSQL', 'Express.js', 'CSS Animations'],
    right: ['React.js', 'PHP', 'Zustand', 'Firebase', 'MangoDB']
  };

  return (
    <section 
      ref={sectionRef} 
      className={styles.aboutSection}
      style={{ 
        position: 'relative', 
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        cursor: 'none' // Hide default cursor
      }}
    >
      {/* Canvas for dots */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

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

      <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
        <h1 ref={titleRef} className={styles.title}>About Me</h1>
        
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.greeting}>Hello ! </h2>
            
            <p className={styles.text}>
              My name is <span className={styles.highlight}>Nubair Ahmed Khan</span>, and I have recently completed my <span className={styles.highlight}>Intermediate (Pre-Engineering)</span> with a strong foundation in science and mathematics. I also successfully completed the <span className={styles.highlight}>Web and App Development</span> course from <span className={styles.highlight}>Saylani Mass IT Training (SMIT)</span>, where I developed my passion for modern web technologies.
            </p>

            <p className={styles.text}>
              Currently, I am working as a <span className={styles.highlight}>Frontend Trainer</span> at <span className={styles.highlight}>Global Computer Institute</span>, where I have been teaching and mentoring students for the past year. This role has allowed me to strengthen my understanding of frontend technologies while helping others build their skills in web development.
            </p>

            <p className={styles.text}>
              Currently, my focus is on expanding my skill set by diving deeper into <span className={styles.highlight}>React.js, Next.js, and modern frontend frameworks</span> to stay updated with industry trends and best practices.
            </p>

            <p className={styles.techIntro}>Here are a few technologies I've been working with recently:</p>

            <div className={styles.techGrid}>
              <ul className={styles.techColumn}>
                {technologies.left.map((tech, index) => (
                  <li key={index}>
                    <span className={styles.bullet}>•</span> {tech}
                  </li>
                ))}
              </ul>
              <ul className={styles.techColumn}>
                {technologies.right.map((tech, index) => (
                  <li key={index}>
                    <span className={styles.bullet}>•</span> {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div style={{ height:"fit-content"}} ref={imageRef} className={styles.imageBorder}>
              <div className={styles.imageGradient}></div>
              <div className={styles.imagePlaceholder}>
                <img src={aboutprofile} alt="Nubair Ahmed Khan" className={styles.profileImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;