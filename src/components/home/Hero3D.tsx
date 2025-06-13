'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import resumeData from '@/lib/data/resumeData';
import { initParticleSystem } from '@/lib/utils/three';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  // 初始化Three.js场景
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    // 创建粒子系统
    const particles = initParticleSystem(2000);
    scene.add(particles);
    particlesRef.current = particles;
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加点光源
    const pointLight = new THREE.PointLight(0x4f9cff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // 处理窗口大小变化
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // 鼠标移动效果
    const handleMouseMove = (event: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(particlesRef.current.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 2,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // 清理Three.js资源
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (particlesRef.current) {
        if (particlesRef.current.geometry) {
          particlesRef.current.geometry.dispose();
        }
        if (particlesRef.current.material) {
          if (Array.isArray(particlesRef.current.material)) {
            particlesRef.current.material.forEach(material => material.dispose());
          } else {
            particlesRef.current.material.dispose();
          }
        }
        scene.remove(particlesRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-gray-950"
    >
      {/* 3D背景 */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* 内容层 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {resumeData.name}
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {resumeData.title}
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {resumeData.summary}
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              查看项目
            </a>
            <a 
              href="#skills" 
              className="px-6 py-3 bg-transparent border border-blue-500 hover:bg-blue-900/20 text-blue-400 rounded-lg transition-colors duration-300"
            >
              技能评估
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* 滚动指示器 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ 
              y: [0, 8, 0],
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}