import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const dotsRef = useRef([]);

  const greetings = [
    "Hello",
    "Bonjour",
    "Hola",
    "नमस्ते",
    "Ciao",
    "Olá",
    "Namaste",
    "Salaam",
    "Welcome"
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 0.8, // Slightly faster exit
          ease: "expo.inOut",
          onComplete
        });
      }
    });

    // SUPER FAST greeting sequence
    greetings.forEach((_, i) => {
      tl.fromTo(
        textRef.current[i],
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.15, // Blazing fast fade in
          ease: "power2.out" 
        }
      ).to(
        textRef.current[i],
        { 
          opacity: 0, 
          y: -30, 
          duration: 0.15, // Blazing fast fade out
          ease: "power2.in" 
        },
        "+=0.02" // Almost zero pause at the top
      );
    });

    // Speed up the floating dots to match the energy
    dotsRef.current.forEach((dot) => {
      gsap.to(dot, {
        y: `+=${Math.random() * 50}`,
        x: `+=${Math.random() * 50}`,
        duration: 0.5 + Math.random(), // Faster dot movement
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => tl.kill();
  }, [onComplete]);
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Greetings */}
      <div className="relative h-20 z-10">
        {greetings.map((text, i) => (
          <div
            key={i}
            ref={el => (textRef.current[i] = el)}
            className="absolute inset-0 flex items-center justify-center opacity-0"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "white"
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            ref={el => (dotsRef.current[i] = el)}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
