'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 30,
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(at 0% 0%, rgba(255, 138, 101, 0.15) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 183, 77, 0.15) 0%, transparent 50%)',
            'radial-gradient(at 100% 0%, rgba(255, 183, 77, 0.15) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 138, 101, 0.15) 0%, transparent 50%)',
            'radial-gradient(at 0% 0%, rgba(255, 138, 101, 0.15) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 183, 77, 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(234,234,234,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(234,234,234,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 w-full h-full flex items-center">
        {/* Mobile Layout - Single Column Stacked */}
        <div className="lg:hidden w-full flex flex-col items-center justify-center space-y-8 text-center">
          
          {/* Mobile - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative group"
          >
            {/* Holographic glow */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-coral/60 via-accent-amber/60 to-accent-coral/60 blur-3xl"
            />
            
            {/* Glass morphism container */}
            <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl p-2 border border-white/10 shadow-2xl">
              {/* Animated border gradient */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-accent-coral via-accent-amber to-accent-coral opacity-75 blur-sm"
              />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden w-[200px] h-[270px] sm:w-[240px] sm:h-[320px] z-10">
                <Image
                  src="/images/profile-new.jpeg"
                  alt="Aditya's profile"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Holographic overlay */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255, 138, 101, 0.1) 50%, transparent 70%)',
                      'linear-gradient(225deg, transparent 30%, rgba(255, 183, 77, 0.1) 50%, transparent 70%)',
                      'linear-gradient(45deg, transparent 30%, rgba(255, 138, 101, 0.1) 50%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Mobile - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-4 w-full"
          >
            {/* Large Name Display */}
            <div className="space-y-2">
              <motion.h1 
                className="font-sora text-3xl sm:text-4xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex justify-center gap-1">
                  {['A', 'D', 'I', 'T', 'Y', 'A'].map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + index * 0.05,
                        ease: [0.19, 1, 0.22, 1]
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center gap-1 mt-1">
                  {['J', 'A', 'I', 'N'].map((letter, index) => (
                    <motion.span
                      key={index + 6}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + (index + 6) * 0.05,
                        ease: [0.19, 1, 0.22, 1]
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.h1>
              
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="h-1 bg-gradient-to-r from-transparent via-accent-coral to-transparent rounded-full mx-auto"
              />
            </div>

            {/* Role Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="space-y-2"
            >
              <h2 className="text-xl sm:text-2xl font-sora font-semibold text-gradient">
                AI & ML Engineer
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Data Analyst • Web Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md mx-auto"
            >
              Building intelligent systems, extracting insights from data, and creating 
              exceptional web experiences.
            </motion.p>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="grid grid-cols-2 gap-2 max-w-xs mx-auto"
            >
              {[
                'Machine Learning',
                'Python',
                'React',
                'Next.js',
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + i * 0.05, type: 'spring', stiffness: 200 }}
                  className="glass rounded-lg px-3 py-2 text-center border border-white/10"
                >
                  <span className="text-xs font-mono text-text-secondary">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xs mx-auto"
            >
              <motion.button
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-coral to-accent-amber text-white font-semibold text-sm shadow-lg"
              >
                View Projects
              </motion.button>
              <motion.a
                href="/Aditya_Jain_Resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-lg glass border border-white/20 font-semibold text-sm text-center"
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:grid grid-cols-2 gap-20 items-center w-full">
          
          {/* Left Side - Profile Photo */}
          <motion.div
            style={{ 
              y: imageY,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative flex items-center justify-start"
          >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="relative group"
        >
          {/* Holographic glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-coral/60 via-accent-amber/60 to-accent-coral/60 blur-3xl"
          />
          
          {/* Glass morphism container */}
          <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl p-2 border border-white/10 shadow-2xl">
            {/* Animated border gradient */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-accent-coral via-accent-amber to-accent-coral opacity-75 blur-sm"
            />
            
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden w-[140px] h-[190px] sm:w-[200px] sm:h-[270px] md:w-[280px] md:h-[380px] lg:w-[380px] lg:h-[520px] z-10">
              <Image
                src="/images/profile-new.jpeg"
                alt="Aditya's profile"
                fill
                className="object-cover"
                priority
              />
              
              {/* Holographic overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 30%, rgba(255, 138, 101, 0.1) 50%, transparent 70%)',
                    'linear-gradient(225deg, transparent 30%, rgba(255, 183, 77, 0.1) 50%, transparent 70%)',
                    'linear-gradient(45deg, transparent 30%, rgba(255, 138, 101, 0.1) 50%, transparent 70%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Floating orbs */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-accent-coral/30 blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-accent-amber/30 blur-2xl"
          />
        </motion.div>
      </motion.div>
      
      {/* Right Side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="space-y-3 sm:space-y-6 lg:space-y-8"
      >
        {/* Large Name Display */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <motion.h1 
            className="font-sora text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold tracking-tight flex flex-wrap gap-2 sm:gap-3 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>
              {['A', 'D', 'I', 'T', 'Y', 'A'].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.05,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  whileHover={{ 
                    y: -8,
                    color: '#FF8A65',
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-default"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <span>
              {['J', 'A', 'I', 'N'].map((letter, index) => (
                <motion.span
                  key={index + 6}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + (index + 6) * 0.05,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  whileHover={{ 
                    y: -8,
                    color: '#FF8A65',
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-default"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="h-1 bg-gradient-to-r from-accent-coral via-accent-amber to-transparent rounded-full"
          />
        </div>

        {/* Role Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-sora font-semibold text-gradient">
            AI & ML Engineer
          </h2>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-text-secondary">
            Data Analyst • Web Developer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl"
        >
          Building intelligent systems, extracting insights from data, and creating 
          exceptional web experiences. Transforming complex problems into elegant solutions.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
        >
          {[
            'Machine Learning',
            'Deep Learning',
            'Data Analytics',
            'Python',
            'React',
            'Next.js',
            'TensorFlow',
            'SQL'
          ].map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.05, type: 'spring', stiffness: 200 }}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              className="glass rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-center border border-white/10 hover:border-accent-amber/40 transition-all duration-300 cursor-default group"
            >
              <span className="text-[10px] sm:text-xs md:text-sm font-mono text-text-secondary group-hover:text-accent-amber transition-colors duration-300">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-wrap gap-3 sm:gap-4 pt-4"
        >
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              projectsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-accent-coral to-accent-amber text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-accent-coral/50 transition-all duration-300"
          >
            View Projects
          </motion.button>
          <motion.a
            href="/Aditya_Jain_Resume.pdf"
            download
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg glass border border-white/20 hover:border-accent-amber/50 font-semibold text-sm sm:text-base transition-all duration-300 inline-block"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
      
      </div>
      </div>
      
      {/* Floating particles with depth */}
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 3 + 2;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'rgba(255, 138, 101, 0.4)' : 'rgba(255, 183, 77, 0.4)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        );
      })}
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent-amber rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
