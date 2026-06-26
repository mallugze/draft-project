import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 lg:py-0 overflow-hidden dots-bg">
      {/* Main Grid Content (Mobile friendly, centered 50/50 split) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Side: Details */}
        <div className="flex flex-col justify-center text-left w-full">
          {/* Huge Name: MALLIKARJUN */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 w-full"
          >
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-550 uppercase break-words leading-none">
              MALLIKARJUN
            </h1>
          </motion.div>

          {/* Tag / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neonPurple animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-gray-300">AI & ML Engineer</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none mb-4"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Intelligent</span> Systems
          </motion.h1>

          {/* Updated Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8"
          >
            I am an AI & Machine Learning undergraduate passionate about building intelligent and scalable software solutions. My interests include Machine Learning, Large Language Models, backend development, and data-driven applications. I enjoy transforming complex problems into practical AI solutions through hands-on projects and continuously expanding my technical expertise.
          </motion.p>

          {/* Button Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-neonBlue to-neonPurple hover:brightness-110 shadow-neonBlue transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/resume.pdf"
              download="Mallikarjun_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-neonPurple" />
              Download Resume
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-5 mt-8 text-gray-455"
          >
            <a href="https://github.com/mallugze" target="_blank" rel="noopener noreferrer" className="hover:text-neonBlue transition-colors" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mallikarjun-842509326" target="_blank" rel="noopener noreferrer" className="hover:text-neonPurple transition-colors" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:mallikarjunpx@gmail.com" className="hover:text-neonPink transition-colors" title="Email">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Glassmorphism Visual Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center w-full max-w-md lg:max-w-none mx-auto"
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[5/6] rounded-2xl overflow-hidden glass p-3 border border-white/10 shadow-2xl flex items-center justify-center">
            {/* Ambient Background glows */}
            <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-neonPurple/20 blur-3xl filter animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-neonBlue/20 blur-3xl filter animate-pulse" />

            {/* The Image itself */}
            <img
              src="/hero_ai_graphic.png"
              alt="AI Circuit Graphic"
              className="w-full h-full object-cover rounded-xl filter brightness-95 contrast-105 border border-white/5"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none opacity-45">
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Scroll Down</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
