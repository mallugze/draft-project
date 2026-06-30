import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const SKILLS_NODES = [
  { name: 'Python', color: '#38bdf8', x: -2.6, y: 1.8, z: -10 },
  { name: 'Scikit-learn', color: '#fb923c', x: 2.6, y: -1.6, z: -22 },
  { name: 'TensorFlow', color: '#f97316', x: -2.4, y: -2.0, z: -35 },
  { name: 'FastAPI', color: '#0d9488', x: 2.8, y: 1.8, z: -48 },
  { name: 'React', color: '#06b6d4', x: -2.8, y: 1.2, z: -60 },
  { name: 'Node.js', color: '#22c55e', x: 2.6, y: -1.4, z: -72 },
  { name: 'Docker', color: '#3b82f6', x: -2.8, y: -2.2, z: -85 },
  { name: 'Kafka', color: '#a855f7', x: 2.8, y: 2.2, z: -98 },
  { name: 'ELK Stack', color: '#10b981', x: -2.6, y: -1.8, z: -110 },
  { name: 'SQL', color: '#ec4899', x: 2.5, y: 1.5, z: -122 },
];

// Glowing Holographic Skill Node
function SkillNode({ name, color, x, y, z }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.4 * delta;
      meshRef.current.rotation.y += 0.6 * delta;
    }
  });

  // Target wall connection line endpoint
  const wallX = x > 0 ? 5 : -5;

  return (
    <group>
      {/* Laser connection line to side grid wall */}
      <Line
        points={[[x, y, z], [wallX, y, z]]}
        color={color}
        lineWidth={0.8}
        transparent
        opacity={0.25}
      />

      {/* Rotating 3D glowing node shape */}
      <mesh ref={meshRef} position={[x, y, z]}>
        <octahedronGeometry args={[0.38]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Billboarded Skill Title */}
      <Text
        position={[x, y + 0.75, z]}
        fontSize={0.34}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.15} />
      </Text>
    </group>
  );
}

// 5D Tesseract Grid tunnel
function GridTunnel() {
  const count = 16;
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const z = -i * 9;
        const color = i % 2 === 0 ? '#3b82f6' : '#a855f7';
        return (
          <mesh key={i} position={[0, 0, z]}>
            <boxGeometry args={[10, 8.5, 9]} />
            <meshStandardMaterial
              color={color}
              wireframe
              emissive={color}
              emissiveIntensity={1.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// High performance floating dust/particles
function StarParticles() {
  const count = 350;
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28; // y
      pos[i * 3 + 2] = -Math.random() * 160; // z
      sp[i] = 6 + Math.random() * 8; // speed
    }
    return [pos, sp];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    if (!geo || !geo.attributes || !geo.attributes.position) return;
    const array = geo.attributes.position.array;
    if (!array) return;

    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      array[zIdx] += speeds[i] * delta; // move z forward
      
      // Reset far back when it flies behind camera
      if (array[zIdx] > 10) {
        array[zIdx] = -155;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        color="#c084fc"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// Scrollytelling Scene Coordinator
function TesseractScene({ parentContainer }) {
  useFrame((state) => {
    if (!parentContainer.current) return;
    const rect = parentContainer.current.getBoundingClientRect();
    
    // Calculate native scroll percentage of this container
    const total = rect.height - window.innerHeight;
    const current = -rect.top;
    const progress = Math.max(0, Math.min(1, current / total));
    
    // Map progress to camera Z position: start at 5, fly to -135
    const targetZ = 5 - progress * 140;
    
    // Smooth camera Z movement
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
  });

  return (
    <group>
      {/* 5D wireframe tunnel grid */}
      <GridTunnel />

      {/* Holographic skills list */}
      {SKILLS_NODES.map((node, i) => (
        <SkillNode key={i} {...node} />
      ))}

      {/* Falling stars */}
      <StarParticles />

      {/* Emissive postprocessing bloom glow */}
      <EffectComposer>
        <Bloom 
          intensity={1.3} 
          luminanceThreshold={0.12} 
          luminanceSmoothing={0.8} 
          height={300} 
        />
      </EffectComposer>
    </group>
  );
}

export default function SkillsTesseract() {
  const containerRef = useRef();

  return (
    <section ref={containerRef} id="skills" className="relative h-[300vh] bg-[#0a0a0a] overflow-visible">
      {/* Sticky layout container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Floating section descriptors */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none select-none">
          <span className="text-xs font-mono tracking-widest text-neonPurple uppercase">// 5D Space</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">Tech Stack</h2>
          <p className="text-gray-500 text-xs mt-1">Scroll down to traverse the skills dimension</p>
        </div>

        {/* 3D Canvas */}
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }} 
          gl={{ antialias: true }}
          className="w-full h-full"
        >
          <color attach="background" args={['#0a0a0a']} />
          {/* Depth Fog prevents abrupt object popping */}
          <fog attach="fog" args={['#0a0a0a', 15, 55]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1.0} />

          <Suspense fallback={null}>
            <TesseractScene parentContainer={containerRef} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
