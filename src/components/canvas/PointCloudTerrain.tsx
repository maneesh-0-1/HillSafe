'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnalyticalLayer } from '@/src/lib/types';

interface PointCloudTerrainProps {
  scrollProgress: number; // 0.0 to 1.0
  activeLayer?: AnalyticalLayer;
}

export const PointCloudTerrain: React.FC<PointCloudTerrainProps> = ({
  scrollProgress,
  activeLayer = 'elevation',
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const drainageGroupRef = useRef<THREE.Group>(null);
  const boundaryLineRef = useRef<THREE.LineLoop>(null);

  // Generate terrain height data & vertices
  const { terrainGeometry, pointGeometry, colorsArray, boundaryPoints } = useMemo(() => {
    const width = 8;
    const depth = 8;
    const segs = 64; // High resolution grid
    const geom = new THREE.PlaneGeometry(width, depth, segs, segs);
    geom.rotateX(-Math.PI / 2);

    const posAttr = geom.attributes.position;
    const count = posAttr.count;
    const colors = new Float32Array(count * 3);

    // Realistic multi-frequency elevation generation (hilly terrain + construction grading)
    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      // Primary hill ridge
      let y = Math.sin(x * 0.6) * Math.cos(z * 0.6) * 0.9;
      // Secondary spurs & steep slopes
      y += Math.sin(x * 1.4 + z * 1.1) * 0.45;
      // High-frequency texture
      y += Math.cos(x * 2.8 - z * 2.2) * 0.15;
      // Terraced excavation bench
      if (x > 0.5 && z > -1 && z < 1.5) {
        y = Math.floor(y * 4) / 4;
      }

      posAttr.setY(i, y);

      // Hypsometric colors (Deep charcoal/blue at low elevation -> Emerald green -> Amber at peak)
      const normY = (y + 1.2) / 2.6; // normalized 0 to 1
      if (normY < 0.35) {
        // Low valley
        colors[i * 3] = 0.02;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.85;
      } else if (normY < 0.7) {
        // Mid slope (Hill Safe Emerald Green)
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.96;
        colors[i * 3 + 2] = 0.61;
      } else {
        // High ridge peak (Amber)
        colors[i * 3] = 0.96;
        colors[i * 3 + 1] = 0.62;
        colors[i * 3 + 2] = 0.15;
      }
    }

    geom.computeVertexNormals();

    // Create duplicate geometry for Points
    const ptGeom = geom.clone();
    ptGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create 22-Acre Site Cadastral Boundary Points
    const bPoints: THREE.Vector3[] = [
      new THREE.Vector3(-2.8, 0.4, -2.8),
      new THREE.Vector3(2.5, 0.2, -2.6),
      new THREE.Vector3(3.2, 0.8, 1.8),
      new THREE.Vector3(1.2, 0.1, 3.1),
      new THREE.Vector3(-2.5, -0.2, 2.7),
      new THREE.Vector3(-3.2, 0.3, 0.2),
    ];

    return {
      terrainGeometry: geom,
      pointGeometry: ptGeom,
      colorsArray: colors,
      boundaryPoints: bPoints,
    };
  }, []);

  // Material setup
  const materials = useMemo(() => {
    return {
      points: new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
      }),
      wireframeMesh: new THREE.MeshStandardMaterial({
        color: 0x111923,
        roughness: 0.7,
        metalness: 0.4,
        wireframe: false,
        flatShading: true,
      }),
      contourOverlay: new THREE.MeshBasicMaterial({
        color: 0x00F59B,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
      slopeAnalysis: new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        roughness: 0.5,
        wireframe: false,
      }),
      drainageStream: new THREE.LineDashedMaterial({
        color: 0x00E5FF,
        dashSize: 0.2,
        gapSize: 0.1,
      }),
      boundary: new THREE.LineBasicMaterial({
        color: 0x00F59B,
        linewidth: 2,
      }),
    };
  }, []);

  // Boundary geometry
  const boundaryGeom = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(boundaryPoints);
  }, [boundaryPoints]);

  useFrame((state) => {
    // Only active from Scene 04 onwards (38% to 100%)
    const visible = scrollProgress >= 0.35;
    if (pointsRef.current) pointsRef.current.visible = visible;
    if (meshRef.current) meshRef.current.visible = visible;

    if (!visible) return;

    // SCENE 04 (38% - 52%): Point cloud densifies and transitions into solid mesh
    if (scrollProgress >= 0.35 && scrollProgress < 0.52) {
      const morphP = (scrollProgress - 0.35) / 0.17;

      if (pointsRef.current) {
        pointsRef.current.position.set(0, -1.8 + morphP * 0.6, 0);
        pointsRef.current.rotation.y = morphP * 0.3;
        // Fade out points as mesh takes over
        materials.points.opacity = Math.max(0.2, 1.0 - morphP * 0.7);
        materials.points.size = 0.06 - morphP * 0.02;
      }

      if (meshRef.current) {
        meshRef.current.position.set(0, -1.8 + morphP * 0.6, 0);
        meshRef.current.rotation.y = morphP * 0.3;
        // Mesh wireframe fades in
        materials.contourOverlay.opacity = morphP * 0.4;
      }
    } else if (scrollProgress >= 0.52 && scrollProgress <= 0.88) {
      // SCENE 05 & 07: Solid Terrain is in full analytical focus
      const tY = -1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      const rotY = 0.3 + (scrollProgress - 0.52) * 0.4;

      if (meshRef.current) {
        meshRef.current.position.set(0, tY, 0);
        meshRef.current.rotation.set(0.3, rotY, 0);
      }
      if (pointsRef.current) {
        pointsRef.current.position.set(0, tY, 0);
        pointsRef.current.rotation.set(0.3, rotY, 0);
        materials.points.opacity = 0.15; // subtle point cloud accent
      }

      // Layer specific visual adjustments
      if (activeLayer === 'elevation') {
        materials.contourOverlay.opacity = 0.35;
        materials.wireframeMesh.color.setHex(0x0f172a);
      } else if (activeLayer === 'slope') {
        materials.wireframeMesh.color.setHex(0x1a1510);
        materials.contourOverlay.opacity = 0.15;
      } else if (activeLayer === 'drainage') {
        materials.wireframeMesh.color.setHex(0x0a141e);
      } else if (activeLayer === 'boundary') {
        materials.contourOverlay.opacity = 0.2;
      }
    } else if (scrollProgress > 0.88) {
      // SCENE 08-11: Pulls back slightly to frame comparison and conversion
      const p = (scrollProgress - 0.88) / 0.12;
      if (meshRef.current) {
        meshRef.current.position.set(0, -1.4 - p * 0.5, -p * 1.5);
        meshRef.current.scale.setScalar(1.0 - p * 0.3);
      }
      if (pointsRef.current) {
        pointsRef.current.position.set(0, -1.4 - p * 0.5, -p * 1.5);
        pointsRef.current.scale.setScalar(1.0 - p * 0.3);
      }
    }
  });

  return (
    <group dispose={null}>
      {/* 1. Spatial 3D Point Cloud (Feature points from photogrammetry) */}
      <points ref={pointsRef} geometry={pointGeometry} material={materials.points} />

      {/* 2. Reconstructed 3D Terrain Solid Mesh */}
      <mesh ref={meshRef} geometry={terrainGeometry} material={materials.wireframeMesh} receiveShadow castShadow>
        {/* Semi-transparent contour wireframe overlay */}
        <mesh geometry={terrainGeometry} material={materials.contourOverlay} />

        {/* 3. Cadastral Site Boundary Line (22 Acres) */}
        {(activeLayer === 'boundary' || scrollProgress >= 0.6) && (
          <primitive object={new THREE.LineLoop(boundaryGeom, materials.boundary)} position={[0, 0.05, 0]} />
        )}

        {/* 4. Hydrological Runoff Flow Vector Particles (Valleys) */}
        {activeLayer === 'drainage' && (
          <group ref={drainageGroupRef} position={[0, 0.08, 0]}>
            <mesh position={[-1.2, 0, 0.4]}>
              <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
              <meshBasicMaterial color={0x00E5FF} />
            </mesh>
            <mesh position={[1.4, 0, -0.6]}>
              <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
              <meshBasicMaterial color={0x00E5FF} />
            </mesh>
          </group>
        )}
      </mesh>
    </group>
  );
};
