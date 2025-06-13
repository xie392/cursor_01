'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import resumeData, { Project } from '@/lib/data/resumeData';
import { formatDate } from '@/lib/utils/helpers';

// 确保在客户端环境中注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 获取所有时间轴项目
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 为每个项目创建滚动触发动画
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // 为时间轴线条创建动画
    if (timelineRef.current) {
      gsap.fromTo(
        '.timeline-line',
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
          }
        }
      );
    }
    
    return () => {
      // 清理所有滚动触发器
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // 按日期排序项目
  const sortedProjects = [...resumeData.projects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <div className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          项目时间轴
        </motion.h2>
        
        <div ref={timelineRef} className="relative">
          {/* 时间轴中心线 */}
          <div className="timeline-line absolute left-1/2 top-0 w-1 bg-blue-500 h-full transform -translate-x-1/2 z-0"></div>
          
          {/* 项目列表 */}
          <div className="relative z-10">
            {sortedProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`timeline-item flex flex-col md:flex-row items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 时间节点 */}
                <div className="hidden md:block w-1/2"></div>
                
                <div className="timeline-dot w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900 z-20 mx-4 md:mx-0 flex-shrink-0"></div>
                
                {/* 项目卡片 */}
                <div className={`w-full md:w-1/2 bg-gray-800 rounded-lg overflow-hidden shadow-lg ${
                  index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                }`}>
                  {/* 项目缩略图 */}
                  <div className="relative h-48 w-full bg-gray-700">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {formatDate(project.date, 'long')}
                      </span>
                    </div>
                  </div>
                  
                  {/* 项目内容 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    {/* 技术标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* 项目链接 */}
                    <div className="flex space-x-3">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        查看详情
                      </Link>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
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
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 