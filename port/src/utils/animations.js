import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const loadingAnimations = {
  // Text reveal animation
  revealText: (element) => {
    return gsap.fromTo(element,
      {
        y: 100,
        opacity: 0,
        rotationX: -45
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05
      }
    );
  },

  // Progress bar animation
  animateProgress: (element, duration = 2) => {
    return gsap.to(element, {
      width: '100%',
      duration: duration,
      ease: "power2.inOut",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        // You can update a progress number element here
      }
    });
  },

  // Floating particles
  createParticles: (container, count = 20) => {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-white/20 rounded-full';
      
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      });
      
      // Animate particle
      gsap.to(particle, {
        y: '+=100',
        x: `+=${(Math.random() - 0.5) * 50}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    return particles;
  },

  // Morphing shapes
  morphShape: (element) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(element, {
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      duration: 3,
      ease: "sine.inOut"
    })
    .to(element, {
      borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
      duration: 3,
      ease: "sine.inOut"
    });
    
    return tl;
  }
};

// Custom easing curves
gsap.registerEase("bounceCustom", function(progress) {
  if (progress < 0.5) {
    return 2 * progress * progress;
  } else {
    return -1 + (4 - 2 * progress) * progress;
  }
});