import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const About = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    // Hero parallax
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
    const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);
    const heroY = useTransform(scrollY, [0, 400], [0, -100]);

    // Mouse glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (isInView) controls.start('visible');
    }, [controls, isInView]);

    // Monitor state
    const [screenOn, setScreenOn] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    const toggleScreen = () => {
        setScreenOn(!screenOn);
        if (!screenOn) setActiveSlide(0);
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Slides data
    const slides = [
        {
            title: 'Frontend Development',
            icon: (
                <svg className="w-7 h-7 text-[#999D9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L15 12l-5.25-5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'ShadCN UI'],
            description: 'Building responsive, interactive, and accessible user interfaces with modern frontend technologies.',
        },
        {
            title: 'Backend Development',
            icon: (
                <svg className="w-7 h-7 text-[#999D9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
            ),
            skills: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'JWT', 'Socket.io'],
            description: 'Designing robust, scalable, and secure server-side applications and APIs.',
        },
        {
            title: 'Database & DevOps',
            icon: (
                <svg className="w-7 h-7 text-[#999D9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4zm0 5c0 2.21 3.582 4 8 4s8-1.79 8-4" />
                </svg>
            ),
            skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'Redis'],
            description: 'Managing data persistence, cloud infrastructure, and deployment pipelines.',
        },
    ];

    // Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const monitorRef = useRef(null);
    const isMonitorInView = useInView(monitorRef, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="relative bg-[#0a0a0f] overflow-x-hidden">
            {/* ===== HERO SECTION ===== */}
            <section
                className="relative h-screen w-full flex items-center justify-center overflow-hidden"
                style={{ position: 'sticky', top: 0, zIndex: 0 }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#999D9E]/10 blur-3xl pointer-events-none"
                    style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute -top-40 -right-40 w-96 h-96 bg-[#999D9E]/15 rounded-full blur-3xl"
                        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#999D9E]/10 rounded-full blur-3xl"
                        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#999D9E]/5 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-[#999D9E]/10 pointer-events-none"
                        style={{
                            width: 20 + Math.random() * 40,
                            height: 20 + Math.random() * 40,
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30 - Math.random() * 50, 0],
                            x: [0, (Math.random() - 0.5) * 40, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
                <motion.div
                    className="relative z-10 text-center px-4"
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                >
                    <motion.h1
                        className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-wider select-none"
                        initial={{ scale: 0.9, opacity: 0.3 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(153,157,158,0.15)',
                            borderRadius: '24px',
                            padding: '0.1em 0.4em',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                            display: 'inline-block',
                        }}
                    >
                        <span className="bg-gradient-to-r from-[#999D9E] via-white to-[#999D9E] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                            NUBAIR AHMED
                        </span>
                    </motion.h1>
                    <style>{`
                        @keyframes gradient {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                        .animate-gradient { animation: gradient 4s ease infinite; }
                    `}</style>
                </motion.div>
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <span className="text-[#999D9E] text-xs tracking-[0.3em] uppercase font-mono">Scroll</span>
                    <svg className="w-5 h-5 text-[#999D9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* ===== CONTENT WRAPPER ===== */}
            <div className="relative z-10 bg-[#0a0a0f] mt-[-10vh] rounded-t-3xl shadow-2xl shadow-[#999D9E]/5">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-20 md:space-y-28">
                    {/* ===== ABOUT SECTION ===== */}
                    <motion.div
                        className="grid md:grid-cols-12 gap-10 md:gap-16 items-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.div variants={itemVariants} className="md:col-span-5 flex justify-center">
                            <div className="relative w-64 sm:w-72 md:w-80 lg:w-88">
                                <motion.div
                                    className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#999D9E] via-white/30 to-[#999D9E] opacity-40 blur-xl"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                />
                                <motion.div
                                    className="absolute -inset-2 rounded-2xl border border-[#999D9E]/30"
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#999D9E]/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&auto=format"
                                        alt="Nubair Ahmed"
                                        className="w-full h-auto object-cover"
                                        style={{ minHeight: '400px', maxHeight: '600px' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/70 via-transparent to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-7 space-y-6">
                            <span className="text-[#999D9E] text-sm font-mono tracking-[0.3em] uppercase block">
                                About Me
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                                <span className="bg-gradient-to-r from-[#999D9E] to-white bg-clip-text text-transparent">
                                    Who I Am
                                </span>
                            </h2>
                            <div className="text-zinc-300 text-[15px] sm:text-[17px] leading-relaxed space-y-4">
                                <span className="block">
                                    I'm a passionate <span className="text-[#999D9E] font-medium">Full Stack Developer</span> and{' '}
                                    <span className="text-[#999D9E] font-medium">UI/UX Designer</span> with a love for crafting digital experiences that are both beautiful and functional.
                                </span>
                                <span className="block">
                                    With <span className="text-[#999D9E] font-medium">5+ years</span> of experience, I specialize in React, Next.js, and Tailwind CSS, building products that people love to use.
                                </span>
                                <span className="block">
                                    I believe in writing <span className="text-[#999D9E] font-medium">clean code</span>, focusing on{' '}
                                    <span className="text-[#999D9E] font-medium">performance</span>, and creating{' '}
                                    <span className="text-[#999D9E] font-medium">accessible</span> interfaces for everyone.
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <motion.a
                                    href="#"
                                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="absolute inset-0 bg-[#999D9E] rounded-xl" />
                                    <span className="absolute inset-0 bg-[#999D9E] rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-2 text-white text-sm">
                                        Get Resume
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </motion.a>
                                <div className="flex gap-2">
                                    {['github', 'linkedin', 'twitter'].map((icon, i) => (
                                        <motion.a
                                            key={icon}
                                            href="#"
                                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-[#999D9E] hover:border-[#999D9E]/40 hover:bg-[#999D9E]/10 transition-all duration-300"
                                            whileHover={{ y: -3, scale: 1.05 }}
                                            whileTap={{ scale: 0.92 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + i * 0.07 }}
                                        >
                                            <span className="sr-only">{icon}</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                {icon === 'github' && <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />}
                                                {icon === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                                                {icon === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                                            </svg>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ===== MONITOR SECTION ===== */}
                    <div className="relative w-[100vw]  py-8" ref={monitorRef}>
                        <div className="text-center space-y-3 mb-10">
                            <span className="text-[#999D9E] text-sm font-mono tracking-[0.3em] uppercase block">
                                My Workspace
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                <span className="bg-gradient-to-r from-[#999D9E] to-white bg-clip-text text-transparent">
                                    What I Do
                                </span>
                            </h2>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-[#999D9E] to-transparent mx-auto" />
                            <span className="text-zinc-400 text-sm block">
                                Click the power button to turn on the screen
                            </span>
                        </div>

                        <div className="flex justify-center items-center">
                            <motion.div
                                className="w-full max-w-2xl"
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={isMonitorInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Monitor Body */}
                                <div className="relative bg-[#1a1a2e] rounded-2xl p-4 shadow-2xl shadow-black/50 border border-white/10">
                                    {/* Inner Bezel */}
                                    <div className="relative bg-[#0d0d1a] rounded-xl p-4 border border-white/5">
                                        {/* Screen */}
                                        <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-inner shadow-black/80">
                                            {screenOn ? (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                    className="w-full h-full relative overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline" />
                                                    </div>
                                                    <style>{`
                                                        @keyframes scanline {
                                                            0% { transform: translateY(-100%); }
                                                            100% { transform: translateY(100%); }
                                                        }
                                                        .animate-scanline {
                                                            animation: scanline 2s linear infinite;
                                                        }
                                                    `}</style>

                                                    <div
                                                        className="flex h-full transition-transform duration-500 ease-in-out"
                                                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                                                    >
                                                        {slides.map((slide, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]"
                                                            >
                                                                <div className="text-center space-y-3 max-w-sm mx-auto">
                                                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10">
                                                                        {slide.icon}
                                                                    </div>
                                                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                                                        {slide.title}
                                                                    </h3>
                                                                    <div className="flex flex-wrap justify-center gap-1.5">
                                                                        {slide.skills.map((skill) => (
                                                                            <span
                                                                                key={skill}
                                                                                className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/10 border border-white/10 text-zinc-300"
                                                                            >
                                                                                {skill}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                                                        {slide.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button
                                                        onClick={prevSlide}
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110 z-20"
                                                    >
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={nextSlide}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110 z-20"
                                                    >
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>

                                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                                        {slides.map((_, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setActiveSlide(idx)}
                                                                className={`transition-all duration-300 rounded-full ${
                                                                    activeSlide === idx
                                                                        ? 'w-5 h-1.5 bg-[#999D9E]'
                                                                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black">
                                                    <span className="text-[#999D9E]/20 text-xs sm:text-sm font-mono tracking-[0.3em]">
                                                        POWERED OFF
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-center mt-3 sm:mt-4">
                                            <button
                                                onClick={toggleScreen}
                                                className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#999D9E]/40 transition-all duration-300 group"
                                            >
                                                <span
                                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 ${
                                                        screenOn
                                                            ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                                                            : 'bg-red-500/70'
                                                    }`}
                                                />
                                                <span className="text-[#999D9E]/50 text-[10px] sm:text-xs font-mono tracking-widest group-hover:text-[#999D9E] transition-colors duration-300">
                                                    {screenOn ? 'ON' : 'OFF'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-5 sm:w-14 sm:h-6 bg-[#1a1a2e] rounded-b-xl border-x border-b border-white/5" />
                                </div>

                                <div className="w-16 h-2 sm:w-20 sm:h-3 bg-[#1a1a2e] rounded-b-xl border-x border-b border-white/5 mx-auto" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-[#999D9E]/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
            </div>
        </div>
    );
};

export default About;