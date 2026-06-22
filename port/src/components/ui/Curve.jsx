import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Curve = ({ word }) => {
    const pathRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });

        // --- SVG Paths (The Professional Morph) ---
        // 1. Start: Screen ke niche se curve start ho raha hai
        const startPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
        // 2. Mid: Bilkul flat square (poori screen cover)
        const endPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
        // 3. Exit: Nichla hissa upar ki taraf "bend" ho raha hai (The Elastic Exit)
        const exitPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - 300} 0 ${height} L0 0`;

        const tl = gsap.timeline();

        // Animation Sequence
        tl.set(containerRef.current, { top: "0" })
            .set(pathRef.current, { attr: { d: startPath } })

            // Step 1: Text reveal (Dot + Word)
            .fromTo(textRef.current, { opacity: 0, y: 100 }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power4.out"
            })

            // Step 2: Exit Curve (Asli Dennis Style morphing)
            .to(pathRef.current, {
                attr: { d: endPath },
                duration: 0.7,
                ease: "power3.in"
            }, "+=0.3") // Thoda hold karne ke baad

            .to(pathRef.current, {
                attr: { d: exitPath },
                duration: 0.7,
                ease: "power3.out"
            })

            // Step 3: Container ko screen se bahar phenkna
            .to(containerRef.current, {
                top: "-110vh", // Thoda extra upar taake curve nazar na aaye baad mein
                duration: 0.9,
                ease: "power4.inOut"
            }, "-=0.7") // Morphing ke saath hi slide out shuru ho jaye

            // Step 4: Text ko saath hi fade out karna
            .to(textRef.current, {
                opacity: 0,
                y: -100,
                duration: 0.5,
                ease: "power2.in"
            }, "-=1.2");

    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] pointer-events-none"
        >
            {/* SVG Overlay with correct scaling */}
            <svg
                className="absolute w-full h-[calc(100vh+600px)] bg-black    top-0"
                preserveAspectRatio="none"
            >
                <path ref={pathRef} />
            </svg>

            {/* Transition Text Container */}
            <div
                ref={textRef}
                className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl md:text-8xl font-medium flex items-center gap-6 z-[10000]"
            >
                {/* <div className="w-4 h-4 bg-white rounded-full"></div> */}
                <span className="tracking-tight text-7xl">{word}</span>
            </div>
        </div>
    );
};

export default Curve;