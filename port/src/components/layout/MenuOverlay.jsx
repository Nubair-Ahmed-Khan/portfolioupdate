import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const MenuOverlay = ({ isOpen, onClose }) => {
  const menuRef = useRef();
  const navigate = useNavigate();

  const links = [
    { title: 'Home', path: '/' },
    { title: 'Work', path: '/work' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    // 5th link – Resume (no internal route, we handle it differently)
    { title: 'Resume', path: '/resume', isExternal: true },
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        duration: 0.8,
        y: 0,
        ease: "power3.out"
      });
    } else {
      gsap.to(menuRef.current, {
        duration: 0.8,
        y: '-100%',
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  // Navigation handler for internal routes
  const handleNavigation = (path) => {
    onClose();
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // Handler for Resume (opens PDF in new tab)
  const openResume = () => {
    onClose();
    // Replace 'resume.pdf' with the actual path to your PDF
    window.open('nubair resume.pdf');
    // If you want to force download instead, use:
    // const link = document.createElement('a');
    // link.href = '/resume.pdf';
    // link.download = 'My_Resume.pdf';
    // link.click();
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 bg-[#1C1D20] z-40 transform -translate-y-full"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <nav className="text-center">
          {links.map((link, index) => {
            const isResume = link.isExternal;
            return (
              <motion.div
                key={link.title}
                className="block text-white text-5xl md:text-7xl font-medium my-4 cursor-pointer hover:text-gray-400 transition-colors"
                whileHover={{ x: 20 }}
                onClick={() => {
                  if (isResume) {
                    openResume();
                  } else {
                    handleNavigation(link.path);
                  }
                }}
              >
                <span className="text-sm mr-4 text-gray-500 italic">
                  0{index + 1}
                </span>
                {link.title}
              </motion.div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;