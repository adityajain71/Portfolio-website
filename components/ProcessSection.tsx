'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    number: '01',
    title: 'Research & Discovery',
    description: 'Deep dive into problem space, data exploration, and feasibility analysis.',
  },
  {
    number: '02',
    title: 'Architecture Design',
    description: 'Design scalable ML architecture with optimal model selection and infrastructure planning.',
  },
  {
    number: '03',
    title: 'Development & Training',
    description: 'Implement models, train with optimized hyperparameters, and iterate based on metrics.',
  },
  {
    number: '04',
    title: 'Evaluation & Testing',
    description: 'Rigorous testing across edge cases, performance benchmarking, and validation.',
  },
  {
    number: '05',
    title: 'Deployment & Monitoring',
    description: 'Production deployment with CI/CD pipelines, monitoring, and continuous improvement.',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
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
              Process
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="h-px bg-gradient-to-r from-accent-cyan to-transparent" 
            />
          </div>

          {/* Process Steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="group relative"
              >
                <div className="flex gap-6 md:gap-8 items-start">
                  {/* Step Number */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.2 + index * 0.1,
                        type: 'spring',
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="font-mono text-5xl md:text-6xl font-bold text-gradient opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    >
                      {step.number}
                    </motion.div>
                    
                    {/* Connecting line */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-1/2 top-full h-8 w-px bg-gradient-to-b from-accent-blue/30 to-transparent" />
                    )}
                  </div>

                  {/* Step Content */}
                  <motion.div 
                    whileHover={{ 
                      x: 10,
                      scale: 1.02,
                      rotateY: 3,
                      transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                    }}
                    className="flex-1 glass rounded-xl p-6 hover:glass-heavy hover:border-accent-blue/30 transition-all duration-500 soft-shadow hover:atmospheric-shadow preserve-3d"
                  >
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-text-primary mb-3 group-hover:text-gradient transition-all duration-500">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${((index + 1) / processSteps.length) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 + index * 0.15, ease: [0.19, 1, 0.22, 1] }}
                      className="h-px bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue mt-4"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
