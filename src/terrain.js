import * as THREE from 'three';

/**
 * Creates the dynamic procedural green topographical terrain
 * with rolling mountain ridges, contour lines, and responsive LiDAR illumination.
 * Uses bulletproof GLSL FBM noise compatible with all WebGL implementations.
 */
export function createTerrain() {
  const terrainGroup = new THREE.Group();

  const width = 240;
  const height = 240;
  const segmentsX = 160;
  const segmentsY = 160;

  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  geometry.rotateX(-Math.PI / 2);

  // Custom GLSL Shader for wireframe terrain + contour elevation lines + LiDAR illumination
  const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 0.12 },
      uDronePos: { value: new THREE.Vector3(10, 8, 2) },
      uLidarActive: { value: 1.0 },
      uLidarRadius: { value: 12.0 },
      uColorBase: { value: new THREE.Color(0x011409) },
      uColorGreen: { value: new THREE.Color(0x00E676) },
      uColorPeak: { value: new THREE.Color(0x00FF88) },
      uColorContour: { value: new THREE.Color(0x69F0AE) }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSpeed;
      varying vec3 vWorldPosition;
      varying vec3 vPosition;
      varying float vElevation;
      varying vec2 vUv;

      // Ultra-robust 2D pseudo-random noise
      float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      // Multi-octave FBM for natural mountain peaks & valleys
      float fbm(vec2 p) {
        float val = 0.0;
        float amp = 0.5;
        mat2 rot = mat2(0.87, 0.5, -0.5, 0.87);
        for (int i = 0; i < 4; i++) {
          val += amp * noise(p);
          p = rot * p * 2.05 + vec2(12.5, 7.3);
          amp *= 0.5;
        }
        return val;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Animate terrain drifting forward seamlessly under flight path
        vec2 coord = vec2(pos.x * 0.032, (pos.z + uTime * uSpeed * 22.0) * 0.032);

        // Mountain terrain with rolling peaks and sharp ridges (Image 1 style)
        float baseHills = fbm(coord * 0.9) * 11.0;
        float sharpRidge = (1.0 - abs(noise(coord * 1.8) * 2.0 - 1.0)) * 5.5;
        float fineDetail = noise(coord * 4.2) * 1.5;

        float elevation = baseHills + sharpRidge + fineDetail - 6.0;
        pos.y = elevation;

        vElevation = elevation;
        vPosition = pos;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPos.xyz;

        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uDronePos;
      uniform float uLidarActive;
      uniform float uLidarRadius;
      uniform vec3 uColorBase;
      uniform vec3 uColorGreen;
      uniform vec3 uColorPeak;
      uniform vec3 uColorContour;

      varying vec3 vWorldPosition;
      varying vec3 vPosition;
      varying float vElevation;
      varying vec2 vUv;

      void main() {
        // Distance fog: smooth fade to deep black background at horizon
        float distToCam = length(vWorldPosition - cameraPosition);
        float fogFactor = smoothstep(160.0, 35.0, distToCam);

        // 1. Topographical Contour Isolines (Image 1 style)
        float contourInterval = 1.2;
        float normElev = vElevation / contourInterval;
        float fVar = fwidth(normElev);
        float contourFrac = fract(normElev);
        float contourLine = smoothstep(fVar * 1.5, 0.0, contourFrac) + smoothstep(1.0 - fVar * 1.5, 1.0, contourFrac);

        // 2. High-Tech Wireframe Grid Lines
        vec2 gridCoord = vPosition.xz * 0.65;
        vec2 gridFrac = abs(fract(gridCoord - 0.5) - 0.5) / fwidth(gridCoord);
        float lineX = 1.0 - min(gridFrac.x, 1.0);
        float lineY = 1.0 - min(gridFrac.y, 1.0);
        float gridLine = max(lineX, lineY);

        // 3. Elevation Color Ramp
        float elevNorm = clamp((vElevation + 3.0) / 16.0, 0.0, 1.0);
        vec3 elevBase = mix(uColorBase, uColorGreen * 0.5, elevNorm);

        // Base terrain brightness
        vec3 color = elevBase;

        // Apply crisp wireframe & glowing contour lines
        color += uColorGreen * gridLine * 0.45;
        color += uColorContour * contourLine * 0.75;
        color += uColorPeak * elevNorm * 0.25;

        // 4. Volumetric LiDAR Scan Footprint & Laser Reception on ground
        vec2 groundDiff = vWorldPosition.xz - uDronePos.xz;
        float distToDroneGround = length(groundDiff);

        if (uLidarActive > 0.5 && distToDroneGround < uLidarRadius * 1.6) {
          float lidarProximity = 1.0 - smoothstep(0.0, uLidarRadius, distToDroneGround);
          
          // Radar scan line sweeping around
          float angle = atan(groundDiff.y, groundDiff.x);
          float sweep = fract(angle / 6.28318 + uTime * 1.6);
          float sweepLine = smoothstep(0.88, 1.0, sweep);

          // Concentric lidar pulse rings
          float ring = fract(distToDroneGround * 0.7 - uTime * 2.5);
          float ringPulse = smoothstep(0.75, 1.0, ring) * lidarProximity;

          // Intensely illuminate terrain wireframe in LiDAR cone
          vec3 lidarScanColor = vec3(0.1, 1.0, 0.55);
          color += lidarScanColor * (lidarProximity * 0.85 + sweepLine * lidarProximity * 1.4 + ringPulse * 1.0);
          
          // High-density points under LiDAR beam
          color += uColorPeak * gridLine * lidarProximity * 2.0;
        }

        // Apply dark atmospheric falloff
        color *= fogFactor;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    wireframe: false,
    transparent: true,
  });

  const terrainMesh = new THREE.Mesh(geometry, customMaterial);
  terrainGroup.add(terrainMesh);

  // Secondary layer: glowing floating telemetry point nodes at mountain peaks
  const pointCount = 2000;
  const pointGeo = new THREE.BufferGeometry();
  const pointPositions = new Float32Array(pointCount * 3);
  for (let i = 0; i < pointCount; i++) {
    pointPositions[i * 3 + 0] = (Math.random() - 0.5) * 180;
    pointPositions[i * 3 + 1] = Math.random() * 8.0 - 2.0;
    pointPositions[i * 3 + 2] = (Math.random() - 0.5) * 180;
  }
  pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));

  const pointMat = new THREE.PointsMaterial({
    color: 0x00FF88,
    size: 0.35,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });

  const pointsMesh = new THREE.Points(pointGeo, pointMat);
  terrainGroup.add(pointsMesh);

  return {
    group: terrainGroup,
    material: customMaterial,
    points: pointsMesh,
    update(time, dronePosition, lidarActive) {
      customMaterial.uniforms.uTime.value = time;
      customMaterial.uniforms.uDronePos.value.copy(dronePosition);
      customMaterial.uniforms.uLidarActive.value = lidarActive ? 1.0 : 0.0;
    }
  };
}
