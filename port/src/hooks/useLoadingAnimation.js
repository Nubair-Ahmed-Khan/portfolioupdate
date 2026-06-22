import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useLoadingAnimation = () => {
  const timeline = useRef();

  const initLoadingAnimation = () => {
    timeline.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power4.inOut" }
    });

    // Create complex animation sequence
    timeline.current
      // Phase 1: Initial reveal
      .fromTo('.loading-logo', 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
      )
      
      // Phase 2: Text wave
      .fromTo('.loading-text span',
        { y: 100, opacity: 0, skewY: 15 },
        { 
          y: 0, 
          opacity: 1, 
          skewY: 0, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.4)" 
        },
        "-=0.5"
      )
      
      // Phase 3: Particle explosion
      .to('.loading-particle', {
        scale: 1,
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out"
      }, "-=0.3")
      
      // Phase 4: Progress fill with glow
      .to('.loading-progress', {
        width: '100%',
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          document.querySelector('.progress-number').textContent = `${progress}%`;
        }
      })
      
      // Phase 5: Final transition
      .to('.loading-container', {
        y: '-100%',
        duration: 1.2,
        ease: "power4.inOut"
      });

    return timeline.current;
  };

  const play = () => {
    if (timeline.current) {
      timeline.current.restart();
    }
  };

  const pause = () => {
    if (timeline.current) {
      timeline.current.pause();
    }
  };

  const complete = () => {
    if (timeline.current) {
      timeline.current.progress(1);
    }
  };

  useEffect(() => {
    initLoadingAnimation();

    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, []);

  return { play, pause, complete, timeline: timeline.current };
};