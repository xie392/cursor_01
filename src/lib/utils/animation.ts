import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 确保在客户端环境中注册插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 创建淡入动画
 * @param element 目标元素
 * @param options 配置选项
 */
export function fadeIn(
  element: HTMLElement | string,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    onComplete?: () => void;
  } = {}
): gsap.core.Tween {
  const {
    delay = 0,
    duration = 0.8,
    y = 20,
    onComplete
  } = options;
  
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      onComplete
    }
  );
}

/**
 * 创建淡出动画
 * @param element 目标元素
 * @param options 配置选项
 */
export function fadeOut(
  element: HTMLElement | string,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    onComplete?: () => void;
  } = {}
): gsap.core.Tween {
  const {
    delay = 0,
    duration = 0.8,
    y = 0,
    onComplete
  } = options;
  
  return gsap.to(
    element,
    {
      opacity: 0,
      y,
      duration,
      delay,
      ease: 'power2.in',
      onComplete
    }
  );
}

/**
 * 创建滚动触发动画
 * @param element 目标元素
 * @param animation 动画函数
 * @param options 配置选项
 */
export function createScrollTrigger(
  element: HTMLElement | string,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    toggleActions?: string;
    pin?: boolean;
    markers?: boolean;
  } = {}
): ScrollTrigger {
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    toggleActions = 'play none none reverse',
    pin = false,
    markers = false
  } = options;
  
  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    scrub,
    toggleActions,
    pin,
    markers,
    animation
  });
}

/**
 * 创建打字机效果
 * @param element 目标元素
 * @param text 要显示的文本
 * @param options 配置选项
 */
export function typewriterEffect(
  element: HTMLElement,
  text: string,
  options: {
    delay?: number;
    speed?: number;
    onComplete?: () => void;
  } = {}
): void {
  const {
    delay = 0,
    speed = 50,
    onComplete
  } = options;
  
  let index = 0;
  element.textContent = '';
  
  setTimeout(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
  }, delay);
}

/**
 * 创建视差滚动效果
 * @param elements 目标元素数组
 * @param options 配置选项
 */
export function createParallaxEffect(
  elements: HTMLElement[] | string[],
  options: {
    speed?: number[];
    start?: string;
    end?: string;
  } = {}
): void {
  const {
    speed = elements.map(() => 0.5),
    start = 'top bottom',
    end = 'bottom top'
  } = options;
  
  elements.forEach((element, index) => {
    gsap.to(element, {
      y: `${speed[index] * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true
      }
    });
  });
}

/**
 * 创建元素序列动画
 * @param elements 目标元素数组
 * @param animation 动画配置
 * @param options 配置选项
 */
export function createStaggerAnimation(
  elements: HTMLElement[] | string[],
  animation: gsap.TweenVars,
  options: {
    stagger?: number;
    delay?: number;
    scrollTrigger?: boolean;
  } = {}
): gsap.core.Timeline {
  const {
    stagger = 0.1,
    delay = 0,
    scrollTrigger = false
  } = options;
  
  const timeline = gsap.timeline({
    delay
  });
  
  timeline.to(elements, {
    ...animation,
    stagger
  });
  
  if (scrollTrigger && elements.length > 0) {
    const trigger = typeof elements[0] === 'string' ? document.querySelector(elements[0]) : elements[0];
    
    if (trigger) {
      ScrollTrigger.create({
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        animation: timeline
      });
    }
  }
  
  return timeline;
} 