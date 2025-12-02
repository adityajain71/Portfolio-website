'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface ProjectRevealCardProps {
  project: {
    number: string;
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo?: string | null;
    year: string;
    image?: string;
  };
  index: number;
}

export default function ProjectRevealCard({ project, index }: ProjectRevealCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={isInView ? { clipPath: 'circle(140% at 50% 50%)' } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={
          isHovered
            ? {
                rotateX: (mousePosition.y - 50) * 0.1,
                rotateY: (mousePosition.x - 50) * 0.1,
              }
            : { rotateX: 0, rotateY: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-[#1A1C22] rounded-2xl overflow-hidden border border-white/5"
        style={{
          boxShadow: isHovered
            ? `0 0 30px rgba(120, 230, 255, 0.35), 0 20px 60px rgba(0, 0, 0, 0.5)`
            : '0 10px 40px rgba(0, 0, 0, 0.4)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Cursor-reactive glow */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, rgba(124, 147, 246, 0.15), transparent 60%)`,
            }}
          />
        )}

        {/* Project Image */}
        {project.image && (
          <div className="relative h-[240px] md:h-[320px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C22] via-transparent to-transparent" />
            
            {/* Project Number */}
            <div className="absolute top-4 left-4 z-10">
              <span className="font-mono text-6xl md:text-7xl font-bold text-white/5">
                {project.number}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 space-y-4">
          {/* Title & Year */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-sora text-2xl md:text-3xl font-semibold text-[#EAEAEA]">
              {project.title}
            </h3>
            <span className="font-mono text-sm text-[#7C93F6] opacity-60 whitespace-nowrap">
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#9A9FA6] leading-relaxed text-sm md:text-base">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#EAEAEA] hover:border-[#7C93F6]/40 hover:text-[#7C93F6] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-center font-semibold text-sm text-[#EAEAEA] hover:border-[#7C93F6] hover:bg-[#7C93F6]/10 hover:text-[#7C93F6] transition-all duration-300"
            >
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#7C93F6] to-[#68D9C8] text-center font-semibold text-sm text-white hover:shadow-lg hover:shadow-[#7C93F6]/30 transition-all duration-300"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
