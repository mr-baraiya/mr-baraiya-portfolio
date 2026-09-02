import React from 'react';
import Skills from '../components/Skills';

export const SkillsPage = ({ skills }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <Skills skills={skills} />
    </div>
  );
};

export default SkillsPage;
