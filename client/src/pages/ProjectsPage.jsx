import React from 'react';
import Projects from '../components/Projects';

export const ProjectsPage = ({ projects }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <Projects projects={projects} />
    </div>
  );
};

export default ProjectsPage;
