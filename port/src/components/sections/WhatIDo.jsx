import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { splitTextWithReveal } from '../../utils/splitText';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './WhatIDo.module.css';
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNode,
  FaDatabase,
  FaPhp,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiReactquery,
} from 'react-icons/si';
import { DiBootstrap } from 'react-icons/di';
// Zustand aur GSAP ke liye alternative icons
import { TbBrandReactNative } from 'react-icons/tb'; // Zustand ke liye
import { SiGrafana } from 'react-icons/si'; // GSAP ke liye alternative

const WhatIDo = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (titleRef.current) {
      splitTextWithReveal(titleRef.current);
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          rotationY: -20,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: 'power4.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        }
      );
    });
  }, []);

  const technologies = [
    { icon: FaHtml5, name: 'HTML5', color: '#FF5722' },
    { icon: FaCss3, name: 'CSS3', color: '#1572B6' },
    { icon: FaJs, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: FaReact, name: 'React.js', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'gray' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: DiBootstrap, name: 'Bootstrap', color: '#7952B3' },
    { icon: SiExpress, name: 'Express.js', color: 'white' },
    { icon: FaNode, name: 'Node.js', color: '#68A063' },
    { icon: FaPhp, name: 'PHP', color: '#777BB4' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: FaDatabase, name: 'MySQL', color: '#4479A1' },
    { icon: TbBrandReactNative, name: 'Zustand', color: '#764ABC' }, // ✅ Zustand
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: SiGrafana, name: 'GSAP', color: '#88CE02' }, // ✅ GSAP
    { icon: SiReactquery, name: 'TanStack Query', color: '#FF4154' },
    { icon: FaGitAlt, name: 'Git', color: '#F1502F' },
  ];

  const services = [
    {
      title: 'Full Stack Development',
      description: 'Building full-stack web applications using Next.js with TypeScript, TailwindCSS, Nodejs and Firebase',
    },
    {
      title: 'Responsive UI/UX',
      description: 'Developing responsive single-page applications using React.js with modern design patterns',
    },
    {
      title: 'Backend APIs',
      description: 'Creating RESTful APIs using Express for backend development',
    },
  ];

  return (
    <section className={styles.whatIdoSection}>
      <div className={styles.container}>
        <h1 ref={titleRef} className={styles.title}>
          What I Do
        </h1>

        <div className={styles.servicesWrapper}>
          <div className={styles.illustrationPlaceholder}>
            <DotLottieReact
              src="https://lottie.host/a9eab9b2-9062-4154-b445-7f8e05455d28/w7VAwBoHoh.lottie"
              loop
              autoplay
            />
          </div>

          <div className={styles.servicesContent}>
            <h2 className={styles.subtitle}>Full Stack Development</h2>
            <ul className={styles.servicesList}>
              {services.map((service, index) => (
                <li key={index} className={styles.serviceItem}>
                  <span className={styles.arrow}>▸</span>
                  {service.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.techSection}>
          <h2 className={styles.techTitle}>Technologies & Tools</h2>
          <div className={styles.techGrid}>
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={styles.techCard}
                >
                  <div className={styles.iconWrapper}>
                    <Icon style={{ color: tech.color }} className={styles.icon} />
                  </div>
                  <p className={styles.techName}>{tech.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;