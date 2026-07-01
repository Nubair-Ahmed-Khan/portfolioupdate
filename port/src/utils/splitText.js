import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateSplitText = (element, options = {}) => {
  if (!element) return;

  const {
    type = 'chars',
    onscroll = true,
    stagger = 0.05,
    duration = 0.8,
    delay = 0,
  } = options;

  try {
    const split = new SplitType(element, { types: type });

    if (onscroll) {
      gsap.to(split.chars || split.words, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: 'power2.out',
        delay: delay,
      });
    } else {
      gsap.from(split.chars || split.words, {
        opacity: 0,
        y: 20,
        duration: duration,
        stagger: stagger,
        ease: 'power2.out',
        delay: delay,
      });
    }

    return split;
  } catch (error) {
    console.warn('SplitType error:', error);
    return null;
  }
};

export const splitTextWithReveal = (element) => {
  if (!element) return null;

  try {
    const split = new SplitType(element, { types: 'chars' });

    // Set initial state
    gsap.set(split.chars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
    });

    // Animate on scroll
    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: 'back.out',
    });

    return split;
  } catch (error) {
    console.warn('SplitText reveal error:', error);
    return null;
  }
};
