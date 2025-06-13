'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '@/components/layout/Layout';
import Hero3D from '@/components/home/Hero3D';
import SkillsRadar from '@/components/skills/SkillsRadar';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import SkillGame from '@/components/skills/SkillGame';
import RecommendationModule from '@/components/recommendation/RecommendationModule';

// 确保在客户端环境中注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // 页面加载时显示骨架屏，然后淡出
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
          loadingScreen.style.display = 'none';
        }
      });
    }
    
    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <>
      {/* 骨架屏加载动画 */}
      <div 
        id="loading-screen" 
        className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center"
      >
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-xl">加载中...</p>
      </div>
      
      <Layout>
        {/* 3D视差首页 */}
        <section id="hero" className="relative">
          <Hero3D />
        </section>
        
        {/* 技能雷达图 */}
        <section id="skills" className="relative">
          <SkillsRadar />
        </section>
        
        {/* 项目时间轴 */}
        <section id="projects" className="relative">
          <ProjectTimeline />
        </section>
        
        {/* 技能评估游戏 */}
        <section id="skill-game" className="relative">
          <SkillGame />
        </section>
        
        {/* 智能推荐模块 */}
        <section id="recommendations" className="relative">
          <RecommendationModule />
        </section>
      </Layout>
    </>
  );
}
