import { DroneComponentAnnotation, FieldTestData, SceneStage } from './types';

export const SITE_METADATA = {
  title: 'Hill Safe | Drone-Based Site & Terrain Intelligence',
  description:
    'Hill Safe is developing drone-based site intelligence technology for construction, infrastructure and terrain analysis using aerial imaging, 3D reconstruction and physics-informed AI.',
  coordinates: '17.3850° N, 78.4867° E',
  elevationDatum: 'MSL +542.4 m',
  eventVenue: 'YASHOBHOOMI, NEW DELHI',
  eventDates: '7–10 OCTOBER 2026',
  eventName: 'INDIA MOBILE CONGRESS 2026',
  disclaimer:
    "Hill Safe's current outputs are intended for research, prototyping and preliminary site intelligence. They should not be treated as a substitute for certified surveying, geotechnical investigation, engineering design or regulatory approvals.",
};

export const ROADMAP_STAGES = [
  { label: 'CONCEPT', status: 'completed' },
  { label: 'PROTOTYPE', status: 'completed' },
  { label: 'FIELD VALIDATION', status: 'completed' },
  { label: 'EARLY DATA PIPELINE', status: 'completed' },
  { label: 'PILOT DEPLOYMENT', status: 'in-progress' },
  { label: 'AI INTELLIGENCE LAYER', status: 'upcoming' },
  { label: 'SCALABLE PLATFORM', status: 'upcoming' },
] as const;

export const DRONE_ANNOTATIONS: DroneComponentAnnotation[] = [
  {
    id: 'airframe',
    name: 'CARBON COMPOSITE MONOCOQUE',
    spec: 'Toray T800 Carbon Fiber • IP55 Ingress Protection',
    position: [0, 0.4, 0],
    description: 'Ultra-rigid, lightweight aerospace chassis engineered for high-altitude turbulence and steep gradient thermal currents.',
  },
  {
    id: 'propulsion',
    name: 'HIGH-TORQUE PROPULSION SYSTEM',
    spec: '4x FOC Sinusoidal ESCs • 28-inch Folding Carbon Props',
    position: [1.8, 0.2, 1.8],
    description: 'Redundant coaxial-ready motor mounts providing high climb authority and station-keeping in complex hilly microclimates.',
  },
  {
    id: 'sensor-pod',
    name: 'MULTI-MODAL PAYLOAD GIMBAL',
    spec: '3-Axis Gyro Stabilized • Dual Optical + LiDAR Array',
    position: [0, -0.6, 0.8],
    description: 'Synchronized high-resolution global shutter aerial sensor with multi-pulse LiDAR profiling unit.',
  },
  {
    id: 'avionics',
    name: 'FLIGHT COMPUTER & RTK-GNSS',
    spec: 'Triple Redundant IMU • Dual RTK Multi-Constellation',
    position: [0, 0.8, -0.4],
    description: 'Centimeter-precision differential positioning with onboard edge compute for telemetry verification.',
  },
  {
    id: 'power',
    name: 'QUICK-SWAP SOLID-STATE POWER',
    spec: '22.8V 30,000mAh • Dual Channel Smart BMS',
    position: [0, -0.4, -0.8],
    description: 'Hot-swappable high-energy-density pack supporting repeat continuous mapping sorties.',
  },
];

export const FIELD_TEST_DATA: FieldTestData = {
  title: 'FIELD VALIDATION EXPEDITION — ALPHA 01',
  location: 'Tier-1 Valley Construction Corridor, Telangana',
  coverageArea: '22 ACRES (89,030 m²)',
  flightAltitude: '85 METERS AGL',
  flightTime: '24 MINS 18 SECS',
  capturedFrames: 428,
  groundSamplingDistance: '2.14 cm / pixel',
  reconstructionPoints: '18,450,210 Spatial Points',
  validationStatus: 'COMPLETED & BENCHMARKED',
};

export const APPLICATION_MODULES = [
  {
    id: '01',
    title: 'CONSTRUCTION SITE INTELLIGENCE',
    badge: 'ACTIVE PROTOTYPE',
    description:
      'Continuous volumetric verification, cut-and-fill tracking, and aerial spatial baseline mapping for complex engineering sites.',
    features: ['Aerial site mapping', 'Construction progress audits', 'Terrain visualization', 'Repeat multi-date capture'],
  },
  {
    id: '02',
    title: 'TERRAIN & SITE ASSESSMENT',
    badge: 'FIELD VALIDATED',
    description:
      'Preliminary topographical evaluation to detect natural gradients, hydrological runoffs, and steep geomorphic features before ground breaking.',
    features: ['High-density elevation models', 'Slope gradient profiling', 'Surface drainage flow vectors', 'Digital surface modeling'],
  },
  {
    id: '03',
    title: 'INFRASTRUCTURE MONITORING',
    badge: 'PILOT TESTING',
    description:
      'Linear corridor inspection over mountain roads, retaining assets, and slope-adjacent transport networks through repeatable aerial passes.',
    features: ['Repeat autonomous flight paths', 'Physical site change tracking', 'Corridor elevation profiles', 'Asset perimeter scans'],
  },
  {
    id: '04',
    title: 'HILL & MOUNTAIN RISK INTELLIGENCE',
    badge: 'R&D DIRECTION',
    description:
      'Long-term research combining geospatial point clouds with physics-informed geomechanical models for terrain behavior comprehension.',
    features: ['Physics-Informed Neural Networks', 'Rainfall-induced stress models', 'Geotechnical baseline research', 'Slope stability dynamics'],
  },
];

export const SCENE_STAGES: SceneStage[] = [
  {
    id: 'scene-01',
    number: '01',
    scrollStart: 0,
    scrollEnd: 0.12,
    headline: 'Turning Physical Landscapes into Digital Site Intelligence.',
    subheadline:
      'Hill Safe is developing drone-based technology for mapping, monitoring and analysing terrain and construction sites through aerial imaging, 3D reconstruction and physics-informed intelligence.',
    badge: 'EARLY-STAGE FIELD VALIDATION',
    description: 'Start with raw physical terrain. Follow the transformation into digital spatial intelligence.',
  },
  {
    id: 'scene-02',
    number: '02',
    scrollStart: 0.12,
    scrollEnd: 0.25,
    headline: 'THE DRONE PLATFORM',
    subheadline: 'A purpose-engineered aerial capture system built for complex elevation and wind currents.',
    tagline: 'PHYSICAL CAPTURE SYSTEM',
    description: 'Modular carbon airframe designed for high-resolution photogrammetric capture and precision sensor payload deployment.',
  },
  {
    id: 'scene-03',
    number: '03',
    scrollStart: 0.25,
    scrollEnd: 0.38,
    headline: 'CAPTURE',
    subheadline: 'The physical site becomes multi-perspective aerial data.',
    tagline: 'IMAGE CAPTURE & OVERLAPPING TILES',
    description: 'Systematic aerial passes generate hundreds of overlapping nadir and oblique frames covering every elevation contour.',
  },
  {
    id: 'scene-04',
    number: '04',
    scrollStart: 0.38,
    scrollEnd: 0.52,
    headline: 'MAP',
    subheadline: 'Aerial imagery is processed into spatial representations of the physical site.',
    tagline: 'PHOTOGRAMMETRY & POINT CLOUD',
    description: 'Dense keypoint extraction transforms discrete camera frames into millions of spatially indexed 3D coordinate points.',
  },
  {
    id: 'scene-05',
    number: '05',
    scrollStart: 0.52,
    scrollEnd: 0.68,
    headline: 'ANALYSE',
    subheadline: 'Terrain characteristics become measurable, multi-dimensional intelligence layers.',
    tagline: 'TERRAIN INTELLIGENCE LAYERS',
    description: 'Extract elevation contours, slope gradients, hydrological runoffs, and physical site boundaries.',
  },
  {
    id: 'scene-06',
    number: '06',
    scrollStart: 0.68,
    scrollEnd: 0.80,
    headline: 'PHYSICS-INFORMED INTELLIGENCE',
    subheadline: 'Combining data-driven learning with physical laws governing terrain and environmental behaviour.',
    tagline: 'R&D / UNDER DEVELOPMENT',
    badge: 'RESEARCH INITIATIVE',
    description: 'Hill Safe is researching Physics-Informed Neural Networks (PINNs) to bridge empirical computer vision with soil and slope mechanics.',
  },
  {
    id: 'scene-07',
    number: '07',
    scrollStart: 0.80,
    scrollEnd: 0.88,
    headline: 'From Prototype to Field',
    subheadline: 'Evaluating real-world capture and 3D reconstruction over an active 22-acre site.',
    tagline: '22-ACRE CONSTRUCTION FIELD TEST',
    description: 'Field benchmark testing of flight coverage, sensor exposure, ground sampling distance, and dense point cloud synthesis.',
  },
  {
    id: 'scene-08',
    number: '08',
    scrollStart: 0.88,
    scrollEnd: 0.93,
    headline: 'EXPLORE OUR DATA',
    subheadline: 'Interactive comparative analysis: Real site imagery versus digital spatial reconstruction.',
    tagline: 'PRECISION COMPARISON SLIDER',
    description: 'Drag the split-slider to inspect raw orthomosaic data against dense 3D elevation mesh geometry.',
  },
  {
    id: 'scene-09',
    number: '09',
    scrollStart: 0.93,
    scrollEnd: 0.96,
    headline: 'APPLICATIONS',
    subheadline: 'Purpose-built site intelligence workflows across civil, terrain, and infrastructure operations.',
    tagline: 'MODULAR DEPLOYMENT PATHS',
    description: 'Four vertical pathways delivering actionable insight to project engineers and field directors.',
  },
  {
    id: 'scene-10',
    number: '10',
    scrollStart: 0.96,
    scrollEnd: 0.98,
    headline: 'WHY HILL SAFE',
    subheadline: 'The complete cyber-physical system: Aerial Hardware + 3D Reconstruction + Domain Physics.',
    tagline: 'UNIFIED ARCHITECTURE',
    description: 'Closing the loop between physical drone operations and deep geospatial intelligence.',
  },
  {
    id: 'scene-11',
    number: '11',
    scrollStart: 0.98,
    scrollEnd: 1.0,
    headline: 'Drone-Based Intelligence for the Physical World.',
    subheadline: 'Drone-based site intelligence for a safer, more measurable physical world.',
    tagline: 'ENGAGE WITH HILL SAFE',
    description: 'Meet our engineering team at India Mobile Congress 2026 or request a preliminary site capture assessment.',
  },
];
