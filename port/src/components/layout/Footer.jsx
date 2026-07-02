import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PortfolioFooter = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const avatarRef = useRef(null);
  const arrowRef = useRef(null);
  const circleBtnRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const bottomInfoRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([avatarRef.current], { opacity: 0, scale: 0.8 });
      gsap.set(headingRef.current, { opacity: 0, y: 60 });
      gsap.set(arrowRef.current, { opacity: 0, rotation: -45 });
      gsap.set(circleBtnRef.current, { scale: 0, opacity: 0 });
      gsap.set(line1Ref.current, { scaleX: 0, transformOrigin: 'center center' });
      gsap.set(line2Ref.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set([emailRef.current, phoneRef.current], { opacity: 0, y: 30 });
      gsap.set([bottomInfoRef.current, socialsRef.current], { opacity: 0, y: 20 });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(avatarRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .to(arrowRef.current, {
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.6')
      .to(circleBtnRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.4')
      .to(line1Ref.current, {
        scaleX: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, '-=0.6')
      .to([emailRef.current, phoneRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.6')
      .to(line2Ref.current, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.5')
      .to([bottomInfoRef.current, socialsRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4');

      // Circle button hover animation
      const circleBtn = circleBtnRef.current;
      const handleMouseEnter = () => {
        gsap.to(circleBtn, {
          scale: 1.08,
          duration: 0.4,
          ease: 'power2.out'
        });
      };
      const handleMouseLeave = () => {
        gsap.to(circleBtn, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      };
      circleBtn.addEventListener('mouseenter', handleMouseEnter);
      circleBtn.addEventListener('mouseleave', handleMouseLeave);

      // Email/Phone hover
      const contactBtns = [emailRef.current, phoneRef.current];
      contactBtns.forEach(btn => {
        const enter = () => {
          gsap.to(btn, {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)',
            duration: 0.3
          });
        };
        const leave = () => {
          gsap.to(btn, {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,0.2)',
            duration: 0.3
          });
        };
        btn.addEventListener('mouseenter', enter);
        btn.addEventListener('mouseleave', leave);
      });

      return () => {
        circleBtn.removeEventListener('mouseenter', handleMouseEnter);
        circleBtn.removeEventListener('mouseleave', handleMouseLeave);
        contactBtns.forEach(btn => {
          btn.removeEventListener('mouseenter', () => {});
          btn.removeEventListener('mouseleave', () => {});
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[85vh] bg-[#181818] text-white overflow-hidden flex flex-col"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      data-responsive-footer
    >
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col flex-1 px-4 sm:px-8 lg:px-16 xl:px-24 py-6 sm:py-10">
        
        {/* Heading Section - with avatar and arrow */}
        <div className="footer-heading-section flex items-start gap-3 sm:gap-5 mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:absolute lg:top-20 lg:left-30">
          {/* Avatar */}
          <div
            ref={avatarRef}
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0 ml-0 sm:ml-4"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heading Text */}
          <div className="flex-1">
            <h1
              ref={headingRef}
              className="text-[clamp(4rem,6vw,7rem)] font-normal leading-[1.1] sm:leading-[1.05] tracking-tight"
              style={{ fontWeight: 400 }}
            >
              Let's work<br />together
            </h1>
          </div>

          {/* Arrow Icon */}
          <div
            ref={arrowRef}
            className="hidden sm:flex items-start pt-2 sm:pt-4"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Spacer - dynamic spacing */}
        <div className="flex-1 hidden lg:block" style={{ minHeight: '20px' }} />

        {/* Circle Button */}
        <div className="footer-circle-btn-container flex justify-start lg:justify-end mt-6 mb-8 lg:absolute lg:top-60 lg:right-20">
          <div ref={circleBtnRef} className="ml-0 lg:ml-24">
          <a 
          ref={emailRef}
            href="mailto:nubairahmed0@gmail.com"
              className="w-28 h-28 sm:w-32 sm:h-32 lg:w-44 lg:h-44 rounded-full bg-[#4c5fd7] flex items-center justify-center text-white text-sm sm:text-base font-medium hover:bg-[#3d4fc0] transition-colors duration-300 cursor-pointer"
              style={{ backgroundColor: '#4c5fd7' }}
              
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="footer-contact-pills flex flex-wrap gap-3 sm:gap-6 mb-8 lg:absolute lg:top-100 lg:left-55">
          <a
          style={{padding:"20px"}}
            ref={emailRef}
            href="mailto:nubairahmed0@gmail.com"
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full border border-[#333] text-sm sm:text-base text-white/90 hover:bg-[#3d4fc0] transition-all duration-300"
          >
            nubairahmed0@gmail.com
          </a>
          
          <a
          style={{padding:"20px"}}
            ref={phoneRef}
            href="tel:+31627847430"
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full border border-[#333] text-sm sm:text-base text-white/90 hover:bg-[#3d4fc0] transition-all duration-300"
          >
            +92 336 8476324 
          </a>
        </div>

        {/* Horizontal Line */}
        <div className="footer-line-wrapper mb-6 sm:mb-8">
          <div
            ref={line2Ref}
            className="h-[1px] bg-[#333] w-full lg:absolute lg:top-140"
          />
        </div>
       
        {/* Bottom Info Bar */}
        <div className="footer-bottom-info flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 mt-auto pt-4 lg:absolute lg:bottom-5 lg:right-30">
          {/* Left Side - Version & Time (empty) */}
          <div ref={bottomInfoRef} className="flex">
            {/* Empty intentionally */}
          </div>

          {/* Right Side - Social Icons */}
          <div ref={socialsRef} className="flex items-center gap-4 sm:gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/Nubair-Ahmed-Khan"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[22px] sm:h-[22px]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nubair-ahmed-0bb30a354/"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[22px] sm:h-[22px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/nubair_khan_01/?hl=en"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[22px] sm:h-[22px]">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* Responsive overrides for tablet and mobile */
        @media (max-width: 1024px) {
          [data-responsive-footer] .footer-heading-section {
            position: relative !important;
            top: auto !important;
            left: 40px !important;
            margin-top: 1rem !important;
            margin-bottom: 2rem !important;
          }
          
          [data-responsive-footer] .footer-circle-btn-container {
            position: relative !important;
            top: auto !important;
            right: 40px !important;
            margin-top: 0rem !important;
            margin-bottom: 2rem !important;
            justify-content: flex-end !important;
          }
          
          [data-responsive-footer] .footer-contact-pills {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            margin-bottom: 2rem !important;
          }
          
          [data-responsive-footer] .footer-line-wrapper {
            position: relative !important;
            margin-bottom: 2rem !important;
          }
          
          [data-responsive-footer] .footer-line-wrapper div {
            position: relative !important;
            top: auto !important;
          }
          
          [data-responsive-footer] .footer-bottom-info {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 1rem !important;
            padding-bottom: 1.5rem !important;
          }
        }
        
        /* Additional tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          [data-responsive-footer] .footer-heading-section {
            margin-top: 2rem !important;
            margin-bottom: 2.5rem !important;
          }
          
          [data-responsive-footer] .footer-circle-btn-container button {
            width: 10rem !important;
            height: 10rem !important;
          }
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 640px) {
          [data-responsive-footer] .footer-heading-section {
            flex-wrap: wrap !important;
            gap: 1rem !important;
          }
          
       
          
          [data-responsive-footer] .footer-heading-section > div:last-child {
            order: 2;
          }
          
          [data-responsive-footer] .footer-contact-pills {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          [data-responsive-footer] .footer-contact-pills a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 0.75rem 1rem !important;
          }
          
          [data-responsive-footer] .footer-circle-btn-container button {
            width: 7rem !important;
            height: 7rem !important;
            font-size: 0.875rem !important;
          }
          
          [data-responsive-footer] .footer-bottom-info {
            width: 100% !important;
          }
          
          [data-responsive-footer] .footer-bottom-info > div:last-child {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default PortfolioFooter;