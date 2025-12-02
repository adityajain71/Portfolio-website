'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string | null;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  demo,
  index,
}: ProjectCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // Calculate 3D rotation based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -8 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 8 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="relative bg-[#1A1C22] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(124, 147, 246, 0.2), 0 10px 30px rgba(104, 217, 200, 0.15)'
              : 'none',
          }}
        />

        {/* Image Container with Parallax */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#7C93F6]/10 to-[#68D9C8]/10">
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="w-full h-full"
          >
            {/* Placeholder gradient for projects without images */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C93F6]/20 via-[#68D9C8]/20 to-transparent" />
            
            {/* Animated grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(124,147,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,147,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Project number */}
            <div className="absolute top-6 left-6 z-10">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="font-mono text-6xl font-bold text-white/5"
              >
                0{index + 1}
              </motion.span>
            </div>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C22] via-[#1A1C22]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-8 space-y-6" style={{ transform: 'translateZ(20px)' }}>
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
            className="text-2xl font-semibold text-[#EAEAEA] font-sora"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
            className="text-[#9A9FA6] leading-relaxed text-sm"
          >
            {description}
          </motion.p>

          {/* Tech Stack Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.15 + tagIndex * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7C93F6]/30 rounded-lg text-xs font-mono text-[#9A9FA6] hover:text-[#7C93F6] transition-all duration-300 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 + index * 0.15, duration: 0.6 }}
            className="flex gap-4 pt-4"
          >
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="group/link flex items-center gap-2 text-sm text-[#9A9FA6] hover:text-[#7C93F6] transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">View Code</span>
              <svg
                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.a>

            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group/link flex items-center gap-2 text-sm text-[#9A9FA6] hover:text-[#68D9C8] transition-colors duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="font-medium">Live Demo</span>
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Subtle corner accent - only visible on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 0.1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C93F6] to-transparent rounded-bl-full pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
