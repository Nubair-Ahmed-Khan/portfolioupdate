import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const Header = ({ onMenuClick, isOpen }) => {
    const wheelRef = useRef(null);
    const ringContainerRef = useRef(null);
    const progressRingRef = useRef(null);
    const menuIconRef = useRef(null);
    const headerRef = useRef(null);
    const scrollAnimationRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Sync with parent isOpen prop
    useEffect(() => {
        setIsMenuOpen(isOpen);
        
        // Animate icon when menu state changes
        if (menuIconRef.current) {
            if (isOpen) {
                // Transform to close icon (X)
                gsap.to(menuIconRef.current, {
                    rotate: 45,
                    duration: 0.35,
                    ease: "back.out(0.7)"
                });
                // Animate the lines
                const lines = menuIconRef.current.querySelectorAll('.menu-line');
                gsap.to(lines[0], {
                    y: 4,
                    duration: 0.35,
                    ease: "power2.out"
                });
                gsap.to(lines[1], {
                    scaleX: 0,
                    duration: 0.25,
                    ease: "power2.out"
                });
                gsap.to(lines[2], {
                    y: -4,
                    duration: 0.35,
                    ease: "power2.out"
                });
            } else {
                // Transform back to hamburger menu
                gsap.to(menuIconRef.current, {
                    rotate: 0,
                    duration: 0.35,
                    ease: "back.out(0.7)"
                });
                const lines = menuIconRef.current.querySelectorAll('.menu-line');
                gsap.to(lines[0], {
                    y: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });
                gsap.to(lines[1], {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(lines[2], {
                    y: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });
            }
        }
    }, [isOpen]);

    // Calculate and animate scroll progress
    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
            
            let progress = 0;
            if (maxScroll > 0) {
                progress = (scrollY / maxScroll) * 100;
            }
            setScrollProgress(progress);
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateScrollProgress();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Animate ring rotation with GSAP for smoothness
    useEffect(() => {
        const ring = ringContainerRef.current;
        if (!ring) return;

        const targetRotation = (scrollProgress / 100) * 360;

        if (scrollAnimationRef.current) {
            scrollAnimationRef.current.kill();
        }

        scrollAnimationRef.current = gsap.to(ring, {
            rotate: targetRotation,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
        });
    }, [scrollProgress]);

    // Handle menu toggle
    const handleWheelClick = useCallback((e) => {
        e.stopPropagation();
        
        // Click animation - scale + ring pulse
        gsap.to(wheelRef.current, {
            scale: 0.92,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Ring glow pulse
        gsap.to(progressRingRef.current, {
            strokeWidth: 5,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                gsap.to(progressRingRef.current, {
                    strokeWidth: 3,
                    duration: 0.1
                });
                onMenuClick();
            }
        });
    }, [onMenuClick]);

    // Magnetic effect with smooth follow
    useEffect(() => {
        const wheel = wheelRef.current;
        if (!wheel) return;

        const moveWheel = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = wheel.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * 0.25;
            const y = (clientY - (top + height / 2)) * 0.25;

            gsap.to(wheel, { 
                x, y, 
                duration: 0.4, 
                ease: "power2.out" 
            });
        };

        const resetWheel = () => {
            gsap.to(wheel, { 
                x: 0, y: 0, 
                duration: 0.6, 
                ease: "elastic.out(1, 0.4)" 
            });
        };

        wheel.addEventListener("mousemove", moveWheel);
        wheel.addEventListener("mouseleave", resetWheel);

        return () => {
            wheel.removeEventListener("mousemove", moveWheel);
            wheel.removeEventListener("mouseleave", resetWheel);
        };
    }, []);

    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <header ref={headerRef} className="fixed top-5 left-10 right-0 z-[100] px-6 py-8 mix-blend-difference text-white">
            <div className="flex justify-between items-center max-w-[1800px] mx-auto">
                {/* Logo */}
                <div className="group cursor-pointer relative overflow-hidden h-7 w-48 pointer-events-auto">
                    <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] font-medium text-lg 
                        ${isMenuOpen ? '-translate-y-full' : 'group-hover:-translate-y-full'}`}>
                        © Code by Nubair
                    </span>
                    <span className={`block absolute top-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] font-medium text-lg 
                        ${isMenuOpen ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                        © Nubair Ahmed
                    </span>
                </div>

                {/* Premium Animated Circular Ring with Menu Icon */}
                <button
                    ref={wheelRef}
                    onClick={handleWheelClick}
                    className={`fixed top-6 right-6 md:top-8 md:right-12 z-[101] flex items-center justify-center rounded-full transition-shadow duration-300 cursor-pointer outline-none bg-transparent`}
                    style={{
                        width: 'clamp(80px, 12vw, 140px)',
                        height: 'clamp(80px, 12vw, 140px)',
                        filter: isMenuOpen 
                            ? "drop-shadow(0 0 20px #455ce9) drop-shadow(0 0 10px rgba(69,92,233,0.6))" 
                            : "drop-shadow(0 8px 20px rgba(0,0,0,0.3))",
                        transformOrigin: "center center"
                    }}
                    aria-label="Menu Button"
                >
                    <div className="relative w-full h-full">
                        {/* Rotating Container */}
                        <div
                            ref={ringContainerRef}
                            className="absolute inset-0"
                            style={{
                                transformOrigin: "center center"
                            }}
                        >
                            <svg
                                viewBox="0 0 100 100"
                                className="w-full h-full pointer-events-none"
                            >
                                {/* Static Background Ring */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeOpacity="0.15"
                                    className="text-white"
                                />
                                
                                {/* Animated Progress Ring */}
                                <circle
                                    ref={progressRingRef}
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    className="text-white transition-all duration-200 ease-out"
                                    style={{
                                        transition: "stroke-dashoffset 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                                        filter: "drop-shadow(0 0 2px currentColor)"
                                    }}
                                />
                            </svg>
                        </div>
                        
                        {/* Redesigned Smaller Menu Icon in Center */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                                ref={menuIconRef}
                                className="relative w-4 h-3.5 md:w-5 md:h-4"
                                style={{
                                    transformOrigin: "center center"
                                }}
                            >
                                {/* Modern Minimal Lines */}
                                <div className="absolute top-0 left-0 w-full h-px bg-white rounded-full menu-line" />
                                <div className="absolute top-1/2 left-0 w-full h-px bg-white rounded-full menu-line -translate-y-1/2" />
                                <div className="absolute bottom-0 left-0 w-full h-px bg-white rounded-full menu-line" />
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;