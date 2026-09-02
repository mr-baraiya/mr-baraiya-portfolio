import React from 'react';
import Contact from '../components/Contact';

export const ContactPage = ({ profile, loadData }) => {
  return (
    <div className="pt-16 min-h-screen bg-[#050508] text-[#F8FAFC]">
      <Contact profile={profile} onMessageSent={loadData} />
    </div>
  );
};

export default ContactPage;
