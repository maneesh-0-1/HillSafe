'use client';

import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DroneModel } from './DroneModel';
import { CaptureTiles } from './CaptureTiles';
import { PointCloudTerrain } from './PointCloudTerrain';
import { PhysicsNetworkGraph } from './PhysicsNetworkGraph';
import { AnalyticalLayer } from '@/src/lib/types';

interface SceneManagerProps {
  scrollProgress: number; // 0.0 to 1.0
  activeLayer?: AnalyticalLayer;
}

// Cinematographic camera controller responding smoothly to scroll
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 4.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine cinematographic camera positions along the 11 scenes
    if (scrollProgress < 0.12) {
      // Scene 01: Hero 3/4 wide emerging from darkness
      const p = scrollProgress / 0.12;
      targetPos.current.set(0, 0.4 + p * 0.2, 4.2 - p * 0.4);
      targetLookAt.current.set(0, 0, 0);
    } else if (scrollProgress < 0.25) {
      // Scene 02: Close up exploded view
      const p = (scrollProgress - 0.12) / 0.13;
      targetPos.current.set(1.4 * Math.sin(p * 1.2), 0.6 + p * 0.3, 3.2 - p * 0.3);
      targetLookAt.current.set(0, 0.1, 0);
    } else if (scrollProgress < 0.38) {
      // Scene 03: High angle capture down-look
      const p = (scrollProgress - 0.25) / 0.13;
      targetPos.current.set(0.5, 2.8 + p * 0.5, 3.5 - p * 0.5);
      targetLookAt.current.set(0, -0.6, 0);
    } else if (scrollProgress < 0.52) {
      // Scene 04: Map / Point cloud transition
      const p = (scrollProgress - 0.38) / 0.14;
      targetPos.current.set(2.5 * Math.cos(p * 1.5), 1.8 + p * 0.4, 3.2);
      targetLookAt.current.set(0, -0.8, 0);
    } else if (scrollProgress < 0.68) {
      // Scene 05: Terrain intelligence aerial overview
      const p = (scrollProgress - 0.52) / 0.16;
      targetPos.current.set(2.8 * Math.cos(p * 2.0), 2.6 - p * 0.4, 3.0 * Math.sin(p * 2.0));
      targetLookAt.current.set(0, -0.8, 0);
    } else if (scrollProgress < 0.80) {
      // Scene 06: PINN physics network orbital perspective
      const p = (scrollProgress - 0.68) / 0.12;
      targetPos.current.set(0, 1.2 + p * 0.3, 4.0);
      targetLookAt.current.set(0, 0.2, 0);
    } else if (scrollProgress < 0.88) {
      // Scene 07: Field test documentary view
      targetPos.current.set(1.5, 1.8, 3.6);
      targetLookAt.current.set(0, -0.6, 0);
    } else if (scrollProgress < 0.96) {
      // Scene 08 & 09: Applications & Data slider view
      targetPos.current.set(1.8, 1.6, 4.2);
      targetLookAt.current.set(0, -0.4, 0);
    } else if (scrollProgress < 0.98) {
      // Scene 10: Reassembly
      targetPos.current.set(0, 0.6, 3.5);
      targetLookAt.current.set(0, 0.1, 0);
    } else {
      // Scene 11: Final conversion / Ascending horizon
      const p = (scrollProgress - 0.98) / 0.02;
      targetPos.current.set(0, 1.2 + p * 1.5, 4.8 + p * 2.0);
      targetLookAt.current.set(0, 0, -2.0);
    }

    // Smooth lerp camera translation
    camera.position.lerp(targetPos.current, 4.0 * delta);

    // Smooth lerp camera lookAt
    currentLookAt.current.lerp(targetLookAt.current, 4.0 * delta);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-space-950 text-white z-20 pointer-events-none">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-2 border-terrain-green/20 rounded-full animate-ping-slow" />
        <div className="absolute inset-2 border-2 border-terrain-green border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-5 bg-terrain-green rounded-full opacity-80" />
      </div>
      <div className="font-mono text-xs tracking-widest text-terrain-green uppercase mb-1">
        INITIALIZING SPATIAL CORE
      </div>
      <div className="font-mono text-[10px] text-slate-500">
        CALIBRATING DRONE & TERRAIN COORDINATES
      </div>
    </div>
  );
}

export const SceneManager: React.FC<SceneManagerProps> = ({ scrollProgress, activeLayer = 'elevation' }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebGLSupported(gl);
    } catch {
      setWebGLSupported(false);
    }

    // Adaptive DPR for mobile vs desktop performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setDpr(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.75));
  }, []);

  if (!webGLSupported) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-space-950 text-slate-400 p-6">
        <div className="glass-panel p-6 rounded-lg text-center max-w-md font-mono text-xs space-y-2">
          <div className="text-terrain-green font-bold uppercase">WebGL Accelerating Disabled</div>
          <p>Your browser or device does not currently have WebGL hardware acceleration enabled. Standard 2D interactive spatial layers remain active below.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 4.2], fov: 48, near: 0.1, far: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x07090D, 1.0);
            scene.fog = new THREE.FogExp2(0x07090D, 0.055);
          }}
        >
          {/* Cinematographic Lighting System */}
          <ambientLight intensity={0.55} color={0x94A3B8} />

          {/* Primary Key Light */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.8}
            color={0xffffff}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Cyan Aerospace Rim Light */}
          <directionalLight position={[-4, 3, -3]} intensity={1.2} color={0x00E5FF} />

          {/* Emerald Analytical Ground Bounce Light */}
          <pointLight position={[0, -2, 1]} intensity={1.6} color={0x00F59B} distance={7} />

          {/* Camera Rig with Cinematic Lerping */}
          <CameraRig scrollProgress={scrollProgress} />

          {/* Scene 3D Entities */}
          <DroneModel scrollProgress={scrollProgress} />
          <CaptureTiles scrollProgress={scrollProgress} />
          <PointCloudTerrain scrollProgress={scrollProgress} activeLayer={activeLayer} />
          <PhysicsNetworkGraph scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
};
