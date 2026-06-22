import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import SocialApp from '../../videos/socialapp.mp4';
import QuizApp from '../../videos/Quiz App.mp4';
import Crud from '../../videos/Crud.mp4';
import Skjewelry from '../../videos/SK jewelry.mp4';

gsap.registerPlugin(ScrollTrigger);

// ----- MOBILE DATA (unchanged) -----
const mobileWorkItems = [
  { id: 1, title: "TWICE", category: "Interaction & Development", year: "2024", imgSrc: "https://picsum.photos/id/1015/800/600", liveLink: "#" },
  { id: 2, title: "The Damai", category: "Branding & Design", year: "2023", imgSrc: "https://picsum.photos/id/201/800/600", liveLink: "#" },
  { id: 3, title: "FABRIC™", category: "Web Experience", year: "2024", imgSrc: "https://picsum.photos/id/237/800/600", liveLink: "#" },
  { id: 4, title: "Aanstekelijk", category: "Digital Design", year: "2023", imgSrc: "https://picsum.photos/id/180/800/600", liveLink: "#" },
];

// ----- DESKTOP DATA (added subtitle field to match original design) -----
const desktopWorkItems = [
  { id: 1, title: "SOCIAL MEDIA APP", subtitle: "| HTML Tailwind Css JavaScript LocalStorage |", videoSrc: [SocialApp], liveLink: "https://social-app-hackathon.vercel.app/" },
  { id: 2, title: "QUIZ APP", subtitle: "| React.js Tailwind Css Localstorage |", videoSrc: [QuizApp], liveLink: "https://nubair-ahmed-khan.github.io/Quiz_App_Dynamic/" },
  { id: 3, title: "SK JEWELRY", subtitle: "| JavaScript React.js Tailwind Css GSAP Framer Motion | ",  videoSrc: [Skjewelry], liveLink: "https://skjewelry.vercel.app/" },
  { id: 4, title: "CRUD OPERATION", subtitle: "| HTML Css JavaScript LocalStorage |", videoSrc: [Crud], liveLink: "https://nubair-ahmed-khan.github.io/to-do-final/" },
  
  
];

const WorkSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render different components based on screen size
  return isDesktop ? <DesktopWork /> : <MobileWork />;
};

// ===================== MOBILE VERSION (exactly as you had it) =====================
const MobileWork = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text animation
    const allTitles = document.querySelectorAll('.split-text');
    allTitles.forEach((title) => {
      const text = new SplitType(title, { types: 'chars' });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleClick = (project) => {
    window.open(project.liveLink, "_blank");
  };

  return (
    <section ref={containerRef} className=" bg-zinc-900 py-16 md:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 "><br /><br />
        <pre className="text-sm uppercase mb-8 md:mb-10 text-gray-500 tracking-widest">    Recent Work</pre>
        <br />
        <div className="space-y-12 md:space-y-16 ">
          {mobileWorkItems.map((project) => (
            <div  key={project.id} onClick={() => handleClick(project)} className=" group flex flex-col md:flex-row gap-6 md:gap-10 cursor-pointer">
              <div className="w-full flex justify-around  md:w-5/12 aspect-video md:aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900">
                <img src={project.imgSrc} alt={project.title} className="w-100 h-full object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <h3 className="split-text text-3xl md:text-2xl font-medium text-white mb-3  transition-transform group-hover:-translate-x-1">
                     {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{project.category}</p>
                </div>
                <div className="mt-6 md:mt-0 flex justify-between items-end">
                  {/* <p className="text-white/70 text-sm tracking-widest">{project.year}</p> */}
                  <div className="text-[#455CE9] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Project <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== DESKTOP VERSION (exactly as you had it, with swipe and split text fixed) =====================
const DesktopWork = () => {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Split text animation (per heading)
  useEffect(() => {
    const allTitles = document.querySelectorAll('.split-text');
    if (!allTitles.length) return;

    allTitles.forEach((title) => {
      const text = new SplitType(title, { types: 'chars' });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []); // runs once after mount

  // Magnetic mouse + modal follow
  useEffect(() => {
    const xMoveModal = gsap.quickTo(modalRef.current, "left", { duration: 0.8, ease: "power3" });
    const yMoveModal = gsap.quickTo(modalRef.current, "top", { duration: 0.8, ease: "power3" });
    const xMoveCursorLabel = gsap.quickTo(cursorLabelRef.current, "left", { duration: 0.45, ease: "power3" });
    const yMoveCursorLabel = gsap.quickTo(cursorLabelRef.current, "top", { duration: 0.45, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      xMoveModal(clientX);
      yMoveModal(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.set(modalRef.current, { scale: 0, xPercent: -50, yPercent: -50 });
    gsap.set(cursorLabelRef.current, { scale: 0, xPercent: -50, yPercent: -50 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const manageMouseEnter = (index) => {
    setActiveIndex(index);
    gsap.to(modalRef.current, { scale: 1, duration: 0.4, ease: "power3" });
    gsap.to(cursorLabelRef.current, { scale: 1, duration: 0.4, ease: "power3" });
  };

  const manageMouseLeave = () => {
    gsap.to(modalRef.current, { scale: 0, duration: 0.4, ease: "power3" });
    gsap.to(cursorLabelRef.current, { scale: 0, duration: 0.4, ease: "power3" });
  };

  return (
    <section ref={containerRef} className="relative bg-black py-20 overflow-hidden"> <br/>
      <div className="max-w-[1400px] mx-auto px-10"><br />
                <pre className="text-sm uppercase mb-8 md:mb-10 text-gray-500 tracking-widest">    Recent Work</pre>
<br />
<br />

        {desktopWorkItems.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => manageMouseEnter(index)}
            onMouseLeave={manageMouseLeave}
            onClick={() => window.open(project.liveLink, "_blank")}
            className="group flex justify-between items-center py-10 border-t border-gray-200 last:border-b cursor-pointer transition-all duration-300 hover:opacity-40"
            style={{ padding: "40px" }}
          >
            <h3 className="split-text text-6xl font-medium text-white transition-transform duration-300 group-hover:-translate-x-2">
              {project.title}
            </h3> 
            <span className="text-lg text-gray-600 transition-transform duration-300 group-hover:translate-x-2">
              {project.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* Floating Video Modal with swipe transition */}
      <div
        ref={modalRef}
        className="fixed top-0 left-0 w-[400px] h-[350px] pointer-events-none overflow-hidden z-[49] rounded-lg shadow-2xl"
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(-${activeIndex * 100}%)` }}
        >
          {desktopWorkItems.map((project) => (
            <div key={`modal-${project.id}`}  className=" w-full h-full flex items-center justify-center  bg-gray-900">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={project.videoSrc} />
            </div>
          ))}
        </div>
      </div>

      {/* Magnetic "View" Button */}
      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 w-[80px] h-[80px] bg-[#455CE9] text-white flex items-center justify-center rounded-full pointer-events-none z-[50] text-sm font-medium shadow-xl"
      >
        View
      </div>
    </section>
  );
};

export default WorkSection;