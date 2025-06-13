export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'design' | 'other';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
}

const resumeData: ResumeData = {
  name: "张三",
  title: "全栈开发工程师",
  summary: "富有创造力的全栈开发者，专注于构建高性能、用户友好的Web应用。拥有5年开发经验，精通前端技术栈和后端架构设计。",
  email: "zhangsan@example.com",
  phone: "+86 123 4567 8901",
  location: "上海，中国",
  website: "https://zhangsan.dev",
  github: "https://github.com/zhangsan",
  linkedin: "https://linkedin.com/in/zhangsan",
  skills: [
    { name: "React", level: 90, category: "frontend" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "TypeScript", level: 88, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "GraphQL", level: 75, category: "backend" },
    { name: "Three.js", level: 70, category: "frontend" },
    { name: "GSAP", level: 80, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "UI/UX Design", level: 75, category: "design" },
    { name: "Docker", level: 65, category: "backend" },
    { name: "AWS", level: 60, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
  ],
  projects: [
    {
      id: "project-1",
      title: "智能电商平台",
      description: "基于AI推荐的电子商务平台，提供个性化购物体验",
      longDescription: "这是一个结合了AI推荐算法的电子商务平台，能够根据用户的浏览和购买历史提供高度个性化的商品推荐。该项目采用了微服务架构，前端使用React和Next.js构建，后端采用Node.js和GraphQL API，数据存储在MongoDB中。系统还集成了实时库存管理、支付处理和用户行为分析功能。",
      thumbnail: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=电商平台",
      images: [
        "https://placehold.co/800x600/2563eb/FFFFFF/png?text=电商平台截图1",
        "https://placehold.co/800x600/2563eb/FFFFFF/png?text=电商平台截图2",
        "https://placehold.co/800x600/2563eb/FFFFFF/png?text=电商平台截图3"
      ],
      technologies: ["React", "Next.js", "Node.js", "GraphQL", "MongoDB", "Tailwind CSS", "Redux"],
      demoUrl: "https://ecommerce-demo.zhangsan.dev",
      githubUrl: "https://github.com/zhangsan/ecommerce-platform",
      featured: true,
      date: "2023-05"
    },
    {
      id: "project-2",
      title: "3D产品可视化工具",
      description: "基于Three.js的交互式3D产品展示平台",
      longDescription: "这个项目是一个交互式3D产品可视化工具，允许用户从各个角度查看产品，更改颜色和材质，并在虚拟环境中体验产品。该工具使用Three.js构建，结合了自定义着色器和后期处理效果，以实现照片级渲染质量。用户界面采用React和Framer Motion构建，提供流畅的动画和过渡效果。",
      thumbnail: "https://placehold.co/600x400/8b5cf6/FFFFFF/png?text=3D可视化",
      images: [
        "https://placehold.co/800x600/8b5cf6/FFFFFF/png?text=3D可视化截图1",
        "https://placehold.co/800x600/8b5cf6/FFFFFF/png?text=3D可视化截图2",
        "https://placehold.co/800x600/8b5cf6/FFFFFF/png?text=3D可视化截图3"
      ],
      technologies: ["Three.js", "React", "WebGL", "GLSL", "Framer Motion", "TypeScript"],
      demoUrl: "https://3d-product.zhangsan.dev",
      githubUrl: "https://github.com/zhangsan/3d-product-visualization",
      featured: true,
      date: "2022-11"
    },
    {
      id: "project-3",
      title: "数据可视化仪表板",
      description: "实时数据分析和可视化平台",
      longDescription: "这是一个高级数据可视化仪表板，用于实时监控和分析业务指标。该平台集成了多种数据源，提供可定制的图表、图形和报告功能。前端使用React和D3.js构建，支持交互式数据探索和钻取分析。后端采用Node.js和WebSocket技术，确保数据的实时更新和推送。",
      thumbnail: "https://placehold.co/600x400/10b981/FFFFFF/png?text=数据仪表板",
      images: [
        "https://placehold.co/800x600/10b981/FFFFFF/png?text=数据仪表板截图1",
        "https://placehold.co/800x600/10b981/FFFFFF/png?text=数据仪表板截图2",
        "https://placehold.co/800x600/10b981/FFFFFF/png?text=数据仪表板截图3"
      ],
      technologies: ["React", "D3.js", "Node.js", "WebSocket", "PostgreSQL", "Redis", "Docker"],
      demoUrl: "https://dashboard.zhangsan.dev",
      githubUrl: "https://github.com/zhangsan/data-visualization-dashboard",
      featured: false,
      date: "2022-06"
    }
  ],
  experiences: [
    {
      company: "科技创新有限公司",
      position: "高级前端开发工程师",
      duration: "2021年6月 - 至今",
      description: "负责公司核心产品的前端架构设计和开发，优化用户体验和性能",
      technologies: ["React", "Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      achievements: [
        "重构前端架构，将页面加载时间减少了60%",
        "实现了组件库系统，提高了开发效率和代码复用率",
        "引入自动化测试，将代码覆盖率提高到85%以上"
      ]
    },
    {
      company: "互联网科技有限公司",
      position: "全栈开发工程师",
      duration: "2019年3月 - 2021年5月",
      description: "参与公司多个项目的全栈开发，包括前端UI实现和后端API设计",
      technologies: ["Vue.js", "Node.js", "Express", "MongoDB", "Docker"],
      achievements: [
        "开发了公司内部使用的项目管理系统，提高了团队协作效率30%",
        "优化了数据库查询，将API响应时间减少了40%",
        "实现了CI/CD流程，缩短了产品发布周期"
      ]
    }
  ],
  education: [
    {
      institution: "上海交通大学",
      degree: "硕士",
      field: "计算机科学与技术",
      duration: "2016年9月 - 2019年6月"
    },
    {
      institution: "北京大学",
      degree: "学士",
      field: "软件工程",
      duration: "2012年9月 - 2016年6月"
    }
  ]
};

export default resumeData; 