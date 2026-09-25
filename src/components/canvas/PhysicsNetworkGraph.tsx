'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PhysicsNetworkGraphProps {
  scrollProgress: number; // 0.0 to 1.0
}

interface ParameterNode {
  name: string;
  angle: number;
  radius: number;
  yOffset: number;
  color: number;
}

export const PhysicsNetworkGraph: React.FC<PhysicsNetworkGraphProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreRingsRef = useRef<THREE.Group>(null);

  // Environmental and Geomechanical physical parameter nodes
  const parameterNodes: ParameterNode[] = useMemo(() => {
    return [
      { name: 'RAINFALL INTENSITY', angle: 0, radius: 2.4, yOffset: 0.6, color: 0x00E5FF },
      { name: 'SOIL SHEAR STRENGTH', angle: (Math.PI / 3) * 1, radius: 2.2, yOffset: -0.4, color: 0x00F59B },
      { name: 'SLOPE INCLINATION', angle: (Math.PI / 3) * 2, radius: 2.5, yOffset: 0.8, color: 0xF59E0B },
      { name: 'PORE WATER PRESSURE', angle: (Math.PI / 3) * 3, radius: 2.3, yOffset: -0.6, color: 0x00E5FF },
      { name: 'INSAR DISPLACEMENT', angle: (Math.PI / 3) * 4, radius: 2.6, yOffset: 0.5, color: 0x00F59B },
      { name: 'OBSERVED GEOLOGY', angle: (Math.PI / 3) * 5, radius: 2.2, yOffset: -0.2, color: 0xFF6B4A },
    ];
  }, []);

  const materials = useMemo(() => {
    return {
      core: new THREE.MeshStandardMaterial({
        color: 0x00F59B,
        emissive: 0x003322,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
      }),
      coreGlow: new THREE.MeshBasicMaterial({
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.25,
      }),
      laserConnection: new THREE.LineBasicMaterial({
        color: 0x00F59B,
        transparent: true,
        opacity: 0.45,
      }),
      nodeSphere: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.8,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Active during Scene 06 (65% to 82% scroll)
    const active = scrollProgress >= 0.65 && scrollProgress <= 0.82;
    groupRef.current.visible = active;

    if (!active) return;

    // Smooth entry / convergence animation
    const t = state.clock.elapsedTime;
    const progress = (scrollProgress - 0.65) / 0.17;

    // Rotate entire orbital graph
    groupRef.current.rotation.y = t * 0.25;

    // Rotate core tensor geometry
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.8;
      coreRef.current.rotation.y = t * 0.6;
    }

    if (coreRingsRef.current) {
      coreRingsRef.current.rotation.z = -t * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} visible={false}>
      {/* Central Physics-Informed Neural Core */}
      <group position={[0, 0, 0]}>
        <mesh ref={coreRef} material={materials.core}>
          <octahedronGeometry args={[0.65, 2]} />
        </mesh>
        <mesh material={materials.coreGlow}>
          <sphereGeometry args={[0.8, 16, 16]} />
        </mesh>

        {/* Orbiting Quantum / Tensor Rings */}
        <group ref={coreRingsRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.0, 0.015, 8, 32]} />
            <meshBasicMaterial color={0x00E5FF} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[1.2, 0.015, 8, 32]} />
            <meshBasicMaterial color={0x00F59B} />
          </mesh>
        </group>
      </group>

      {/* Orbiting Parameter Nodes with Ray Connections */}
      {parameterNodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;
        const y = node.yOffset;

        // Line geometry from center (0,0,0) to node (x, y, z)
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, y, z),
        ]);

        return (
          <group key={node.name}>
            {/* Laser Line connection to core */}
            <primitive object={new THREE.Line(lineGeom, materials.laserConnection)} />

            {/* Satellite Node Sphere */}
            <group position={[x, y, z]}>
              <mesh material={materials.nodeSphere}>
                <sphereGeometry args={[0.12, 16, 16]} />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.15, 12, 12]} />
                <meshBasicMaterial color={node.color} wireframe transparent opacity={0.6} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
};
