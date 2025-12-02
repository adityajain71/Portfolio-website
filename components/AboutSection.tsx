'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const expertise = [
  'Machine Learning & AI',
  'Deep Learning & Neural Networks',
  'Data Analysis & Visualization',
  'Statistical Modeling',
  'Full-Stack Web Development',
  'Frontend Development (React/Next.js)',
  'Backend Development (Node.js/Python)',
  'Database Design & Management',
  'Cloud & DevOps',
];

const domains = [
  { name: 'AI & Machine Learning', description: 'Model development, training, and deployment at scale' },
  { name: 'Data Analytics', description: 'Statistical analysis, data visualization, and insights extraction' },
  { name: 'Web Development', description: 'Modern full-stack applications with React, Next.js, and Node.js' },
  { name: 'Data Engineering', description: 'ETL pipelines, data warehousing, and big data processing' },
  { name: 'Cloud & DevOps', description: 'AWS/Azure deployment, CI/CD, and infrastructure automation' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-16"
        >
          {/* Section Title */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold"
            >
              About
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="h-px bg-gradient-to-r from-accent-blue to-transparent" 
            />
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6 max-w-3xl"
          >
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              I'm a versatile technologist with expertise spanning AI/ML Engineering, Data Analytics, 
              and Full-Stack Web Development. I build intelligent systems, extract actionable insights 
              from data, and create exceptional web experiences.
            </p>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              From training neural networks and deploying machine learning models to analyzing complex 
              datasets and building modern web applications, I bring a comprehensive skill set to solve 
              diverse technical challenges.
            </p>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-sora font-semibold text-text-primary">Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="group glass rounded-lg p-4 hover:glass-heavy hover:border-accent-blue/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan group-hover:bg-accent-blue transition-colors duration-500" />
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-500">
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-sora font-semibold text-text-primary">Domain Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {domains.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                  className="group glass rounded-xl p-6 hover:glass-heavy hover:border-accent-cyan/30 transition-all duration-500 soft-shadow hover:glow-cyan preserve-3d"
                >
                  <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gradient transition-all duration-500">
                    {domain.name}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {domain.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
