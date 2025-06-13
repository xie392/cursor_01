'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import resumeData from '@/lib/data/resumeData';
import { generateRecommendation, detectDeviceType } from '@/lib/utils/helpers';

type VisitorType = 'recruiter' | 'peer' | 'client' | 'unknown';

export default function RecommendationModule() {
  const [visitorType, setVisitorType] = useState<VisitorType>('unknown');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [deviceType, setDeviceType] = useState('');
  
  // 根据访问者类型生成推荐内容
  useEffect(() => {
    const recommendations = generateRecommendation(visitorType);
    setRecommendations(recommendations);
    
    // 检测设备类型
    setDeviceType(detectDeviceType());
  }, [visitorType]);
  
  // 模拟访问者类型检测
  const detectVisitorType = (type: VisitorType) => {
    setVisitorType(type);
  };
  
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
          智能推荐
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {/* 访问者类型选择 */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">您是？</h3>
            <p className="text-gray-300 mb-6">
              请选择您的身份，我们将为您提供个性化的内容推荐
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => detectVisitorType('recruiter')}
                className={`p-4 rounded-lg transition-colors ${
                  visitorType === 'recruiter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                招聘者
              </button>
              <button
                onClick={() => detectVisitorType('peer')}
                className={`p-4 rounded-lg transition-colors ${
                  visitorType === 'peer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                同行开发者
              </button>
              <button
                onClick={() => detectVisitorType('client')}
                className={`p-4 rounded-lg transition-colors ${
                  visitorType === 'client'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                潜在客户
              </button>
              <button
                onClick={() => detectVisitorType('unknown')}
                className={`p-4 rounded-lg transition-colors ${
                  visitorType === 'unknown'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                其他访客
              </button>
            </div>
          </div>
          
          {/* 推荐内容 */}
          <motion.div 
            className="bg-gray-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">为您推荐</h3>
                <span className="bg-blue-600 text-xs text-white px-2 py-1 rounded">
                  {visitorType === 'recruiter' ? '招聘者' : 
                   visitorType === 'peer' ? '同行开发者' : 
                   visitorType === 'client' ? '潜在客户' : '访客'}
                </span>
              </div>
              <p className="text-gray-400 mt-2">
                基于您的身份，我们为您推荐以下内容
              </p>
            </div>
            
            <div className="divide-y divide-gray-700">
              {recommendations.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 hover:bg-gray-700 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item}</h4>
                      {visitorType === 'recruiter' && index === 0 && (
                        <p className="text-gray-400 text-sm mt-1">
                          查看我的项目案例，了解我的技术能力和解决问题的方法
                        </p>
                      )}
                      {visitorType === 'peer' && index === 0 && (
                        <p className="text-gray-400 text-sm mt-1">
                          了解我的技术栈和编码风格，或许我们可以一起合作
                        </p>
                      )}
                      {visitorType === 'client' && index === 0 && (
                        <p className="text-gray-400 text-sm mt-1">
                          了解我能为您提供的服务和过往成功案例
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 设备检测信息 */}
          <motion.div
            className="mt-8 bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">您的设备信息</h3>
            <div className="flex items-center">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {deviceType === 'mobile' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  ) : deviceType === 'tablet' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  )}
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">
                  您正在使用 {deviceType === 'mobile' ? '手机' : deviceType === 'tablet' ? '平板' : '桌面设备'} 浏览本网站
                </p>
                <p className="text-gray-400 text-sm">
                  我们已根据您的设备类型优化了页面显示
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* 联系信息 */}
          <motion.div
            className="mt-8 bg-blue-900/30 border border-blue-800 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">想了解更多？</h3>
            <p className="text-gray-300 mb-6">
              如果您对我的项目或技能感兴趣，欢迎随时联系我
            </p>
            <a
              href={`mailto:${resumeData.email}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block transition-colors"
            >
              联系我
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 