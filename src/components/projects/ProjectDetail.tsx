'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/lib/data/resumeData';
import { formatDate } from '@/lib/utils/helpers';

// 确保在客户端环境中注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 技术栈动画
    if (techStackRef.current) {
      const techItems = techStackRef.current.querySelectorAll('.tech-item');
      
      gsap.fromTo(
        techItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: techStackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // 图片切换动画
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  const [direction, setDirection] = useState(0);
  
  const nextImage = () => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev + 1) % project.images.length);
  };
  
  const prevImage = () => {
    setDirection(-1);
    setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };
  
  return (
    <div className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* 项目标题 */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          className="flex items-center text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="mr-4">{formatDate(project.date, 'long')}</span>
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mr-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              在线演示
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub 仓库
            </a>
          )}
        </motion.div>
        
        {/* 项目图片轮播 */}
        <div className="mb-12 relative">
          <div className="relative h-[400px] md:h-[500px] bg-gray-800 rounded-lg overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div 
                key={activeImageIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={project.images[activeImageIndex]}
                  alt={`${project.title} - 截图 ${activeImageIndex + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* 导航按钮 */}
            {project.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="上一张"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="下一张"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* 图片指示器 */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {project.images.map((_, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeImageIndex ? 1 : -1);
                      setActiveImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeImageIndex ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                    aria-label={`查看图片 ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* 项目描述 */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">项目描述</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className={`text-gray-300 ${!showFullDescription && 'line-clamp-4'}`}>
              {project.longDescription}
            </div>
            {project.longDescription.length > 300 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showFullDescription ? '收起' : '查看更多'}
              </button>
            )}
          </div>
        </motion.div>
        
        {/* 技术栈 */}
        <motion.div 
          ref={techStackRef}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.technologies.map((tech: string, index: number) => (
              <div 
                key={tech}
                className="tech-item bg-gray-800 rounded-lg p-4 flex items-center justify-center text-center"
              >
                <span className="text-blue-400">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* 项目成就 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">主要功能</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>实现了响应式设计，适配各种设备屏幕</li>
              <li>集成了实时数据更新和推送功能</li>
              <li>优化了加载性能，提高了用户体验</li>
              <li>实现了复杂的交互动画效果</li>
              <li>采用了模块化架构，便于维护和扩展</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 