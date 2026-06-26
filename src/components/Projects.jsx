import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Shield, Cpu, Activity } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Myra Real-Time Conversational System',
    description: 'An advanced real-time conversational AI system with ultra-low latency. Built using an asynchronous ASGI architecture for concurrent speech-to-text, LLM generation, and text-to-speech pipelines.',
    tags: ['FastAPI', 'LLMs', 'STT/TTS', 'ASGI'],
    icon: Cpu,
    color: 'border-l-4 border-l-neonBlue',
    shadowGlow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
  },
  {
    id: 2,
    title: 'Distributed SIEM Pipeline',
    description: 'High-throughput security information and event management pipeline. Leverages Kafka message broker for log streaming and log aggregation indexed into Elasticsearch for real-time threat monitoring.',
    tags: ['ELK Stack', 'Kafka', 'Docker', 'SIEM'],
    icon: Shield,
    color: 'border-l-4 border-l-neonPurple',
    shadowGlow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]',
  },
  {
    id: 3,
    title: 'AeroCore Telemetry System',
    description: 'A predictive maintenance dashboard that processes real-time telemetry. Uses custom Machine Learning classifiers to predict remaining useful life (RUL) of aircraft components.',
    tags: ['Django', 'ML', 'Predictive RUL', 'Pandas'],
    icon: Activity,
    color: 'border-l-4 border-l-neonPink',
    shadowGlow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]',
  },
  {
    id: 4,
    title: 'Time Series Forecasting Pipeline',
    description: 'Scalable demand prediction engine designed for high-cardinality retail metrics. Incorporates XGBoost gradient boosting and optimized feature engineering to model future demand cycles.',
    tags: ['XGBoost', 'Pandas', 'Demand Prediction', 'Forecasting'],
    icon: Terminal,
    color: 'border-l-4 border-l-neonBlue',
    shadowGlow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 bg-[#0a0a0a] dots-bg">
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-neonBlue uppercase">// Crafted Works</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-2 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full" />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: project.id * 0.05 }}
                className={`glass flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/5 bg-[#121212]/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/10 ${project.color} ${project.shadowGlow}`}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <Icon className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex gap-3 text-gray-500">
                      <a href="#" className="hover:text-neonBlue transition-colors" title="GitHub Code">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href="#" className="hover:text-neonPurple transition-colors" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium text-gray-300 bg-white/5 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
