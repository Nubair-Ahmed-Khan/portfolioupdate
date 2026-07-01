import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import Profile from '../../../public/profile.png';

const Hero = () => {
    const firstText  = useRef(null);
    const secondText = useRef(null);
    const slider     = useRef(null);
    const containerRef = useRef(null);
    const profileRef   = useRef(null);
    const canvasRef    = useRef(null);
    const cursorRingRef = useRef(null);
    const cursorDotRef  = useRef(null);

    let xPercent = 0;
    let direction = -1;
    let autoScrollId = null;
    let isHovering = false;
    let velocity = 0;
    let decelerating = false;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let smoothVelocity = 0;

    // ── Draw dotted pattern on canvas ──────────────────
    // cursorX / cursorY: cursor position relative to canvas (or null if not hovering)
    // intensity: 0-1, how "active" the cursor-magnify effect currently is (smoothly faded)
    const drawDots = (canvas, cursorX = null, cursorY = null, intensity = 0) => {
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;
        const spacing = 20;
        const cx = W / 2;
        const cy = H * 0.45;
        const glowR = Math.min(W, H) * 0.32;

        // How far the cursor's influence reaches, and how much extra radius it adds
        const influenceR = 140;
        const maxExtraRadius = 2.6;
        const maxExtraAlpha = 0.35;

        ctx.clearRect(0, 0, W, H);

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

                // ── Cursor magnify influence ──
                if (intensity > 0.001 && cursorX !== null) {
                    const cdx = x - cursorX;
                    const cdy = y - cursorY;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                    if (cdist < influenceR) {
                        const falloff = 1 - cdist / influenceR; // 1 at center, 0 at edge
                        const eased = falloff * falloff; // smoother falloff curve
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
        gsap.registerPlugin(ScrollTrigger);

        // ── Canvas setup ──────────────────────────────
        const canvas = canvasRef.current;
        const section = canvas.parentElement;

        const resizeCanvas = () => {
            canvas.width  = section.offsetWidth;
            canvas.height = section.offsetHeight;
            drawDots(canvas);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // ── Lenis smooth scroll ───────────────────────
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
            infinite: false,
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // ── SplitType animation ───────────────────────
        const splitFirst  = new SplitType(firstText.current,  { types: 'chars' });
        const splitSecond = new SplitType(secondText.current, { types: 'chars' });
        gsap.from([...splitFirst.chars, ...splitSecond.chars], {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.02,
            ease: 'power4.out',
            delay: 3.5,
        });

        // ── Profile: B&W → color on hover ─────────────
        gsap.set(profileRef.current, { filter: 'grayscale(100%)', scale: 1 });

        const onProfileEnter = () => gsap.to(profileRef.current, {
            filter: 'grayscale(0%)', scale: 1.05,
            duration: 0.9, ease: 'power3.out',
        });
        const onProfileLeave = () => gsap.to(profileRef.current, {
            filter: 'grayscale(100%)', scale: 1,
            duration: 0.9, ease: 'power3.out',
        });

        const profileEl = profileRef.current;
        profileEl.addEventListener('mouseenter', onProfileEnter);
        profileEl.addEventListener('mouseleave', onProfileLeave);

        // ── Custom cursor + dotted-bg magnify effect ──
        // raw target mouse position (viewport coords)
        const mouse = { x: -200, y: -200 };
        // smoothed/lerped position, used for both the cursor UI and the dot glow
        const smooth = { x: -200, y: -200 };

        let cursorScale = 1;
        let targetCursorScale = 1;

        let cursorOpacity = 0;
        let targetCursorOpacity = 0;

        let hoverIntensity = 0;
        let targetHoverIntensity = 0;

        let cursorRAF = null;

        const onSectionMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const onSectionMouseEnter = () => {
            targetCursorScale = 1.6;
            targetCursorOpacity = 1;
            targetHoverIntensity = 1;
        };
        const onSectionMouseLeave = () => {
            targetCursorScale = 1;
            targetCursorOpacity = 0;
            targetHoverIntensity = 0;
        };

        section.addEventListener('mousemove', onSectionMouseMove);
        section.addEventListener('mouseenter', onSectionMouseEnter);
        section.addEventListener('mouseleave', onSectionMouseLeave);

        const updateCursor = () => {
            // lerp everything for buttery smoothness
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

            // redraw dots relative to canvas, using the same smoothed position
            const rect = canvas.getBoundingClientRect();
            drawDots(canvas, smooth.x - rect.left, smooth.y - rect.top, hoverIntensity);

            cursorRAF = requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // ── Marquee helpers ───────────────────────────
        const applyPosition = () => {
            gsap.set(firstText.current,  { xPercent });
            gsap.set(secondText.current, { xPercent });
        };
        const wrapPosition = () => {
            if (xPercent <= -100) xPercent = 0;
            if (xPercent > 0)     xPercent = -100;
        };

        // ── Auto scroll ───────────────────────────────
        const animateAutoScroll = () => {
            if (!isHovering && !decelerating) {
                xPercent += 0.045 * direction;
                wrapPosition();
                applyPosition();
            }
            autoScrollId = requestAnimationFrame(animateAutoScroll);
        };
        animateAutoScroll();

        // ── Inertia deceleration ──────────────────────
        const startDeceleration = () => {
            if (decelerating) return;
            decelerating = true;
            const decelerate = () => {
                if (!decelerating) return;
                velocity *= 0.94;
                smoothVelocity = smoothVelocity * 0.9 + velocity * 0.1;
                xPercent += smoothVelocity * 0.45;
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

        // ── Mouse / touch events (marquee drag) ───────
        const onMouseEnter = () => {
            isHovering = true;
            decelerating = false;
            velocity = 0;
            smoothVelocity = 0;
        };
        const onMouseMove = (e) => {
            if (!isHovering) return;
            const currentX   = e.clientX;
            const currentTime = Date.now();
            if (lastMoveTime && currentTime - lastMoveTime < 8) return;
            if (lastMoveX !== 0) {
                const deltaX    = currentX - lastMoveX;
                const deltaTime = Math.max(16, currentTime - lastMoveTime);
                const speed     = Math.abs(deltaX / deltaTime);
                let sensitivity = 0.28;
                if (speed > 1.5) sensitivity = 0.336;
                if (speed < 0.5) sensitivity = 0.224;
                let delta = (deltaX / window.innerWidth) * 100 * sensitivity;
                delta = Math.min(Math.max(delta, -12), 12);
                xPercent += delta;
                wrapPosition();
                applyPosition();
                const rawVel = (deltaX / deltaTime) * 10;
                velocity = velocity * 0.7 + rawVel * 0.3;
            }
            lastMoveX    = currentX;
            lastMoveTime = currentTime;
        };
        const onMouseLeave = () => {
            isHovering = false;
            if (Math.abs(velocity) > 0.08) startDeceleration();
            setTimeout(() => { if (!isHovering) { lastMoveX = 0; lastMoveTime = 0; } }, 100);
        };
        const onTouchStart = (e) => {
            isHovering = true; decelerating = false;
            velocity = 0; smoothVelocity = 0;
            lastMoveX = e.touches[0].clientX;
            lastMoveTime = Date.now();
            e.preventDefault();
        };
        const onTouchMove  = (e) => { onMouseMove({ clientX: e.touches[0].clientX }); e.preventDefault(); };
        const onTouchEnd   = () => onMouseLeave();

        const container = containerRef.current;
        container.addEventListener('mouseenter',  onMouseEnter);
        container.addEventListener('mousemove',   onMouseMove);
        container.addEventListener('mouseleave',  onMouseLeave);
        container.addEventListener('touchstart',  onTouchStart, { passive: false });
        container.addEventListener('touchmove',   onTouchMove,  { passive: false });
        container.addEventListener('touchend',    onTouchEnd);

        // ── Scroll direction trigger ──────────────────
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.35,
                onUpdate: (e) => { direction = e.direction * -1; },
            },
            x: '-500px',
            ease: 'power2.out',
        });

        return () => {
            if (autoScrollId) cancelAnimationFrame(autoScrollId);
            if (cursorRAF) cancelAnimationFrame(cursorRAF);
            window.removeEventListener('resize', resizeCanvas);
            splitFirst.revert();
            splitSecond.revert();
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mousemove',  onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove',  onTouchMove);
            container.removeEventListener('touchend',   onTouchEnd);
            profileEl.removeEventListener('mouseenter', onProfileEnter);
            profileEl.removeEventListener('mouseleave', onProfileLeave);
            section.removeEventListener('mousemove', onSectionMouseMove);
            section.removeEventListener('mouseenter', onSectionMouseEnter);
            section.removeEventListener('mouseleave', onSectionMouseLeave);
            ScrollTrigger.getAll().forEach(t => t.kill());
            lenis.destroy();
        };
    }, []);

    return (
        <section
            className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
            style={{ cursor: 'none' }}
        >

            {/* ── Dotted pattern canvas ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
            />

            {/* ── Radial glow behind image ── */}
            <div
                className="absolute left-1/2 z-[2] pointer-events-none"
                style={{
                    top: '45%',
                    transform: 'translate(-50%, -40%)',
                    width: '480px',
                    height: '520px',
                    background: 'radial-gradient(ellipse at center, rgba(200,188,160,0.14) 0%, rgba(150,138,110,0.07) 45%, transparent 72%)',
                }}
            />

            {/* ── Profile image ── */}
            <div
                ref={profileRef}
                className="absolute z-[3] w-[280px] md:w-[420px]"
                style={{
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -55%)',
                    backgroundImage: `url(${Profile})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    willChange: 'transform, filter',
                }}
            />



            {/* ── Location tag left ── */}
            <div className="absolute left-8 bottom-[40%] z-20">
                <p className="text-[10px] tracking-[.12em] uppercase"
                   style={{
                       color: 'rgba(232,228,220,0.22)',
                       writingMode: 'vertical-lr',
                       transform: 'rotate(180deg)',
                   }}>
                    Karachi, PK &nbsp;/&nbsp; 2024
                </p>
            </div>

            {/* ── Side info right ── */}
            <div className="absolute right-8 top-[30%] z-20 max-w-[150px] hidden md:block">
                <svg width="22" style={{ marginBottom: '.8rem', transform: 'rotate(135deg)' }}
                     viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="rgba(232,228,220,0.4)" strokeWidth="1.2"
                          strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[.95rem] leading-snug font-light uppercase tracking-tight"
                   style={{ color: 'rgba(232,228,220,0.65)' }}>
                    Front End Developer &amp; Creative Learner
                </p>
            </div>

            {/* ── Marquee ── */}
            <div
                ref={containerRef}
                className="absolute bottom-[-3%] whitespace-nowrap overflow-visible z-20
                           cursor-grab active:cursor-grabbing select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div ref={slider} className="relative flex">
                    <h1 ref={firstText}
                        className="text-[15vw] font-medium pr-10 m-0 uppercase tracking-tight"
                        style={{ color: '#e8e4dc', willChange: 'transform', opacity: 0.88 }}>
                        Nubair Ahmed Khan —
                    </h1>
                    <h1 ref={secondText}
                        className="text-[15vw] font-medium pr-10 m-0 uppercase tracking-tight absolute left-full"
                        style={{ color: '#e8e4dc', willChange: 'transform', opacity: 0.88 }}>
                        Nubair Ahmed Khan —
                    </h1>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="absolute bottom-5 left-10 right-10 flex justify-between items-end z-20">
                <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase"
                     style={{ color: 'rgba(232,228,220,0.25)' }}>
                    <div style={{
                        width: '2rem', height: '1px',
                        background: 'rgba(232,228,220,0.15)',
                    }} />
                    Scroll
                </div>
                <span className="text-[10px] tracking-widest"
                      style={{ color: 'rgba(232,228,220,0.2)' }}>
                    © 2026
                </span>
            </div>

            {/* ── Custom cursor: outer ring ── */}
            <div
                ref={cursorRingRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
                style={{
                    width: '38px',
                    height: '38px',
                    border: '1.2px solid rgba(232,228,220,0.85)',
                    opacity: 0,
                }}
            />

            {/* ── Custom cursor: center dot ── */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
                style={{
                    width: '5px',
                    height: '5px',
                    background: 'rgba(232,228,220,0.95)',
                    opacity: 0,
                }}
            />

        </section>
    );
};

export default Hero;