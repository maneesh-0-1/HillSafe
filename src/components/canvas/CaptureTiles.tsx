'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CaptureTilesProps {
  scrollProgress: number; // 0.0 to 1.0
}

export const CaptureTiles: React.FC<CaptureTilesProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const frustumConeRef = useRef<THREE.Mesh>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);

  // Generate a grid of photographic capture tiles
  const tilesData = useMemo(() => {
    const tiles: { id: number; pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const rows = 5;
    const cols = 6;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({
          id: r * cols + c,
          pos: [(c - 2.5) * 0.8, -1.2 + Math.sin(r * 0.5 + c * 0.4) * 0.2, (r - 2) * 0.8 - 0.5],
          rot: [-Math.PI / 2 + (Math.random() - 0.5) * 0.1, 0, (Math.random() - 0.5) * 0.1],
        });
      }
    }
    return tiles;
  }, []);

  const materials = useMemo(() => {
    return {
      frustum: new THREE.MeshBasicMaterial({
        color: 0x00F59B,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
      frustumFill: new THREE.MeshBasicMaterial({
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
      }),
      tileEdge: new THREE.LineBasicMaterial({
        color: 0x00F59B,
        transparent: true,
        opacity: 0.6,
      }),
      tileFill: new THREE.MeshStandardMaterial({
        color: 0x16202c,
        roughness: 0.8,
        metalness: 0.2,
      }),
      scanRing: new THREE.MeshBasicMaterial({
        color: 0x00F59B,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Active primarily in Scene 03 (25% to 38% scroll)
    const active = scrollProgress >= 0.22 && scrollProgress <= 0.42;
    groupRef.current.visible = active;

    if (active) {
      const p = (scrollProgress - 0.22) / 0.2;
      groupRef.current.position.y = 1.0 - p * 1.5;

      // Animate laser scan cone rotation and pulsating scanner ring
      if (frustumConeRef.current) {
        frustumConeRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      }
      if (scanRingRef.current) {
        const scale = 1 + (Math.sin(state.clock.elapsedTime * 4) + 1) * 0.15;
        scanRingRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* 1. Downward Sensor Scanning Frustum (LiDAR / Optical Beam) */}
      <group position={[0, 0.4, 0]}>
        <mesh ref={frustumConeRef} material={materials.frustum} position={[0, -1.2, 0]}>
          <coneGeometry args={[2.2, 2.5, 4, 1, true]} />
        </mesh>
        <mesh material={materials.frustumFill} position={[0, -1.2, 0]}>
          <coneGeometry args={[2.2, 2.5, 4, 1, false]} />
        </mesh>

        {/* Pulsing ground target scanning ring */}
        <mesh ref={scanRingRef} position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.scanRing}>
          <ringGeometry args={[1.2, 1.35, 32]} />
        </mesh>
      </group>

      {/* 2. Cascading Overlapping Aerial Capture Frames */}
      <group position={[0, -0.6, 0]}>
        {tilesData.map((tile, idx) => {
          // Staggered cascade appearance
          const isVisible = scrollProgress > 0.25 + (idx / tilesData.length) * 0.1;
          if (!isVisible) return null;

          return (
            <group key={tile.id} position={tile.pos} rotation={tile.rot}>
              <mesh material={materials.tileFill}>
                <planeGeometry args={[0.7, 0.52]} />
              </mesh>
              {/* Tile Crosshair / Center point */}
              <mesh position={[0, 0, 0.01]}>
                <ringGeometry args={[0.015, 0.025, 8]} />
                <meshBasicMaterial color={0x00F59B} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
