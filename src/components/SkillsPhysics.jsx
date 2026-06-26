import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, useSphere, useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { RefreshCw, HelpCircle } from 'lucide-react';

const SKILLS_DATA = [
  { name: 'Python', color: '#38bdf8' },
  { name: 'Scikit-learn', color: '#fb923c' },
  { name: 'TensorFlow', color: '#f97316' },
  { name: 'FastAPI', color: '#0d9488' },
  { name: 'React', color: '#06b6d4' },
  { name: 'Node.js', color: '#22c55e' },
  { name: 'Docker', color: '#3b82f6' },
  { name: 'Kafka', color: '#a855f7' },
  { name: 'ELK Stack', color: '#10b981' },
  { name: 'SQL', color: '#ec4899' },
];

// Individual Physics Sphere Skill
function SkillSphere({ name, color, index, resetTrigger }) {
  const { viewport } = useThree();
  const isDragging = useRef(false);
  const dragPlaneZ = 0;

  // Set up sphere body
  const [ref, api] = useSphere(() => ({
    mass: 1,
    // Spawn spheres in a column with random offsets
    position: [
      (Math.random() - 0.5) * 4,
      3 + index * 1.2,
      (Math.random() - 0.5) * 0.5
    ],
    args: [0.75], // radius
    restitution: 0.65, // high bounciness
    friction: 0.15,
    linearDamping: 0.2,
    angularDamping: 0.2,
  }));

  // Reset positions if resetTrigger changes
  useEffect(() => {
    api.position.set(
      (Math.random() - 0.5) * 4,
      3 + index * 1.2,
      (Math.random() - 0.5) * 0.5
    );
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
  }, [resetTrigger, api, index]);

  // Click to apply impulse
  const handleClick = (e) => {
    e.stopPropagation();
    api.velocity.set(0, 0, 0);
    // Apply a random upward force
    api.applyImpulse([
      (Math.random() - 0.5) * 5,
      8 + Math.random() * 3,
      (Math.random() - 0.5) * 3
    ], [0, 0, 0]);
  };

  // Drag handlers
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    isDragging.current = true;
    api.velocity.set(0, 0, 0);
    api.mass.set(0); // set mass to 0 during drag (kinematic behavior)
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    e.stopPropagation();

    // Map screen mouse percentage coordinates to 3D canvas coordinates
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Projected coordinate scale factors
    const targetX = x * (viewport.width / 2) * 1.5;
    const targetY = y * (viewport.height / 2) * 1.5;

    // Bounded coordinates mapping the container
    const clampedX = Math.max(-3.5, Math.min(3.5, targetX));
    const clampedY = Math.max(-2.5, Math.min(4.5, targetY));

    api.position.set(clampedX, clampedY, dragPlaneZ);
    api.velocity.set(0, 0, 0);
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    api.mass.set(1); // restore dynamic mass

    // Toss it into a direction
    api.velocity.set(
      (Math.random() - 0.5) * 6,
      Math.random() * 3,
      (Math.random() - 0.5) * 4
    );
  };

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.75, 24, 24]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        transmission={0.4} // Glassmorphism glow
        thickness={1.2}
        ior={1.4}
        envMapIntensity={1}
      />
      {/* Three Drei HTML element for CSS label overlay */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none"
      >
        <div className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white whitespace-nowrap border border-white/20 shadow-lg flex items-center gap-1.5 select-none" style={{ background: 'rgba(10, 10, 10, 0.85)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          {name}
        </div>
      </Html>
    </mesh>
  );
}

// Bounding Wall Box Colliders
function BoundingWall({ position, args }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args,
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

// Outline Box container representation
function ContainerOutline() {
  return (
    <mesh position={[0, 0.7, 0]}>
      <boxGeometry args={[8, 6.2, 2.2]} />
      <meshBasicMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

export default function SkillsPhysics() {
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-[#0d0d0d] dots-bg border-t border-b border-white/5">
      {/* Title */}
      <div className="w-full max-w-5xl text-center mb-10">
        <span className="text-xs font-mono tracking-widest text-neonPurple uppercase">// Stack Collisions</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mt-2 mb-4">
          Tech Stack
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Drag and throw or click these 3D skill elements to watch them bounce, slide, and react using real physics.
        </p>
      </div>

      {/* Physics Container Canvas */}
      <div className="relative w-full max-w-3xl h-[450px] sm:h-[550px] border border-white/10 rounded-2xl bg-white/[0.02] shadow-2xl overflow-hidden">
        {/* Absolute indicators */}
        <div className="absolute top-4 left-4 z-10 flex gap-2 items-center text-xs text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 font-mono select-none">
          <HelpCircle className="w-4 h-4 text-neonBlue" />
          <span>Click to launch | Drag to toss</span>
        </div>

        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/40 border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all select-none"
          title="Reset Physics"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* 3D R3F Viewport */}
        <Canvas
          shadows
          camera={{ position: [0, 0, 8.5], fov: 50 }}
          className="w-full h-full"
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, 10, -5]} intensity={0.5} />
          <spotLight
            position={[0, 8, 2]}
            intensity={1.5}
            angle={0.6}
            penumbra={1}
            castShadow
          />

          <Physics gravity={[0, -9.81, 0]}>
            {/* Transparent Box Bounding Colliders */}
            {/* Bottom floor */}
            <BoundingWall position={[0, -2.4, 0]} args={[10, 0.2, 5]} />
            {/* Top ceiling */}
            <BoundingWall position={[0, 3.8, 0]} args={[10, 0.2, 5]} />
            {/* Left wall */}
            <BoundingWall position={[-4.1, 0.7, 0]} args={[0.2, 7, 5]} />
            {/* Right wall */}
            <BoundingWall position={[4.1, 0.7, 0]} args={[0.2, 7, 5]} />
            {/* Front shield (prevents popping forward) */}
            <BoundingWall position={[0, 0.7, 1.25]} args={[10, 7, 0.2]} />
            {/* Back shield (prevents falling backward) */}
            <BoundingWall position={[0, 0.7, -1.25]} args={[10, 7, 0.2]} />

            {/* Wireframe box helper */}
            <ContainerOutline />

            {/* Render 10 custom spheres */}
            {SKILLS_DATA.map((skill, index) => (
              <SkillSphere
                key={`${skill.name}-${resetTrigger}`}
                name={skill.name}
                color={skill.color}
                index={index}
                resetTrigger={resetTrigger}
              />
            ))}
          </Physics>
        </Canvas>
      </div>
    </section>
  );
}
