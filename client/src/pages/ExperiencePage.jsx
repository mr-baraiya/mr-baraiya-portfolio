import React from 'react';
import Experience from '../components/Experience';

export const ExperiencePage = ({ experiences }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <Experience experiences={experiences} />
    </div>
  );
};

export default ExperiencePage;
