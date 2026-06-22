import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

const Hero = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    const containerRef = useRef(null);

    let xPercent = 0;
    let direction = -1;
    let autoScrollId = null;

    // Enhanced hover & inertia state
    let isHovering = false;
    let velocity = 0;
    let decelerating = false;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    
    // New: Smooth velocity tracking
    let smoothVelocity = 0;
    let rafId = null;

    // Sound - iPhone Timer style click
    const clickSound = useRef(null);
    let lastClickTime = 0;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ---------- split text animation ----------
        const splitFirst = new SplitType(firstText.current, { types: 'chars' });
        const splitSecond = new SplitType(secondText.current, { types: 'chars' });
        const allChars = [...splitFirst.chars, ...splitSecond.chars];
        gsap.from(allChars, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.02,
            ease: "power4.out",
            delay: 3.5
        });

        // ---------- iPhone Timer style click sound ----------
        clickSound.current = new Audio();
        clickSound.current.src = 'data:audio/wav;base64,U3RlYWx0aCBzb3VuZCBnZW5lcmF0b3IgdXNlIGZvciBjbGljayBzb3VuZA==';
        clickSound.current.volume = 0.12;
        
        const playClickSound = () => {
            const now = Date.now();
            if (now - lastClickTime > 65) {
                lastClickTime = now;
                const clone = clickSound.current.cloneNode();
                clone.volume = 0.12;
                clone.play().catch(e => console.log("Click sound blocked"));
            }
        };

        // ---------- Enhanced position application with smooth interpolation ----------
        const applyPosition = () => {
            gsap.set(firstText.current, { xPercent: xPercent });
            gsap.set(secondText.current, { xPercent: xPercent });
        };

        const wrapPosition = () => {
            if (xPercent <= -100) xPercent = 0;
            if (xPercent > 0) xPercent = -100;
        };

        // ---------- Smooth auto-scroll with velocity damping ----------
        const animateAutoScroll = () => {
            if (!isHovering && !decelerating) {
                // Base speed with subtle easing
                const baseSpeed = 0.045;
                xPercent += baseSpeed * direction;
                wrapPosition();
                applyPosition();
            }
            autoScrollId = requestAnimationFrame(animateAutoScroll);
        };
        animateAutoScroll();

        // ---------- Enhanced inertia deceleration with easing ----------
        const startDeceleration = () => {
            if (decelerating) return;
            decelerating = true;
            
            const decelerate = () => {
                if (!decelerating) return;
                
                // Smooth deceleration curve
                velocity *= 0.94;
                smoothVelocity = smoothVelocity * 0.9 + velocity * 0.1;
                
                const moveAmount = smoothVelocity * 0.45;
                xPercent += moveAmount;
                wrapPosition();
                applyPosition();
                
                if (Math.abs(velocity) < 0.015 && Math.abs(smoothVelocity) < 0.01) {
                    decelerating = false;
                    velocity = 0;
                    smoothVelocity = 0;
                    return;
                }
                
                requestAnimationFrame(decelerate);
            };
            requestAnimationFrame(decelerate);
        };

        // ---------- Enhanced mouse movement with better velocity calculation ----------
        const onMouseEnter = () => {
            isHovering = true;
            decelerating = false;
            velocity = 0;
            smoothVelocity = 0;
        };

        const onMouseMove = (e) => {
            if (!isHovering) return;
            
            const currentX = e.clientX;
            const currentTime = Date.now();
            
            // Throttle for performance
            if (lastMoveTime && currentTime - lastMoveTime < 8) return;

            if (lastMoveX !== 0) {
                const deltaX = currentX - lastMoveX;
                const deltaTime = Math.max(16, currentTime - lastMoveTime);
                
                // Enhanced sensitivity curve for more natural feel
                const sensitivityBase = 0.28;
                let sensitivity = sensitivityBase;
                
                // Dynamic sensitivity based on movement speed
                const speed = Math.abs(deltaX / deltaTime);
                if (speed > 1.5) sensitivity = sensitivityBase * 1.2;
                if (speed < 0.5) sensitivity = sensitivityBase * 0.8;
                
                let deltaPercent = (deltaX / window.innerWidth) * 100 * sensitivity;
                
                // Limit maximum movement per frame for smoothness
                deltaPercent = Math.min(Math.max(deltaPercent, -12), 12);
                
                xPercent += deltaPercent;
                wrapPosition();
                applyPosition();

                // Enhanced velocity calculation with smoothing
                const rawVelocity = (deltaX / deltaTime) * 10;
                velocity = velocity * 0.7 + rawVelocity * 0.3;
                
                // Play sound on movement (throttled)
                if (Math.abs(deltaX) > 3) {
                    playClickSound();
                }
            }

            lastMoveX = currentX;
            lastMoveTime = currentTime;
        };

        const onMouseLeave = () => {
            isHovering = false;
            if (Math.abs(velocity) > 0.08) {
                startDeceleration();
            }
            // Reset tracking
            setTimeout(() => {
                if (!isHovering) {
                    lastMoveX = 0;
                    lastMoveTime = 0;
                }
            }, 100);
        };

        // ---------- Touch support with improved handling ----------
        const onTouchStart = (e) => {
            isHovering = true;
            decelerating = false;
            velocity = 0;
            smoothVelocity = 0;
            const touch = e.touches[0];
            lastMoveX = touch.clientX;
            lastMoveTime = Date.now();
            e.preventDefault();
        };

        const onTouchMove = (e) => {
            if (!isHovering) return;
            const touch = e.touches[0];
            const fakeEvent = { clientX: touch.clientX };
            onMouseMove(fakeEvent);
            e.preventDefault();
        };

        const onTouchEnd = () => {
            onMouseLeave();
        };

        // ---------- attach events ----------
        const container = containerRef.current;
        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);
        
        // Touch events
        container.addEventListener('touchstart', onTouchStart);
        container.addEventListener('touchmove', onTouchMove);
        container.addEventListener('touchend', onTouchEnd);

        // ---------- scrolltrigger for direction with smoother transition ----------
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.35,
                onUpdate: (e) => {
                    direction = e.direction * -1;
                },
            },
            x: "-500px",
            ease: "power2.out",
        });

        // ---------- cleanup ----------
        return () => {
            if (autoScrollId) cancelAnimationFrame(autoScrollId);
            if (rafId) cancelAnimationFrame(rafId);
            splitFirst.revert();
            splitSecond.revert();
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#999d9e]">
            {/* Background Image Placeholder */}
            <div className="absolute z-10 w-[300px] md:w-[450px]">
                <img src="" alt="portrait" className="w-full h-auto" />
            </div>

            {/* Marquee Container - Enhanced styling for visibility */}
            <div
                ref={containerRef}
                className="absolute bottom-[-3%] whitespace-nowrap overflow-visible cursor-grab active:cursor-grabbing select-none"
                style={{ 
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                }}
            >
                <div ref={slider} className="relative flex">
                    <h1
                        ref={firstText}
                        className="text-[15vw] font-medium text-white pr-10 m-0 uppercase tracking-tight"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            willChange: 'transform'
                        }}
                    >
                        Nubair Ahmed Khan —
                    </h1>
                    <h1
                        ref={secondText}
                        className="text-[15vw] font-medium text-white pr-10 m-0 uppercase absolute left-full tracking-tight"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            willChange: 'transform'
                        }}
                    >
                        Nubair Ahmed Khan —
                    </h1>
                </div>
            </div>

            {/* Side Info */}
            <div className='absolute top-[28%] right-[29%] border rounded font-bold hidden md:block z-20'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                </svg>
            </div>

            <div className="absolute right-[3%] top-[38%] text-white hidden md:block z-20">
                    <p className="text-2xl md:text-3xl font-light tracking-tight leading-none uppercase">
                        Front End Developer 
                    </p>
                
            </div>
        </section>
    );
};

export default Hero;