import React, { useState } from 'react';
import HollowPurpleIntro from './components/HollowPurpleIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsTesseract from './components/SkillsTesseract';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* Intro sequence Overlay */}
      <HollowPurpleIntro onComplete={() => setIntroFinished(true)} />

      {/* Main Content (only fully visible and active after intro finishes) */}
      <div className={`transition-opacity duration-1000 ease-out ${introFinished ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        {/* Horizontal Top Navigation Bar */}
        <Navbar />

        {/* Page Sections */}
        <main>
          <Hero />
          <SkillsTesseract />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}
