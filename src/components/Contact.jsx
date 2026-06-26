import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      // Reset success message after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-[#0d0d0d] dots-bg border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-neonPurple/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-neonBlue/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl mx-auto text-center z-10">
        {/* Section Header */}
        <span className="text-xs font-mono tracking-widest text-neonPink uppercase">// Let's Connect</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-2 mb-4">
          Contact Me
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-md mx-auto">
          Have an exciting project, opening, or question? Send me a message and I'll get back to you as soon as possible.
        </p>

        {/* Contact Card & Form */}
        <div className="glass p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#121212]/40 backdrop-blur-md relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 text-left"
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-mono tracking-wider text-gray-400 uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neonBlue transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono tracking-wider text-gray-400 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neonBlue transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono tracking-wider text-gray-400 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neonBlue transition-colors resize-none"
                    placeholder="Type your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-neonBlue to-neonPurple hover:brightness-110 shadow-neonBlue transition-all select-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10"
              >
                <div className="p-4 rounded-full bg-neonPurple/10 border border-neonPurple/30 mb-6">
                  <CheckCircle className="w-12 h-12 text-neonPurple" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-sm text-center max-w-xs">
                  Thank you for reaching out. I will respond to your message shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer & Social Directories */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Mallikarjun. All rights reserved.
          </span>
          <div className="flex gap-6 text-gray-400">
            <a href="https://github.com/mallugze" target="_blank" rel="noopener noreferrer" className="hover:text-neonBlue transition-colors flex items-center gap-1.5 text-xs font-mono">
              <Github className="w-4 h-4" /> Github
            </a>
            <a href="https://www.linkedin.com/in/mallikarjun-842509326" target="_blank" rel="noopener noreferrer" className="hover:text-neonPurple transition-colors flex items-center gap-1.5 text-xs font-mono">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:mallikarjunpx@gmail.com" className="hover:text-neonPink transition-colors flex items-center gap-1.5 text-xs font-mono">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
