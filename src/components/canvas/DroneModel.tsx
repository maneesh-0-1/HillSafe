'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DroneModelProps {
  scrollProgress: number; // 0.0 to 1.0
  onAnnotationPositions?: (positions: Record<string, [number, number, number]>) => void;
}

export const DroneModel: React.FC<DroneModelProps> = ({ scrollProgress, onAnnotationPositions }) => {
  const groupRef = useRef<THREE.Group>(null);
  const airframeRef = useRef<THREE.Group>(null);
  const sensorGimbalRef = useRef<THREE.Group>(null);
  const avionicsRef = useRef<THREE.Group>(null);
  const batteryRef = useRef<THREE.Group>(null);

  // 4 Arm references for exploded view
  const armFLRef = useRef<THREE.Group>(null);
  const armFRRef = useRef<THREE.Group>(null);
  const armBLRef = useRef<THREE.Group>(null);
  const armBRRef = useRef<THREE.Group>(null);

  // Propeller rotor references for continuous spinning
  const propFLRef = useRef<THREE.Group>(null);
  const propFRRef = useRef<THREE.Group>(null);
  const propBLRef = useRef<THREE.Group>(null);
  const propBRRef = useRef<THREE.Group>(null);

  // Materials with aerospace carbon & titanium aesthetics
  const materials = useMemo(() => {
    return {
      carbonFiber: new THREE.MeshStandardMaterial({
        color: 0x181c24,
        roughness: 0.35,
        metalness: 0.8,
      }),
      darkMatte: new THREE.MeshStandardMaterial({
        color: 0x0f131a,
        roughness: 0.6,
        metalness: 0.5,
      }),
      titaniumAccent: new THREE.MeshStandardMaterial({
        color: 0x71717a,
        roughness: 0.2,
        metalness: 0.9,
      }),
      sensorGlass: new THREE.MeshPhysicalMaterial({
        color: 0x00E5FF,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.85,
        emissive: 0x003344,
      }),
      radarBeacon: new THREE.MeshBasicMaterial({
        color: 0x00F59B,
      }),
      redBeacon: new THREE.MeshBasicMaterial({
        color: 0xFF4D4D,
      }),
      laserGlow: new THREE.MeshBasicMaterial({
        color: 0x00F59B,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    // 1. Rotate propellers continuously
    const spinSpeed = 35 * delta;
    if (propFLRef.current) propFLRef.current.rotation.y += spinSpeed;
    if (propFRRef.current) propFRRef.current.rotation.y -= spinSpeed;
    if (propBLRef.current) propBLRef.current.rotation.y -= spinSpeed;
    if (propBRRef.current) propBRRef.current.rotation.y += spinSpeed;

    // 2. Calculate explosion factor based on scroll:
    // Scene 02: 12% to 25% -> Explode
    // Scene 03 to 09: Drone fades or stays backgrounded
    // Scene 10: 96% to 98% -> Reassemble smoothly back to 0
    let explode = 0;
    if (scrollProgress >= 0.12 && scrollProgress <= 0.25) {
      explode = (scrollProgress - 0.12) / (0.25 - 0.12);
    } else if (scrollProgress > 0.25 && scrollProgress < 0.96) {
      // Hold explosion while in middle capture/map scenes
      explode = 1.0;
    } else if (scrollProgress >= 0.96 && scrollProgress <= 0.98) {
      // Reassemble smoothly back to whole machine
      explode = 1.0 - (scrollProgress - 0.96) / (0.98 - 0.96);
    } else if (scrollProgress > 0.98) {
      explode = 0;
    }

    // 3. Overall drone position, rotation, and visibility over scroll
    if (groupRef.current) {
      // Floating natural hover
      const hoverY = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

      if (scrollProgress < 0.12) {
        // Scene 01: Hero 3/4 cinematic angle emerging
        const heroProgress = scrollProgress / 0.12;
        groupRef.current.position.set(0, hoverY, 0);
        groupRef.current.rotation.set(0.15, -0.4 + heroProgress * 0.4, 0);
        groupRef.current.scale.setScalar(1.0);
      } else if (scrollProgress < 0.25) {
        // Scene 02: The Drone close-up & exploded view
        const p = (scrollProgress - 0.12) / 0.13;
        groupRef.current.position.set(0.2, hoverY + 0.1, 0.4);
        groupRef.current.rotation.set(0.25, p * 0.6, 0);
        groupRef.current.scale.setScalar(1.05);
      } else if (scrollProgress < 0.38) {
        // Scene 03: Capture - Drone moves slightly upward, pitch down toward ground
        const p = (scrollProgress - 0.25) / 0.13;
        groupRef.current.position.set(0, 1.8 - p * 0.4 + hoverY, -0.8);
        groupRef.current.rotation.set(0.45, 0.1, 0);
        groupRef.current.scale.setScalar(0.75);
      } else if (scrollProgress < 0.88) {
        // Scenes 04-07: Terrain is hero, drone stays high altitude or fades
        groupRef.current.position.set(0, 3.5 + hoverY, -2.5);
        groupRef.current.rotation.set(0.5, state.clock.elapsedTime * 0.05, 0);
        groupRef.current.scale.setScalar(0.4);
      } else if (scrollProgress < 0.96) {
        // Scene 09: Applications
        groupRef.current.position.set(-1.2, 0.5 + hoverY, -0.5);
        groupRef.current.rotation.set(0.2, 0.8, 0);
        groupRef.current.scale.setScalar(0.65);
      } else if (scrollProgress < 0.98) {
        // Scene 10: Why Hill Safe - Reassembly in center
        const p = (scrollProgress - 0.96) / 0.02;
        groupRef.current.position.set(0, hoverY, 0);
        groupRef.current.rotation.set(0.2, 0.4 * (1 - p), 0);
        groupRef.current.scale.setScalar(0.95);
      } else {
        // Scene 11: Final conversion - ascends gently into distance
        const p = (scrollProgress - 0.98) / 0.02;
        groupRef.current.position.set(0, 0.8 + p * 2.0, -1.0 - p * 3.0);
        groupRef.current.rotation.set(0.2, 0.2, 0);
        groupRef.current.scale.setScalar(0.85 * (1 - p * 0.4));
      }
    }

    // 4. Displace exploded components along local axes
    const ex = explode * 1.2;

    // Avionics moves UP (+Y)
    if (avionicsRef.current) avionicsRef.current.position.y = 0.22 + ex * 0.8;

    // Sensor Gimbal moves DOWN & FORWARD (-Y, +Z)
    if (sensorGimbalRef.current) {
      sensorGimbalRef.current.position.y = -0.18 - ex * 0.7;
      sensorGimbalRef.current.position.z = 0.35 + ex * 0.5;
    }

    // Battery pack moves DOWN & BACK (-Y, -Z)
    if (batteryRef.current) {
      batteryRef.current.position.y = -0.15 - ex * 0.6;
      batteryRef.current.position.z = -0.3 - ex * 0.5;
    }

    // 4 Arms move diagonally outwards
    if (armFLRef.current) armFLRef.current.position.set(-0.35 - ex * 0.6, ex * 0.15, 0.35 + ex * 0.6);
    if (armFRRef.current) armFRRef.current.position.set(0.35 + ex * 0.6, ex * 0.15, 0.35 + ex * 0.6);
    if (armBLRef.current) armBLRef.current.position.set(-0.35 - ex * 0.6, ex * 0.15, -0.35 - ex * 0.6);
    if (armBRRef.current) armBRRef.current.position.set(0.35 + ex * 0.6, ex * 0.15, -0.35 - ex * 0.6);
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. CENTRAL FUSELAGE / AIRFRAME */}
      <group ref={airframeRef}>
        {/* Main Monocoque Body */}
        <mesh material={materials.carbonFiber} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.16, 0.75]} />
        </mesh>
        {/* Aerodynamic Nose Chamfer */}
        <mesh position={[0, 0.02, 0.42]} material={materials.darkMatte}>
          <cylinderGeometry args={[0.18, 0.26, 0.12, 6]} />
        </mesh>
        {/* Rear Exhaust / Cooling Vent */}
        <mesh position={[0, 0, -0.39]} material={materials.titaniumAccent}>
          <boxGeometry args={[0.3, 0.08, 0.05]} />
        </mesh>
        {/* Red & Green Nav LEDs */}
        <mesh position={[-0.28, 0, 0.36]} material={materials.redBeacon}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh position={[0.28, 0, 0.36]} material={materials.radarBeacon}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
      </group>

      {/* 2. AVIONICS & TOP CANOPY (Explodes Upwards) */}
      <group ref={avionicsRef} position={[0, 0.22, 0]}>
        <mesh material={materials.darkMatte}>
          <cylinderGeometry args={[0.22, 0.26, 0.08, 8]} />
        </mesh>
        {/* RTK Dual GPS Dome */}
        <mesh position={[-0.1, 0.08, -0.15]} material={materials.titaniumAccent}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 16]} />
        </mesh>
        <mesh position={[0.1, 0.08, -0.15]} material={materials.titaniumAccent}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 16]} />
        </mesh>
        {/* Telemetry Antenna Mast */}
        <mesh position={[0, 0.14, 0.1]} material={materials.carbonFiber}>
          <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
        </mesh>
        <mesh position={[0, 0.24, 0.1]} material={materials.radarBeacon}>
          <sphereGeometry args={[0.015, 8, 8]} />
        </mesh>
      </group>

      {/* 3. SENSOR GIMBAL & LIDAR / 4K OPTICAL POD (Explodes Down & Forward) */}
      <group ref={sensorGimbalRef} position={[0, -0.18, 0.35]}>
        {/* Gimbal Yoke */}
        <mesh material={materials.titaniumAccent}>
          <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
        </mesh>
        {/* Sensor Sphere Turret */}
        <mesh position={[0, -0.06, 0]} material={materials.darkMatte}>
          <sphereGeometry args={[0.11, 24, 24]} />
        </mesh>
        {/* 4K Optical Lens */}
        <mesh position={[0, -0.06, 0.09]} rotation={[Math.PI / 2, 0, 0]} material={materials.sensorGlass}>
          <cylinderGeometry args={[0.045, 0.05, 0.03, 24]} />
        </mesh>
        {/* Micro-LiDAR Puck Sensor */}
        <mesh position={[0.05, -0.03, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={materials.carbonFiber}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        </mesh>
      </group>

      {/* 4. SOLID STATE BATTERY & QUICK RELEASE (Explodes Down & Backward) */}
      <group ref={batteryRef} position={[0, -0.15, -0.3]}>
        <mesh material={materials.darkMatte}>
          <boxGeometry args={[0.42, 0.12, 0.38]} />
        </mesh>
        {/* Locking Latches & Indicator Rails */}
        <mesh position={[0, -0.04, 0.2]} material={materials.titaniumAccent}>
          <boxGeometry args={[0.18, 0.03, 0.03]} />
        </mesh>
        {/* Battery Power LED Indicator bar */}
        <mesh position={[0.18, 0, 0]} material={materials.radarBeacon}>
          <boxGeometry args={[0.01, 0.02, 0.15]} />
        </mesh>
      </group>

      {/* 5. ARMS & PROPULSION ASSEMBLIES (Explode Radially) */}
      {/* Front-Left Arm */}
      <group ref={armFLRef} position={[-0.35, 0, 0.35]}>
        {/* Carbon Boom */}
        <mesh rotation={[0, -Math.PI / 4, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.04, 0.04, 0.65]} />
        </mesh>
        {/* Motor Pod */}
        <group position={[-0.24, 0.05, 0.24]}>
          <mesh material={materials.titaniumAccent}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
          </mesh>
          {/* Propeller */}
          <group ref={propFLRef} position={[0, 0.04, 0]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.65, 0.01, 0.045]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Front-Right Arm */}
      <group ref={armFRRef} position={[0.35, 0, 0.35]}>
        <mesh rotation={[0, Math.PI / 4, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.04, 0.04, 0.65]} />
        </mesh>
        <group position={[0.24, 0.05, 0.24]}>
          <mesh material={materials.titaniumAccent}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
          </mesh>
          <group ref={propFRRef} position={[0, 0.04, 0]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.65, 0.01, 0.045]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Back-Left Arm */}
      <group ref={armBLRef} position={[-0.35, 0, -0.35]}>
        <mesh rotation={[0, Math.PI / 4, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.04, 0.04, 0.65]} />
        </mesh>
        <group position={[-0.24, 0.05, -0.24]}>
          <mesh material={materials.titaniumAccent}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
          </mesh>
          <group ref={propBLRef} position={[0, 0.04, 0]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.65, 0.01, 0.045]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Back-Right Arm */}
      <group ref={armBRRef} position={[0.35, 0, -0.35]}>
        <mesh rotation={[0, -Math.PI / 4, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.04, 0.04, 0.65]} />
        </mesh>
        <group position={[0.24, 0.05, -0.24]}>
          <mesh material={materials.titaniumAccent}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
          </mesh>
          <group ref={propBRRef} position={[0, 0.04, 0]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.65, 0.01, 0.045]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
