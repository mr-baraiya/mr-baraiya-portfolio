import React from 'react';
import About from '../components/About';

export const AboutPage = ({ profile }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <About profile={profile} />
    </div>
  );
};

export default AboutPage;
