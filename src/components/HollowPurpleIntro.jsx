import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function HollowPurpleIntro({ onComplete }) {
  const blueOrbControls = useAnimation();
  const redOrbControls = useAnimation();
  const titleControls = useAnimation();
  const blastControls = useAnimation();
  const overlayControls = useAnimation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    async function sequence() {
      // 1. Spawn Orbs and Title
      blueOrbControls.set({ x: '-150vw', opacity: 0, scale: 0.5 });
      redOrbControls.set({ x: '150vw', opacity: 0, scale: 0.5 });
      titleControls.set({ y: -50, opacity: 0, scale: 0.9 });
      
      // Animate them to starting positions
      await Promise.all([
        blueOrbControls.start({
          x: '-20vw',
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', damping: 14, stiffness: 50 }
        }),
        redOrbControls.start({
          x: '20vw',
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', damping: 14, stiffness: 50 }
        }),
        titleControls.start({
          y: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: 'easeOut' }
        })
      ]);

      // Float effect for 1.2 seconds to build tension
      blueOrbControls.start({
        y: [0, -12, 0],
        transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      });
      redOrbControls.start({
        y: [0, 12, 0],
        transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      });

      await new Promise(resolve => setTimeout(resolve, 1200));

      // Stop floating
      blueOrbControls.stop();
      redOrbControls.stop();

      // 2. Merge: accelerating towards the center
      await Promise.all([
        blueOrbControls.start({
          x: '0vw',
          y: 0,
          scale: 1.2,
          transition: { duration: 0.7, ease: [0.74, 0.0, 0.19, 1.02] }
        }),
        redOrbControls.start({
          x: '0vw',
          y: 0,
          scale: 1.2,
          transition: { duration: 0.7, ease: [0.74, 0.0, 0.19, 1.02] }
        })
      ]);

      // Hide the incoming orbs and title just as blast expands
      blueOrbControls.start({ opacity: 0, scale: 0, transition: { duration: 0.05 } });
      redOrbControls.start({ opacity: 0, scale: 0, transition: { duration: 0.05 } });
      titleControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.05 } });

      // 3. Blast: Blinding Purple/White flash scaling up to 50
      await blastControls.start({
        scale: [0, 50],
        opacity: [1, 1, 0.9],
        transition: { duration: 1.0, ease: "easeOut" }
      });

      // 4. Fade out entire overlay
      await overlayControls.start({
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      });

      setShow(false);
      if (onComplete) onComplete();
    }

    sequence();
  }, [blueOrbControls, redOrbControls, titleControls, blastControls, overlayControls, onComplete]);

  if (!show) return null;

  return (
    <motion.div
      animate={overlayControls}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden select-none"
    >
      {/* Background subtle neon radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_65%)]" />

      {/* Domain Expansion Text */}
      <motion.div
        animate={titleControls}
        className="absolute top-20 md:top-28 text-center z-10 px-4 select-none pointer-events-none"
      >
        <h1 className="font-display text-white text-3xl md:text-5xl font-black tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          Domain Expansion
        </h1>
      </motion.div>

      {/* Blue Orb (AI) */}
      <motion.div
        animate={blueOrbControls}
        className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center font-display font-bold text-xl md:text-2xl text-blue-100 shadow-[0_0_50px_rgba(59,130,246,0.8),_0_0_20px_rgba(59,130,246,0.4)] border border-blue-400 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-800"
      >
        <span className="relative z-10 select-none tracking-wider">AI</span>
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-md animate-pulse" />
      </motion.div>

      {/* Red Orb (ML) */}
      <motion.div
        animate={redOrbControls}
        className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center font-display font-bold text-xl md:text-2xl text-red-100 shadow-[0_0_50px_rgba(239,68,68,0.8),_0_0_20px_rgba(239,68,68,0.4)] border border-red-400 bg-gradient-to-br from-red-600 via-red-500 to-pink-800"
      >
        <span className="relative z-10 select-none tracking-wider">ML</span>
        <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 blur-md animate-pulse" />
      </motion.div>

      {/* Hollow Purple Blast Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={blastControls}
        className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 via-white to-fuchsia-500 shadow-[0_0_80px_rgba(168,85,247,1)] filter blur-[2px] pointer-events-none"
      />
    </motion.div>
  );
}
