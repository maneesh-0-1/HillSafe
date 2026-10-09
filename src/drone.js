import * as THREE from 'three';

/**
 * Ultra-realistic 3D Model of the Tarot FY680 Stealth Commercial Survey Hexacopter.
 * Reconstructed with high fidelity matching Image 2:
 * - Faceted stealth polygonal composite canopy with top GPS mast
 * - 6 high-modulus carbon fiber boom arms with CNC Tarot folding joint brackets
 * - 6 brushless outrunner motors with visible copper coil wire windings & cooling vents
 * - 6 balanced folding carbon fiber propeller blades with aerodynamic twist & high-speed rotor blur
 * - Arched tubular landing gear skids with crossbars & rubber dampers
 * - Underslung payload rails with 3-axis gyro-stabilized LiDAR & 4K optical sensor pod
 * - Dynamic volumetric emerald green LiDAR laser scan beam (Image 1 reference)
 */
export function createDrone() {
  const droneRoot = new THREE.Group();
  // Scale up drone for substantial hero presence in the scene
  droneRoot.scale.set(1.4, 1.4, 1.4);

  // High-End PBR Materials
  const stealthShellMat = new THREE.MeshStandardMaterial({
    color: 0x111613,
    roughness: 0.55,
    metalness: 0.35,
    flatShading: true // Preserves the exact sharp faceted stealth geometry seen in image 2
  });

  const carbonFiberMat = new THREE.MeshPhysicalMaterial({
    color: 0x181c1a,
    roughness: 0.3,
    metalness: 0.4,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2
  });

  const anodizedTarotOrangeMat = new THREE.MeshStandardMaterial({
    color: 0xe65100, // Tarot orange folding arm clamp rings
    roughness: 0.3,
    metalness: 0.85
  });

  const cncBlackAluminumMat = new THREE.MeshStandardMaterial({
    color: 0x121413,
    roughness: 0.25,
    metalness: 0.9
  });

  const copperWindingsMat = new THREE.MeshStandardMaterial({
    color: 0xd97724, // Bright copper enamel stator coil windings
    roughness: 0.2,
    metalness: 0.95,
    emissive: 0x4a2200,
    emissiveIntensity: 0.35
  });

  const carbonBladeMat = new THREE.MeshPhysicalMaterial({
    color: 0x151816,
    roughness: 0.25,
    metalness: 0.5,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    side: THREE.DoubleSide
  });

  const titaniumScrewMat = new THREE.MeshStandardMaterial({
    color: 0x9e9e9e,
    roughness: 0.2,
    metalness: 0.95
  });

  // 1. Center Chassis & Core Plates
  const bodyGroup = new THREE.Group();
  droneRoot.add(bodyGroup);

  // Upper & Lower Hexagonal Carbon Fiber Chassis Plates
  const plateGeo = new THREE.CylinderGeometry(1.3, 1.35, 0.09, 6);
  const topPlate = new THREE.Mesh(plateGeo, carbonFiberMat);
  topPlate.position.y = 0.26;
  bodyGroup.add(topPlate);

  const bottomPlate = new THREE.Mesh(plateGeo, carbonFiberMat);
  bottomPlate.position.y = -0.26;
  bodyGroup.add(bottomPlate);

  // CNC Standoff Pillars with titanium screws
  for (let s = 0; s < 6; s++) {
    const angle = (s / 6) * Math.PI * 2 + Math.PI / 6;
    const px = Math.cos(angle) * 0.95;
    const pz = Math.sin(angle) * 0.95;

    const standoff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.52, 8),
      cncBlackAluminumMat
    );
    standoff.position.set(px, 0, pz);
    bodyGroup.add(standoff);

    // Top screw head
    const screw = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8),
      titaniumScrewMat
    );
    screw.position.set(px, 0.32, pz);
    bodyGroup.add(screw);
  }

  // 2. Faceted Stealth Canopy (Matching Image 2)
  const canopyGeo = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    // Top flat facet
    -0.55, 0.82, -0.45,   0.55, 0.82, -0.45,   0.0, 0.85, 0.55,
    -0.55, 0.82, -0.45,   0.0, 0.85, 0.55,    -0.6, 0.82, 0.25,
     0.55, 0.82, -0.45,   0.6, 0.82, 0.25,     0.0, 0.85, 0.55,

    // Front nose angled facets
     0.0, 0.85, 0.55,    -0.6, 0.82, 0.25,     0.0, 0.38, 1.05,
     0.0, 0.85, 0.55,     0.0, 0.38, 1.05,     0.6, 0.82, 0.25,

    // Front lower bevels
    -0.6, 0.82, 0.25,    -0.85, 0.32, 0.35,    0.0, 0.38, 1.05,
     0.6, 0.82, 0.25,     0.0, 0.38, 1.05,     0.85, 0.32, 0.35,

    // Side upper slopes
    -0.55, 0.82, -0.45,  -0.6, 0.82, 0.25,    -0.98, 0.32, -0.12,
    -0.6, 0.82, 0.25,    -0.85, 0.32, 0.35,   -0.98, 0.32, -0.12,

     0.55, 0.82, -0.45,   0.98, 0.32, -0.12,   0.6, 0.82, 0.25,
     0.6, 0.82, 0.25,     0.98, 0.32, -0.12,   0.85, 0.32, 0.35,

    // Rear slopes
    -0.55, 0.82, -0.45,  -0.98, 0.32, -0.12,  -0.55, 0.32, -0.95,
     0.55, 0.82, -0.45,   0.55, 0.32, -0.95,   0.98, 0.32, -0.12,
    -0.55, 0.82, -0.45,  -0.55, 0.32, -0.95,   0.0, 0.72, -0.9,
     0.55, 0.82, -0.45,   0.0, 0.72, -0.9,     0.55, 0.32, -0.95,

    // Skirt lower sides connecting to chassis base
    -0.98, 0.32, -0.12,  -0.85, 0.32, 0.35,   -0.9, 0.26, 0.1,
     0.98, 0.32, -0.12,   0.9, 0.26, 0.1,      0.85, 0.32, 0.35,
     0.0, 0.38, 1.05,    -0.85, 0.32, 0.35,    0.0, 0.26, 1.0,
     0.0, 0.38, 1.05,     0.0, 0.26, 1.0,      0.85, 0.32, 0.35,
    -0.55, 0.32, -0.95,   0.55, 0.32, -0.95,   0.0, 0.26, -0.95
  ]);

  canopyGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  canopyGeo.computeVertexNormals();

  const canopyMesh = new THREE.Mesh(canopyGeo, stealthShellMat);
  bodyGroup.add(canopyMesh);

  // Top GPS / Telemetry Mast (as visible in image 2)
  const mastBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 0.1, 12),
    cncBlackAluminumMat
  );
  mastBase.position.set(0, 0.88, -0.1);
  bodyGroup.add(mastBase);

  const mastPuck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16),
    stealthShellMat
  );
  mastPuck.position.set(0, 0.95, -0.1);
  bodyGroup.add(mastPuck);

  // 3. Dual Carbon Fiber Payload Mounting Rails (Underneath Chassis)
  const railGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 12);
  railGeo.rotateX(Math.PI / 2);

  const leftRail = new THREE.Mesh(railGeo, carbonFiberMat);
  leftRail.position.set(-0.38, -0.45, 0);
  bodyGroup.add(leftRail);

  const rightRail = new THREE.Mesh(railGeo, carbonFiberMat);
  rightRail.position.set(0.38, -0.45, 0);
  bodyGroup.add(rightRail);

  // 4. Arched Tubular Carbon Landing Skids
  const skidGroup = new THREE.Group();
  bodyGroup.add(skidGroup);

  // Arched struts
  const strutCurveL1 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.65, -0.32, 0.55),
    new THREE.Vector3(-1.25, -1.1, 0.45),
    new THREE.Vector3(-1.45, -1.65, 0.45)
  );
  const strutMeshL1 = new THREE.Mesh(
    new THREE.TubeGeometry(strutCurveL1, 16, 0.045, 8, false),
    carbonFiberMat
  );
  skidGroup.add(strutMeshL1);

  const strutCurveL2 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.65, -0.32, -0.55),
    new THREE.Vector3(-1.25, -1.1, -0.45),
    new THREE.Vector3(-1.45, -1.65, -0.45)
  );
  const strutMeshL2 = new THREE.Mesh(
    new THREE.TubeGeometry(strutCurveL2, 16, 0.045, 8, false),
    carbonFiberMat
  );
  skidGroup.add(strutMeshL2);

  const strutCurveR1 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.65, -0.32, 0.55),
    new THREE.Vector3(1.25, -1.1, 0.45),
    new THREE.Vector3(1.45, -1.65, 0.45)
  );
  const strutMeshR1 = new THREE.Mesh(
    new THREE.TubeGeometry(strutCurveR1, 16, 0.045, 8, false),
    carbonFiberMat
  );
  skidGroup.add(strutMeshR1);

  const strutCurveR2 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.65, -0.32, -0.55),
    new THREE.Vector3(1.25, -1.1, -0.45),
    new THREE.Vector3(1.45, -1.65, -0.45)
  );
  const strutMeshR2 = new THREE.Mesh(
    new THREE.TubeGeometry(strutCurveR2, 16, 0.045, 8, false),
    carbonFiberMat
  );
  skidGroup.add(strutMeshR2);

  // Horizontal runner pipes (landing skids) with rubber end caps
  const runnerGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.9, 12);
  runnerGeo.rotateX(Math.PI / 2);

  const leftRunner = new THREE.Mesh(runnerGeo, carbonFiberMat);
  leftRunner.position.set(-1.45, -1.65, 0);
  skidGroup.add(leftRunner);

  const rightRunner = new THREE.Mesh(runnerGeo, carbonFiberMat);
  rightRunner.position.set(1.45, -1.65, 0);
  skidGroup.add(rightRunner);

  // 5. 6 Carbon Fiber Arms with Tarot Folding Brackets & Brushless Motors
  const armLength = 4.0;
  const rotorAssemblies = [];

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const armGroup = new THREE.Group();
    armGroup.rotation.y = angle;

    // CNC Folding Arm Clamp Assembly with Tarot Anodized Orange Locking Ring
    const clampBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.26, 0.5),
      cncBlackAluminumMat
    );
    clampBase.position.set(0, 0, 1.2);
    armGroup.add(clampBase);

    const orangeCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.15, 16),
      anodizedTarotOrangeMat
    );
    orangeCollar.geometry.rotateX(Math.PI / 2);
    orangeCollar.position.set(0, 0, 1.38);
    armGroup.add(orangeCollar);

    // High-Modulus Carbon Fiber Tubular Boom Arm
    const boomGeo = new THREE.CylinderGeometry(0.075, 0.075, armLength - 1.35, 16);
    boomGeo.rotateX(Math.PI / 2);
    const boomMesh = new THREE.Mesh(boomGeo, carbonFiberMat);
    boomMesh.position.set(0, 0, 1.35 + (armLength - 1.35) / 2);
    armGroup.add(boomMesh);

    // Motor Mount Carbon Plate at Boom End
    const motorPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.09, 0.65),
      carbonFiberMat
    );
    motorPlate.position.set(0, 0.08, armLength);
    armGroup.add(motorPlate);

    // Brushless Motor Base (CNC Anodized Black)
    const motorBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.14, 20),
      cncBlackAluminumMat
    );
    motorBase.position.set(0, 0.19, armLength);
    armGroup.add(motorBase);

    // Stator with Visible Copper Coil Wire Windings (As in Image 2!)
    const copperCoils = new THREE.Mesh(
      new THREE.TorusGeometry(0.17, 0.055, 10, 20),
      copperWindingsMat
    );
    copperCoils.rotation.x = Math.PI / 2;
    copperCoils.position.set(0, 0.26, armLength);
    armGroup.add(copperCoils);

    // Brushless Motor Rotor Bell with Ventilation Slots
    const rotorBell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.23, 0.23, 0.18, 20),
      cncBlackAluminumMat
    );
    rotorBell.position.set(0, 0.38, armLength);
    armGroup.add(rotorBell);

    // Threaded Propeller Shaft & Silver Lock Nut
    const propNut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.18, 12),
      titaniumScrewMat
    );
    propNut.position.set(0, 0.52, armLength);
    armGroup.add(propNut);

    // 6. Dual Carbon Fiber Folding Propeller Assembly
    const propGroup = new THREE.Group();
    propGroup.position.set(0, 0.54, armLength);

    // Central CNC Blade Grip Hub
    const hubMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16),
      cncBlackAluminumMat
    );
    propGroup.add(hubMesh);

    // Foldable Carbon Blade 1 (Curved airfoil camber)
    const bladeGeo = new THREE.BoxGeometry(0.22, 0.024, 1.6);
    bladeGeo.translate(0, 0, 0.8);
    const blade1 = new THREE.Mesh(bladeGeo, carbonBladeMat);
    blade1.rotation.y = 0.09; // aerodynamic pitch
    propGroup.add(blade1);

    // Foldable Carbon Blade 2
    const blade2 = new THREE.Mesh(bladeGeo, carbonBladeMat);
    blade2.rotation.y = Math.PI + 0.09;
    propGroup.add(blade2);

    // Realistic high-speed rotor blur disc with aerodynamic fade
    const blurDiscGeo = new THREE.RingGeometry(0.25, 1.7, 32);
    blurDiscGeo.rotateX(-Math.PI / 2);
    const blurDiscMat = new THREE.MeshBasicMaterial({
      color: 0x223528,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const blurDisc = new THREE.Mesh(blurDiscGeo, blurDiscMat);
    propGroup.add(blurDisc);

    armGroup.add(propGroup);

    // Precision Aviation Strobe LEDs
    const ledGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const isPort = (i === 1 || i === 2); // Left red, Right green
    const ledMat = new THREE.MeshBasicMaterial({
      color: isPort ? 0xFF2E2E : 0x00FF88
    });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, -0.05, armLength + 0.25);
    armGroup.add(ledMesh);

    droneRoot.add(armGroup);

    rotorAssemblies.push({
      group: propGroup,
      dir: i % 2 === 0 ? 1 : -1,
      speed: 42.0
    });
  }

  // 7. Underslung Gyro-Gimbal & LiDAR Sensor Pod (Image 1 reference!)
  const gimbalGroup = new THREE.Group();
  gimbalGroup.position.set(0, -0.58, 0.25);
  bodyGroup.add(gimbalGroup);

  // Gimbal 3-axis yoke
  const yokeMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.14, 16),
    cncBlackAluminumMat
  );
  gimbalGroup.add(yokeMesh);

  // LiDAR Core Housing
  const lidarHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.28, 0.42, 20),
    stealthShellMat
  );
  lidarHousing.position.y = -0.28;
  gimbalGroup.add(lidarHousing);

  // Precision Optical Emerald Lens
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20),
    new THREE.MeshBasicMaterial({ color: 0x00FF88 })
  );
  lens.position.y = -0.5;
  gimbalGroup.add(lens);

  // 8. Volumetric LiDAR Scan Frustum / Cone (Image 1 visiting card aesthetic!)
  const coneHeight = 18.0;
  const coneRadius = 11.0;
  const coneGeo = new THREE.ConeGeometry(coneRadius, coneHeight, 36, 18, true);
  coneGeo.translate(0, -coneHeight / 2, 0);

  const coneMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x00FF88) },
      uOpacity: { value: 0.38 }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;
      void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        float heightFactor = clamp(-vPosition.y / 18.0, 0.0, 1.0);
        
        // Dynamic scan pulse traveling downward along the cone
        float ring = fract(heightFactor * 5.5 - uTime * 3.2);
        float ringGlow = smoothstep(0.78, 1.0, ring) * 1.6;

        // Rotating vertical laser beam lines
        float angle = atan(vPosition.z, vPosition.x);
        float rays = fract(angle * 4.0 / 3.14159 + uTime * 2.2);
        float rayGlow = smoothstep(0.86, 1.0, rays) * 0.9;

        float alpha = (0.16 + ringGlow * 0.45 + rayGlow * 0.3) * (1.0 - heightFactor * 0.25) * uOpacity;

        vec3 col = uColor + vec3(0.25, 0.25, 0.25) * ringGlow;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const lidarCone = new THREE.Mesh(coneGeo, coneMat);
  lidarCone.position.set(0, -0.5, 0);
  gimbalGroup.add(lidarCone);

  // Rotating laser sweep plane
  const sweepGeo = new THREE.PlaneGeometry(coneRadius * 1.8, coneHeight);
  sweepGeo.translate(0, -coneHeight / 2, 0);
  const sweepMat = new THREE.MeshBasicMaterial({
    color: 0x00FF88,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const sweepPlane = new THREE.Mesh(sweepGeo, sweepMat);
  gimbalGroup.add(sweepPlane);

  return {
    root: droneRoot,
    body: bodyGroup,
    rotors: rotorAssemblies,
    gimbal: gimbalGroup,
    lidarCone: lidarCone,
    sweepPlane: sweepPlane,

    setLidarActive(active) {
      lidarCone.visible = active;
      sweepPlane.visible = active;
    },

    update(delta, time, rotorSpeedMultiplier = 1.0) {
      for (const rotor of rotorAssemblies) {
        rotor.group.rotation.y += rotor.dir * rotor.speed * delta * rotorSpeedMultiplier;
      }
      coneMat.uniforms.uTime.value = time;
      sweepPlane.rotation.y += delta * 3.2;

      // Gyro gimbal pitch/roll stabilization
      gimbalGroup.rotation.x = Math.sin(time * 1.4) * 0.04;
      gimbalGroup.rotation.z = Math.cos(time * 1.1) * 0.03;
    }
  };
}
