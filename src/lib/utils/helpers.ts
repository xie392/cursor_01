/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param limit 时间限制（毫秒）
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * 格式化日期
 * @param dateString 日期字符串（YYYY-MM格式）
 * @param format 输出格式
 */
export function formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  
  if (format === 'long') {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  } else {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' });
  }
}

/**
 * 根据访问者类型生成推荐内容
 * @param visitorType 访问者类型
 */
export function generateRecommendation(visitorType: 'recruiter' | 'peer' | 'client' | 'unknown'): string[] {
  switch (visitorType) {
    case 'recruiter':
      return [
        '查看我的项目案例展示',
        '了解我的职业经历和技能',
        '下载我的完整简历'
      ];
    case 'peer':
      return [
        '查看我的技术博客',
        '探索我使用的开发工具和技术栈',
        '了解我的开源贡献'
      ];
    case 'client':
      return [
        '查看我的服务内容',
        '了解我的成功案例',
        '联系我讨论您的项目需求'
      ];
    default:
      return [
        '浏览我的项目作品集',
        '了解我的专业技能',
        '查看我的联系方式'
      ];
  }
}

/**
 * 检测设备类型
 */
export function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * 检测浏览器是否支持WebGL
 */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * 懒加载图片
 * @param src 图片源URL
 */
export function lazyLoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

/**
 * 随机生成ID
 * @param length ID长度
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
} 