'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const techStack = [
  { name: 'Python', category: 'Core Language', usage: 'ML/AI development & data analysis' },
  { name: 'JavaScript/TypeScript', category: 'Web Development', usage: 'Full-stack development' },
  { name: 'React & Next.js', category: 'Frontend', usage: 'Modern web applications' },
  { name: 'Node.js & Express', category: 'Backend', usage: 'Server-side applications & APIs' },
  { name: 'PyTorch', category: 'Deep Learning', usage: 'Neural network training & research' },
  { name: 'TensorFlow', category: 'Deep Learning', usage: 'Production ML models' },
  { name: 'Pandas & NumPy', category: 'Data Analysis', usage: 'Data manipulation & analysis' },
  { name: 'SQL & MongoDB', category: 'Databases', usage: 'Relational & NoSQL databases' },
  { name: 'Power BI & Tableau', category: 'Visualization', usage: 'Data visualization & dashboards' },
  { name: 'Scikit-learn', category: 'Machine Learning', usage: 'Traditional ML algorithms' },
  { name: 'AWS & Azure', category: 'Cloud', usage: 'Cloud infrastructure & ML services' },
  { name: 'Docker & Kubernetes', category: 'DevOps', usage: 'Containerization & orchestration' },
];

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-12"
        >
          {/* Section Title */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold"
            >
              Tech Stack
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="h-px bg-gradient-to-r from-accent-cyan to-transparent" 
            />
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ 
                  scale: 1.05,
                  y: -12,
                  rotateX: 10,
                  rotateY: 10,
                  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                className="group glass rounded-xl p-6 hover:glass-heavy hover:border-accent-blue/40 transition-all duration-500 soft-shadow hover:glow-blue cursor-pointer preserve-3d"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-gradient transition-all duration-500">
                      {tech.name}
                    </h3>
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="font-mono text-xs text-accent-cyan/80 px-2 py-1 rounded glass border border-accent-cyan/20 group-hover:border-accent-cyan/50 transition-all duration-300"
                    >
                      {tech.category}
                    </motion.span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {tech.usage}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="h-px bg-gradient-to-r from-accent-blue to-accent-cyan mt-4"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
