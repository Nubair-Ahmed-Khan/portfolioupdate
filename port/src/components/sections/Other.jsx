// Other.jsx
import React, { useState } from "react";

const Other = () => {
    const [isPaused, setIsPaused] = useState(false);

    // Sample project images – replace with your own URLs
    const projects = [
        { id: 1, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop&crop=center", title: "Project Alpha" },
        { id: 2, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center", title: "Project Beta" },
        { id: 3, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&crop=center", title: "Project Gamma" },
        { id: 4, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&crop=center", title: "Project Delta" },
        { id: 5, src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop&crop=center", title: "Project Epsilon" },
        { id: 6, src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center", title: "Project Zeta" },
        { id: 7, src: "https://images.unsplash.com/photo-1488590528505-98d2b853aba4?w=400&h=300&fit=crop&crop=center", title: "Project Eta" },
        { id: 8, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&crop=center", title: "Project Theta" },
    ];

    // Duplicate the array for seamless looping (2x items)
    const marqueeItems = [...projects, ...projects];

    return (
        <section className="relative w-full h-[50vh]  overflow-hidden bg-black py-16 md:py-20">
            
            {/* Subtle background glow */}
            <div className="absolute inset-0  pointer-events-none" />

            <div className="relative z-10 max-w-15xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
                <h1 className="text-4xl font-extrabold font-sans text-center uppercase mb-8 md:mb-10 text-gray-500 tracking-widest bg-black">OTHER PROJECTS</h1><br />
            </div>

            {/* Marquee Container */}
            <div
                className="relative overflow-hidden w-full cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient masks on edges for a smooth fade */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r-from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l-from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                {/* Marquee Track */}
                <div
                    className="flex gap-5 sm:gap-6 md:gap-8 marquee-track"
                    style={{
                        animationPlayState: isPaused ? "paused" : "running",
                        width: "max-content",
                    }}
                >
                    {marqueeItems.map((project, index) => (
                        <div
                            key={index}
                            className="relative  shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 h-36 sm:h-44 md:h-52 lg:h-60 rounded-xl overflow-hidden group cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl hover:scale-105"
                        >
                            <img
                                src={project.src}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Overlay with project title – appears on hover */}
                            <div className="absolute inset-0.5 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-5">
                                <span className="text-white font-semibold text-base sm:text-lg md:text-xl tracking-tight drop-shadow-lg">
                                    {project.title} 
                                    
                                </span>
                            </div>
                            {/* Glow ring on hover */}
                            <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-400/50 rounded-xl transition-all duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>



            {/* Inline styles for the marquee animation */}
            <style jsx>{`
                .marquee-track {
                    animation: marquee-scroll 28s linear infinite;
                    will-change: transform;
                }

                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                /* Smooth hover transition for the entire track */
                .marquee-track {
                    transition: animation-play-state 0.2s ease;
                }

                /* Mobile responsiveness – speed up a bit on smaller screens */
                @media (max-width: 640px) {
                    .marquee-track {
                        animation-duration: 18s;
                    }
                }

                /* For browsers that support prefers-reduced-motion */
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation-duration: 60s;
                    }
                }
            `}</style>
        </section>
    );
};

export default Other;