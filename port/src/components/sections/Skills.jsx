import React, { useState } from 'react';

const Card = () => {
  // Card ke flip state ko manage karne ke liye
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className='bg-black w-full h-auto'>
        <br /><br />
        <h1 className="text-4xl font-extrabold font-sans text-center uppercase mb-8 md:mb-10 text-gray-500 tracking-widest bg-black">SKILLS</h1><br />
      </div>

      {/* Layout wrapper changed to md layout system */}
      <div className="flex min-h-screen flex-col md:flex-row items-center justify-center md:justify-evenly gap-8 bg-black perspective-1000 px-4 py-8">

        <div className="p-6 flex flex-col justify-between h-full bg-slate-950/40 backdrop-blur-sm rounded-2xl border border-slate-800 text-slate-100">

          <div style={{ padding: "10px" }} className="w-[320px] h-auto md:w-[340px] md:h-[540px] p-6 flex flex-col justify-between bg-slate-950/40 backdrop-blur-sm rounded-2xl border border-slate-800 text-slate-100 shadow-2xl">

            {/* Top Section: Meta & Title */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  // What I Do?
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Active</span>
                </div>
              </div>
              <br />
              <h3 className="text-2xl font-bold tracking-tight [text-shadow:0_0_12px_rgba(52,211,153,0.8)] text-white mb-1">
                <span className='text-emerald-400'>Mern</span> Stack Developer
              </h3><br />
              <span className="text-[13px] text-slate-300 leading-relaxed font-light mb-6">
                Hey! I'm <span className="text-white font-medium">Nubair Ahmed Khan</span>, <span className='text-emerald-400'>Front-End Developer</span> based in Karachi, Pakistan. I specialize in turning complex logic into interactive, dynamic, and pixel-perfect user experiences.
              </span>
              <br />
              <br />
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                DEVELOPER
                LEARNER
                CREATOR/
              </span>
            </div>

            {/* Bottom Section: Core Tech Stack with Text Sprite */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-auto pt-5 border-t border-slate-800/60">

              {/* Left Column: Front-End Tech with Sprite */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Front-End
                </h4>
                <div className="flex flex-col gap-1.5 text-[13px] font-mono">
                  {/* Sprite Text Effect for each skill */}
                  <span className="skill-sprite">HTML-5</span>
                  <span className="skill-sprite">CSS-3</span>
                  <span className="skill-sprite">Bootstrap</span>
                  <span className="skill-sprite">TailwindCss</span>
                  <span className="skill-sprite">JavaScript</span>
                  <span className="skill-sprite">TypeScript</span>
                  <span className="skill-sprite">React.js</span>
                  <span className="skill-sprite">Next.js</span>
                  <span className="skill-sprite">GSAP</span>
                  <span className="skill-sprite">Zustand</span>
                </div>
              </div>

              {/* Right Column: Backend & Database with Sprite */}
              <div className="flex flex-col gap-5">
                {/* Backend Subsection */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Backend
                  </h4>
                  <div className="flex flex-col gap-1.5 text-[13px] font-mono font-medium">
                    <span className="skill-sprite-blue">Express.js</span>
                    <span className="skill-sprite-blue">PHP</span>
                    <span className="skill-sprite-blue">Firebase</span>
                  </div>
                </div>

                {/* Database Subsection */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Database
                  </h4>
                  <div className="flex flex-col gap-1.5 text-[13px] font-mono font-medium">
                    <span className="skill-sprite-green">MongoDB</span>
                    <span className="skill-sprite-green">MySQL</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Image ID card wrapper set to hidden md:block */}
        <div
          onClick={handleFlip}
          className={` relative w-[340px] h-[540px] cursor-pointer transition-transform duration-700 transform-style-3d shadow-2xl rounded-2xl ${isFlipped ? 'rotate-y-180' : ''
            }`}
        >

          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-slate-700">
            <img
              src="/front-card.png"
              alt="Nubair Ahmed Khan - Front Card"
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-slate-700">
            <img
              src="/back-card.png"
              alt="Nubair Ahmed Khan - Back Card"
              className="w-full h-full object-cover select-none"
            />
          </div>

        </div>
      </div>

      {/* CSS for Text Sprite Animation */}
      <style jsx>{`
        /* White/Purple Sprite for Front-End */
        .skill-sprite {
          position: relative;
          display: inline-block;
          color: #94a3b8;
          font-weight: 400;
          background: linear-gradient(
            120deg,
            #94a3b8 0%,
            #94a3b8 40%,
            #ffffff 50%,
            #a78bfa 60%,
            #94a3b8 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: spriteMove 3s linear infinite;
        }

        /* Blue Sprite for Backend */
        .skill-sprite-blue {
          position: relative;
          display: inline-block;
          background: linear-gradient(
            120deg,
            #60a5fa 0%,
            #60a5fa 40%,
            #ffffff 50%,
            #3b82f6 60%,
            #60a5fa 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: spriteMove 3s linear infinite;
        }

        /* Green Sprite for Database */
        .skill-sprite-green {
          position: relative;
          display: inline-block;
          background: linear-gradient(
            120deg,
            #34d399 0%,
            #34d399 40%,
            #ffffff 50%,
            #10b981 60%,
            #34d399 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: spriteMove 3s linear infinite;
        }

        @keyframes spriteMove {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Hover effect - speed up animation */
        .skill-sprite:hover,
        .skill-sprite-blue:hover,
        .skill-sprite-green:hover {
          animation: spriteMove 1s linear infinite;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Card;