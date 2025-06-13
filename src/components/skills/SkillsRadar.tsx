'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resumeData, { Skill } from '@/lib/data/resumeData';

// 确保在客户端环境中注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SkillsRadar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 按类别分组技能
  const frontendSkills = resumeData.skills.filter(skill => skill.category === 'frontend');
  const backendSkills = resumeData.skills.filter(skill => skill.category === 'backend');
  const designSkills = resumeData.skills.filter(skill => skill.category === 'design');
  const otherSkills = resumeData.skills.filter(skill => skill.category === 'other');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    const setCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // 绘制雷达图
    const drawRadarChart = () => {
      if (!ctx || !canvas) return;
      
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      // 绘制背景圆环
      for (let i = 5; i > 0; i--) {
        const levelRadius = radius * (i / 5);
        ctx.beginPath();
        ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * i})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // 准备绘制技能数据
      const skills = resumeData.skills;
      const angleStep = (Math.PI * 2) / skills.length;
      
      // 绘制轴线
      skills.forEach((_, index) => {
        const angle = index * angleStep;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
      });
      
      // 绘制技能标签
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const labelX = centerX + (radius + 20) * Math.cos(angle);
        const labelY = centerY + (radius + 20) * Math.sin(angle);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, labelX, labelY);
      });
      
      // 绘制技能数据多边形
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const skillRadius = radius * (skill.level / 100);
        
        if (index === 0) {
          ctx.moveTo(
            centerX + skillRadius * Math.cos(angle),
            centerY + skillRadius * Math.sin(angle)
          );
        } else {
          ctx.lineTo(
            centerX + skillRadius * Math.cos(angle),
            centerY + skillRadius * Math.sin(angle)
          );
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(79, 156, 255, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(79, 156, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 绘制数据点
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const skillRadius = radius * (skill.level / 100);
        
        ctx.beginPath();
        ctx.arc(
          centerX + skillRadius * Math.cos(angle),
          centerY + skillRadius * Math.sin(angle),
          4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#4f9cff';
        ctx.fill();
      });
    };
    
    // 设置动画
    let progress = { value: 0 };
    
    const animation = gsap.to(progress, {
      value: 1,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        // 在动画过程中更新雷达图
        drawRadarChart();
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      animation.kill();
    };
  }, []);
  
  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          技能雷达图
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 雷达图 */}
          <motion.div 
            ref={containerRef}
            className="h-[400px] relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </motion.div>
          
          {/* 技能列表 */}
          <div className="space-y-8">
            {/* 前端技能 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">前端开发</h3>
              <div className="space-y-3">
                {frontendSkills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* 后端技能 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">后端开发</h3>
              <div className="space-y-3">
                {backendSkills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* 设计技能 */}
            {designSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">设计技能</h3>
                <div className="space-y-3">
                  {designSkills.map((skill) => (
                    <div key={skill.name} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 