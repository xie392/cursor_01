'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import resumeData from '@/lib/data/resumeData';

export default function SkillGame() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; skill: string; x: number; y: number; scale: number }>>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // 从resumeData中获取技能
  const skills = resumeData.skills.map(skill => skill.name);
  
  // 开始游戏
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setGameCompleted(false);
    setTargets([]);
    
    // 开始计时器
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // 生成目标
    targetIntervalRef.current = setInterval(generateTarget, 1000);
  };
  
  // 结束游戏
  const endGame = () => {
    setGameActive(false);
    setGameCompleted(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (targetIntervalRef.current) {
      clearInterval(targetIntervalRef.current);
      targetIntervalRef.current = null;
    }
  };
  
  // 生成目标
  const generateTarget = () => {
    if (!gameAreaRef.current) return;
    
    const { width, height } = gameAreaRef.current.getBoundingClientRect();
    const randomSkill = skills[Math.floor(Math.random() * skills.length)];
    const x = Math.random() * (width - 100);
    const y = Math.random() * (height - 100);
    const scale = Math.random() * 0.5 + 0.5;
    
    setTargets(prev => [
      ...prev,
      {
        id: Date.now(),
        skill: randomSkill,
        x,
        y,
        scale
      }
    ]);
    
    // 限制目标数量
    if (targets.length > 10) {
      setTargets(prev => prev.slice(1));
    }
  };
  
  // 点击目标
  const hitTarget = (targetId: number, skill: string) => {
    // 检查是否点击了当前活跃技能
    if (skill === activeSkill) {
      setScore(prev => prev + 10);
      
      // 添加动画效果
      const element = document.getElementById(`target-${targetId}`);
      if (element) {
        gsap.to(element, {
          scale: 1.5,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setTargets(prev => prev.filter(target => target.id !== targetId));
          }
        });
      }
    } else {
      // 点错了，减分
      setScore(prev => Math.max(0, prev - 5));
      
      // 添加动画效果
      const element = document.getElementById(`target-${targetId}`);
      if (element) {
        gsap.to(element, {
          x: '+=10',
          yoyo: true,
          repeat: 3,
          duration: 0.1,
          onComplete: () => {
            setTargets(prev => prev.filter(target => target.id !== targetId));
          }
        });
      }
    }
  };
  
  // 随机选择一个活跃技能
  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        setActiveSkill(randomSkill);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [gameActive, skills]);
  
  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (targetIntervalRef.current) clearInterval(targetIntervalRef.current);
    };
  }, []);
  
  return (
    <div className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          技能评估游戏
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-center mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          测试你的反应速度和对我技能的了解程度。点击与当前显示技能相匹配的气泡，每次正确点击得10分，错误点击扣5分。
        </motion.p>
        
        <div className="max-w-4xl mx-auto">
          {/* 游戏控制面板 */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">当前目标技能:</h3>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-xl font-bold">
                {gameActive ? activeSkill || '准备...' : '等待开始'}
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div>
                <h3 className="text-white font-semibold mb-2">分数:</h3>
                <div className="bg-gray-700 text-white px-4 py-2 rounded-md text-xl font-bold">
                  {score}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-2">时间:</h3>
                <div className="bg-gray-700 text-white px-4 py-2 rounded-md text-xl font-bold">
                  {timeLeft}s
                </div>
              </div>
            </div>
            
            <button
              onClick={gameActive ? endGame : startGame}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                gameActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {gameActive ? '结束游戏' : '开始游戏'}
            </button>
          </div>
          
          {/* 游戏区域 */}
          <div 
            ref={gameAreaRef}
            className="relative bg-gray-900 rounded-lg h-[400px] overflow-hidden"
          >
            {!gameActive && !gameCompleted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-xl">点击"开始游戏"按钮开始</p>
              </div>
            )}
            
            {gameCompleted && (
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">游戏结束!</h3>
                <p className="text-xl text-gray-300 mb-6">你的最终得分: <span className="text-blue-500 font-bold">{score}</span></p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  再玩一次
                </button>
              </motion.div>
            )}
            
            {/* 目标 */}
            {targets.map(target => (
              <motion.div
                id={`target-${target.id}`}
                key={target.id}
                className="absolute cursor-pointer select-none"
                style={{
                  left: `${target.x}px`,
                  top: `${target.y}px`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: target.scale }}
                onClick={() => hitTarget(target.id, target.skill)}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xs font-medium ${
                    target.skill === activeSkill
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {target.skill}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 游戏说明 */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">游戏规则</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>点击与当前显示技能相匹配的气泡</li>
              <li>正确点击得10分</li>
              <li>错误点击扣5分</li>
              <li>游戏时间为30秒</li>
              <li>目标技能每3秒更换一次</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 