import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karein

const MenuOverlay = ({ isOpen, onClose }) => {
  const menuRef = useRef();
  const navigate = useNavigate(); // 2. Navigate function initialize karein
  
  const links = [
    { title: 'Home', path: '/' },
    { title: 'Work', path: '/work' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
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

  // 3. Navigation handler jo menu band karke page change karega
  const handleNavigation = (path) => {
    onClose(); // Pehle menu band karo
    setTimeout(() => {
      navigate(path); // Phir naye page par jao
    }, 300); // Thoda sa delay taake animation smooth lage
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 bg-[#1C1D20] z-40 transform -translate-y-full"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <nav className="text-center">
          {links.map((link) => (
            <motion.div
              key={link.title}
              className="block text-white text-5xl md:text-7xl font-medium my-4 cursor-pointer hover:text-gray-400 transition-colors"
              whileHover={{ x: 20 }}
              onClick={() => handleNavigation(link.path)} // 4. Click par function call karein
            >
              <span className="text-sm mr-4 text-gray-500 italic">0{links.indexOf(link) + 1}</span>
              {link.title}
            </motion.div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;