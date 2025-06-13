'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import ProjectDetail from '@/components/projects/ProjectDetail';
import resumeData, { Project } from '@/lib/data/resumeData';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      const foundProject = resumeData.projects.find(p => p.id === params.id);
      setProject(foundProject || null);
      setLoading(false);
    }, 500);
  }, [params.id]);
  
  // 如果项目不存在，返回404
  if (!loading && !project) {
    notFound();
  }
  
  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : project ? (
        <ProjectDetail project={project} />
      ) : null}
    </Layout>
  );
}