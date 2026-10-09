import * as THREE from 'three';
import { createTerrain } from './terrain.js';
import { createDrone } from './drone.js';
import { FlightDynamics } from './flightPhysics.js';
import { DroneAudioEngine } from './audio.js';

// DOM Elements
const canvas = document.getElementById('webgl-canvas');
const mainGlassCard = document.getElementById('main-glass-card');
const waitlistForm = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email-input');
const formStatus = document.getElementById('form-status');
const btnSound = document.getElementById('btn-sound');
const soundIcon = document.getElementById('sound-icon');
const telemetryStatus = document.getElementById('telemetry-status');

// 1. Scene, Cinematic Camera & WebGL Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020503);
scene.fog = new THREE.FogExp2(0x020503, 0.016);

const camera = new THREE.PerspectiveCamera(
  46,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Camera positioned to give a deep, expansive panoramic view of mountain terrain & hero drone
camera.position.set(0, 10, 24);
camera.lookAt(0, 4.5, 0);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

// 2. Realistic Studio & Environmental Lighting
const ambientLight = new THREE.AmbientLight(0x061e12, 1.4);
scene.add(ambientLight);

const mainSun = new THREE.DirectionalLight(0xe8fff0, 2.8);
mainSun.position.set(16, 28, 18);
scene.add(mainSun);

const rimLight = new THREE.DirectionalLight(0x00E676, 1.8);
rimLight.position.set(-18, 12, -14);
scene.add(rimLight);

// 3. Terrain & Drone
const terrain = createTerrain();
scene.add(terrain.group);

const drone = createDrone();
scene.add(drone.root);

// 4. Flight Dynamics & Evasion System
const flight = new FlightDynamics(drone, camera);
const audioEngine = new DroneAudioEngine();

// Evasion status updates
flight.onStateChange = (isEvading) => {
  if (isEvading) {
    if (telemetryStatus) {
      telemetryStatus.textContent = 'AUTONOMOUS COLLISION AVOIDANCE // EVADING';
      telemetryStatus.classList.add('evading');
    }
    audioEngine.playEvasionChime();
  } else {
    if (telemetryStatus) {
      telemetryStatus.textContent = 'LiDAR PATROL // ACTIVE';
      telemetryStatus.classList.remove('evading');
    }
  }
};

// 5. User Interaction Listeners
window.addEventListener('pointermove', (e) => {
  flight.setMouseScreen(e.clientX, e.clientY);

  // Subtle luxury 3D tilt on center card
  if (mainGlassCard && window.innerWidth > 768) {
    const cardRect = mainGlassCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const tiltX = (e.clientY - cardCenterY) * -0.012;
    const tiltY = (e.clientX - cardCenterX) * 0.012;
    mainGlassCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
  }
});

// Sound Toggle
if (btnSound) {
  btnSound.addEventListener('click', () => {
    const enabled = audioEngine.toggle();
    btnSound.classList.toggle('active', enabled);
    soundIcon.textContent = enabled ? 'AUDIO ON' : 'AUDIO OFF';
  });
}

// Early Access Waitlist
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    formStatus.textContent = `ACCESS RESERVED // ${email.toUpperCase()}`;
    formStatus.classList.add('show');
    emailInput.value = '';

    setTimeout(() => {
      formStatus.classList.remove('show');
    }, 5000);
  });
}

// Responsive Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 6. Smooth Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.06);
  const elapsedTime = clock.getElapsedTime();

  // Update drone flight dynamics and evasion physics
  const flightTelemetry = flight.update(delta, elapsedTime);

  // Update drone model (spinning props, LiDAR scan pulse)
  drone.update(delta, elapsedTime, flightTelemetry.rotorSpeed);

  // Update dynamic terrain rolling elevation and LiDAR spot reception
  terrain.update(elapsedTime, drone.root.position, true);

  // Audio motor frequency tracking
  audioEngine.update(flightTelemetry.rotorSpeed, flightTelemetry.isEvading);

  // Gentle, cinematic camera motion
  const camX = Math.sin(elapsedTime * 0.18) * 1.5;
  const camY = 10.0 + Math.cos(elapsedTime * 0.22) * 0.6;
  camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, delta * 2.0);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, delta * 2.0);
  camera.lookAt(0, 4.5, 0);

  renderer.render(scene, camera);
}

// Start rendering
animate();
