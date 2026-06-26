import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, PenTool, User, Coffee, Lightbulb, 
  Code, Terminal, Database, Cpu, Settings, 
  Folder, Globe, Smartphone, Monitor, Rocket, 
  Mail, Send, Phone, MessageSquare 
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'about', label: 'About', icons: [FileText, PenTool, User, Coffee, Lightbulb] },
  { id: 'skills', label: 'Skills', icons: [Code, Terminal, Database, Cpu, Settings] },
  { id: 'projects', label: 'Projects', icons: [Folder, Globe, Smartphone, Monitor, Rocket] },
  { id: 'contact', label: 'Contact', icons: [Mail, Send, Phone, MessageSquare] }
];

// WhatsApp-style falling icons renderer inside the active state background
function ActiveBackgroundHighlight({ sectionId, icons }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 6 random drifting icons
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: `${sectionId}-p-${i}`,
      x: Math.random() * 80 + 10, // 10% to 90% boundary range
      delay: Math.random() * 2.5,  // delay to stagger entry
      duration: 2.5 + Math.random() * 2, // fall speed
      size: 10 + Math.random() * 8, // scale size (10px to 18px)
      Icon: icons[i % icons.length]
    }));
    setParticles(newParticles);
  }, [sectionId, icons]);

  return (
    <motion.div
      layoutId="activeNavBg"
      className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm rounded-lg overflow-hidden pointer-events-none -z-10"
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      {/* Falling particles viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
        {particles.map((p) => {
          const IconComp = p.Icon;
          return (
            <div
              key={p.id}
              className="absolute text-purple-300/20 animate-fall pointer-events-none"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}px`,
                top: '-24px',
              }}
            >
              <IconComp style={{ width: p.size, height: p.size }} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies the active middle portion
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 select-none">
      {/* Top Left Text Logo */}
      <a href="#about" className="font-display font-black text-sm md:text-base text-white tracking-[0.25em] uppercase hover:text-neonPurple transition-colors">
        PORTFOLIO
      </a>

      {/* Nav Link Container */}
      <div className="flex gap-2 sm:gap-4 items-center relative">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-4 py-2 font-mono text-xs md:text-sm uppercase tracking-wider font-semibold transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
              
              {isActive && (
                <ActiveBackgroundHighlight
                  sectionId={item.id}
                  icons={item.icons}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
