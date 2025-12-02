'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string | null;
  year: string;
  image?: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Smart Task Evaluator',
    description: 'A SaaS application built with Next.js 14, TypeScript, and Tailwind CSS for intelligent task evaluation and management. Features real-time collaboration, AI-powered insights, and seamless workflow automation.',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'AI/ML'],
    github: 'https://github.com/adityajain71/ai-saas',
    demo: 'https://ai-saas-drab.vercel.app/',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    number: '02',
    title: 'Heart Disease Prediction',
    description: 'ML experiment comparing baseline classification models with improved pipelines using feature scaling and selection. Achieved 94% accuracy through advanced ensemble methods and hyperparameter optimization.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Data Science'],
    github: 'https://github.com/adityajain71/heart-disease-prediction-fs-sc',
    demo: null,
    year: '2024',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    number: '03',
    title: 'Fruitika',
    description: 'Modern, full-stack e-commerce platform for premium fruit exports with 3D graphics and advanced animations. Features real-time inventory, secure payments, and immersive product visualization.',
    tags: ['Next.js 15', 'TypeScript', 'Prisma', 'Three.js'],
    github: 'https://github.com/adityajain71/getfruitika',
    demo: 'https://getfruitika.me/',
    year: '2024',
    image: '/images/fruitika.png',
  },
  {
    number: '04',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with campaign performance insights, user analytics, AI chatbot, and PDF reports. Built for enterprise-scale data visualization and business intelligence.',
    tags: ['Next.js 14', 'Recharts', 'Framer Motion', 'AI Integration'],
    github: 'https://github.com/adityajain71/Ai-Analytics-Dashboard',
    demo: 'https://ai-analytics-dashboard-pi.vercel.app/',
    year: '2024',
    image: '/images/analytics.png',
  },
];

function ProjectCard({ project, index, isHovered, onHover, onLeave }: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const rotateX = (mousePosition.y - 0.5) * 10;
  const rotateY = (mousePosition.x - 0.5) * -10;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isHovered ? 1 : 0.7,
        x: 0,
        scale: isHovered ? 1.15 : 1,
        filter: isHovered ? 'blur(0px)' : 'blur(0px)',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="relative flex-shrink-0 w-[280px] md:w-[360px] h-[420px] md:h-[500px] group cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -inset-4 bg-gradient-to-br from-[#7C93F6]/30 via-[#68D9C8]/20 to-transparent rounded-3xl blur-2xl"
        />
      )}

      {/* Card Container */}
      <div className="relative w-full h-full bg-[#1A1C22] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-[60%] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700"
              style={{
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C22] via-transparent to-transparent" />
            
            {/* Project Number */}
            <div className="absolute top-4 left-4">
              <span className="font-mono text-5xl font-bold text-white/5">
                {project.number}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <motion.div
          className="absolute inset-0 p-5 flex flex-col justify-end"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {/* Always visible title */}
          <h3 className="font-sora text-xl md:text-2xl font-semibold text-[#EAEAEA] mb-2">
            {project.title}
          </h3>

          {/* Hover-revealed content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="overflow-hidden space-y-4"
          >
            <p className="text-[#9A9FA6] text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-[#9A9FA6]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-lg border border-white/20 text-center text-xs font-semibold text-[#EAEAEA] hover:border-[#7C93F6] hover:text-[#7C93F6] transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7C93F6] to-[#68D9C8] text-center text-xs font-semibold text-white hover:shadow-lg hover:shadow-[#7C93F6]/30 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
          >
            <span className="font-mono text-xs text-[#68D9C8] px-3 py-1 bg-white/5 rounded-full backdrop-blur-sm">
              {project.year}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Enable horizontal scroll with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-[#0D0D0F] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#7C93F6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-[#68D9C8]/5 rounded-full blur-[140px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm text-[#7C93F6] uppercase tracking-[0.2em] mb-4"
          >
            Selected Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sora text-4xl md:text-6xl lg:text-7xl font-semibold text-[#EAEAEA] mb-6"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#7C93F6] to-transparent mx-auto"
          />
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="relative overflow-x-auto overflow-y-hidden scrollbar-hide px-6 md:px-12 py-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex gap-6 md:gap-8 pb-8" style={{ width: 'max-content' }}>
            {projects.map((project, index) => (
              <div
                key={project.number}
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-8 px-6"
        >
          <p className="font-mono text-xs text-[#7C93F6]/60 uppercase tracking-wider">
            Scroll horizontally to explore →
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
