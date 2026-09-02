import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export const Portfolio = ({ profile, projects, skills, experiences, dbStatus, loadData }) => {
  return (
    <>
      <Navbar dbStatus={dbStatus} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact profile={profile} onMessageSent={loadData} />
      </main>
      <Footer profile={profile} dbStatus={dbStatus} />
    </>
  );
};

export default Portfolio;
