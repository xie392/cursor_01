'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import resumeData from '@/lib/data/resumeData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 导航链接
  const navLinks = [
    { href: '/', label: '首页' },
    { href: '#skills', label: '技能' },
    { href: '#projects', label: '项目' },
    { href: '#recommendations', label: '推荐' }
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            {resumeData.name.split(' ')[0]}
            <span className="text-blue-500">.</span>
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  (pathname === '/' && link.href === '/') || 
                  (pathname !== '/' && link.href !== '/' && pathname.includes(link.href.replace('#', '')))
                    ? 'text-blue-500'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <a
              href={`mailto:${resumeData.email}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              联系我
            </a>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-gray-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="菜单"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && (
          <div className="container mx-auto px-4 py-4 bg-gray-900 shadow-lg">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    (pathname === '/' && link.href === '/') || 
                    (pathname !== '/' && link.href !== '/' && pathname.includes(link.href.replace('#', '')))
                      ? 'text-blue-500'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <a
                href={`mailto:${resumeData.email}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm w-full text-center"
              >
                联系我
              </a>
            </nav>
          </div>
        )}
      </motion.div>
    </header>
  );
} 