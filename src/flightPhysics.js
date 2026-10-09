import * as THREE from 'three';

/**
 * High-performance aerodynamic flight dynamics & mouse evasion engine.
 * Computes realistic multirotor inertia, tilt banking, altitude stabilization,
 * and agile collision avoidance / evasion response when cursor approaches.
 */
export class FlightDynamics {
  constructor(droneObj, camera) {
    this.drone = droneObj;
    this.camera = camera;

    // Position & kinematics (prominent hero position in upper quadrant)
    this.position = new THREE.Vector3(7.5, 7.0, 5.0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);

    // Target waypoint for ambient survey patrol
    this.patrolCenter = new THREE.Vector3(7.0, 6.8, 4.0);
    this.targetPos = new THREE.Vector3().copy(this.position);

    // Rotational dynamics (Pitch, Roll, Yaw)
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.targetPitch = 0;
    this.targetRoll = 0;
    this.targetYaw = 0;

    // Mouse tracking & screen projection
    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      screenPos: new THREE.Vector2(0, 0),
      isHovering: false,
      worldRayPoint: new THREE.Vector3(0, 0, 0)
    };

    // Evasion state
    this.isEvading = false;
    this.evasionIntensity = 0.0;
    this.evasionCooldown = 0;
    this.rotorRpmMultiplier = 1.0;

    // Flight boundary box to keep the drone in frame
    this.bounds = {
      minX: -26,
      maxX: 26,
      minY: 4.5,
      maxY: 13.5,
      minZ: -12,
      maxZ: 14
    };

    // State listeners for HUD
    this.onStateChange = null;

    this.drone.root.position.copy(this.position);
    this.raycaster = new THREE.Raycaster();
    this.flightPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -7.5);
  }

  setMouseScreen(clientX, clientY) {
    this.mouse.x = clientX;
    this.mouse.y = clientY;
    this.mouse.screenPos.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.screenPos.y = -(clientY / window.innerHeight) * 2 + 1;
    this.mouse.isHovering = true;
  }

  update(delta, time) {
    // 1. Calculate projected 2D screen position of the drone
    const droneScreen = this.position.clone().project(this.camera);
    const screenPixelX = ((droneScreen.x + 1) * window.innerWidth) / 2;
    const screenPixelY = ((-droneScreen.y + 1) * window.innerHeight) / 2;

    const dxPix = this.mouse.x - screenPixelX;
    const dyPix = this.mouse.y - screenPixelY;
    const pixelDist = Math.hypot(dxPix, dyPix);

    // 2. Project mouse ray into 3D space on the flight plane
    this.raycaster.setFromCamera(this.mouse.screenPos, this.camera);
    const planeIntersect = new THREE.Vector3();
    const hasIntersect = this.raycaster.ray.intersectPlane(this.flightPlane, planeIntersect);

    // Threat detection radius (in screen pixels and 3D world units)
    const evasionThresholdPixels = 240;
    const evasionThreshold3D = 14.0;
    const worldDist = hasIntersect ? this.position.distanceTo(planeIntersect) : 999;

    const threatDetected = (pixelDist < evasionThresholdPixels) || (worldDist < evasionThreshold3D);

    // 3. Evasion Physics vs Ambient Patrol
    if (threatDetected && this.mouse.isHovering) {
      if (!this.isEvading) {
        this.isEvading = true;
        if (this.onStateChange) this.onStateChange(true, pixelDist);
      }
      this.evasionCooldown = 1.4; // seconds to stay alert before returning to calm

      // Calculate Repulsion vector away from the threat
      const repulsion3D = new THREE.Vector3();
      if (hasIntersect) {
        repulsion3D.subVectors(this.position, planeIntersect);
        repulsion3D.y += 3.5; // upward lift dodge
      } else {
        repulsion3D.set(-dxPix, -dyPix, 0).normalize();
      }

      // If too close, ensure strong escape impulse
      const escapeForce = Math.max(28.0, (1.0 - Math.min(pixelDist / evasionThresholdPixels, 1.0)) * 65.0);
      repulsion3D.normalize().multiplyScalar(escapeForce);

      // Add lateral bank evasion so it darts sideways gracefully
      const lateralEvasion = new THREE.Vector3(-repulsion3D.z, 0, repulsion3D.x).multiplyScalar(0.4);
      repulsion3D.add(lateralEvasion);

      this.acceleration.add(repulsion3D);
      this.evasionIntensity = Math.min(this.evasionIntensity + delta * 4.0, 1.0);
      this.rotorRpmMultiplier = 1.8 + this.evasionIntensity * 0.8;

    } else {
      if (this.evasionCooldown > 0) {
        this.evasionCooldown -= delta;
      } else if (this.isEvading) {
        this.isEvading = false;
        if (this.onStateChange) this.onStateChange(false, pixelDist);
      }

      this.evasionIntensity = Math.max(this.evasionIntensity - delta * 1.5, 0.0);
      this.rotorRpmMultiplier = THREE.MathUtils.lerp(this.rotorRpmMultiplier, 1.0, delta * 3.0);

      // Ambient Autonomous Survey Flight Path (prominently framed in upper survey quadrant)
      const patrolSpeed = 0.32;
      this.targetPos.x = 7.0 + Math.sin(time * patrolSpeed) * 6.5;
      this.targetPos.z = 4.5 + Math.cos(time * patrolSpeed * 0.75) * 4.0;
      this.targetPos.y = 7.2 + Math.sin(time * 0.9) * 0.7 + Math.cos(time * 0.5) * 0.3;

      // Spring-damper force pulling drone gently toward patrol waypoint
      const toTarget = new THREE.Vector3().subVectors(this.targetPos, this.position);
      this.acceleration.add(toTarget.multiplyScalar(3.2));
    }

    // Boundary Repulsion: soft elastic bounce inside camera view bounds
    const margin = 4.0;
    if (this.position.x < this.bounds.minX + margin) this.acceleration.x += 45.0;
    if (this.position.x > this.bounds.maxX - margin) this.acceleration.x -= 45.0;
    if (this.position.y < this.bounds.minY + margin) this.acceleration.y += 35.0;
    if (this.position.y > this.bounds.maxY - margin) this.acceleration.y -= 35.0;
    if (this.position.z < this.bounds.minZ + margin) this.acceleration.z += 40.0;
    if (this.position.z > this.bounds.maxZ - margin) this.acceleration.z -= 40.0;

    // Aerodynamic Drag & Integration
    const drag = this.isEvading ? 2.4 : 3.8;
    this.velocity.addScaledVector(this.acceleration, delta);
    this.velocity.multiplyScalar(Math.exp(-drag * delta));
    this.position.addScaledVector(this.velocity, delta);

    // Reset acceleration for next frame
    this.acceleration.set(0, 0, 0);

    // 4. Multirotor Aerodynamic Tilt Banking
    // Multi-rotors bank into their acceleration:
    // Pitching down when accelerating forward (-Z), rolling right when accelerating right (+X)
    const targetPitch = -this.velocity.z * 0.055;
    const targetRoll = -this.velocity.x * 0.055;

    // Drone yaw faces velocity direction or survey focus
    let targetYaw = this.targetYaw;
    if (this.velocity.length() > 0.8) {
      targetYaw = Math.atan2(this.velocity.x, this.velocity.z) * 0.4;
    }

    // Natural hover wind bobbing
    const hoverWobbleX = Math.sin(time * 3.2) * 0.03;
    const hoverWobbleZ = Math.cos(time * 2.8) * 0.03;

    this.drone.root.rotation.x = THREE.MathUtils.lerp(this.drone.root.rotation.x, targetPitch + hoverWobbleX, delta * 7.0);
    this.drone.root.rotation.z = THREE.MathUtils.lerp(this.drone.root.rotation.z, targetRoll + hoverWobbleZ, delta * 7.0);
    this.drone.root.rotation.y = THREE.MathUtils.lerp(this.drone.root.rotation.y, targetYaw, delta * 4.0);

    // Apply 3D position
    this.drone.root.position.copy(this.position);

    return {
      isEvading: this.isEvading,
      rotorSpeed: this.rotorRpmMultiplier,
      velocity: this.velocity.length(),
      altitude: this.position.y * 18.5 // simulated real-world altitude meters
    };
  }
}
