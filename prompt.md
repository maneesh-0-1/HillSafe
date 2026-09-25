# HILL SAFE — IMMERSIVE 3D SCROLLTELLING WEBSITE MASTER PROMPT

## ROLE

Act as an elite Creative Technologist, Senior Product Designer, Creative Frontend Engineer, and 3D Web Experience Director.

Design and build a premium, cinematic, technically credible website for **Hill Safe**, an early-stage deep-tech startup developing drone-based site intelligence technology.

The experience should feel closer to a combination of:

* Apple product storytelling
* premium aerospace / engineering visualization
* high-end geospatial software
* cinematic technical documentaries
* modern deep-tech startup interfaces

Do NOT make this look like a generic drone company website.

Do NOT make it feel like a template.

Do NOT make it look like an AI-generated “future technology” website.

The website should feel deliberately designed by a strong creative technology studio.

---

# CORE WEBSITE IDEA

The entire website should visually communicate one transformation:

**PHYSICAL WORLD → CAPTURE → DATA → 3D → ANALYSIS → INTELLIGENCE**

The central storytelling device is a persistent 3D Hill Safe drone and terrain system.

The user should feel like they are following the journey of a real physical site through Hill Safe's technology.

The 3D model is not decoration.

The 3D model IS the explanation.

---

# IMPORTANT PRODUCT POSITIONING

Hill Safe is currently an early-stage prototype / field-validation technology.

The website must communicate ambition without making unsupported claims.

Current story:

**Drone-based site intelligence**

Current capabilities include:

* aerial site capture
* preliminary 3D reconstruction
* terrain visualization
* elevation information
* slope analysis
* site monitoring / repeat capture
* early data processing workflows

Future / R&D direction:

* deeper terrain analysis
* environmental intelligence
* Physics-Informed Neural Networks
* terrain-risk intelligence

Never represent future capabilities as already commercially validated.

Avoid claims such as:

* survey-grade accuracy
* certified surveying
* landslide prediction
* real-time terrain intelligence
* replacement for geotechnical investigation
* replacement for professional surveying
* production-ready AI risk prediction

Use language such as:

* developing
* prototype
* early-stage
* preliminary
* research
* under validation
* R&D
* future direction

---

# TECH STACK

Framework:
Next.js 14+ / App Router

Language:
TypeScript

UI:
React + Tailwind CSS

3D:
Three.js
React Three Fiber
@react-three/drei

3D assets:
GLTF / GLB

Compression:
Draco where appropriate

Animation:
GSAP + ScrollTrigger

Smooth scrolling:
Lenis

Use GSAP ScrollTrigger for major scroll-driven 3D timelines.

Use interpolation / lerp smoothing to prevent mechanical movement.

Post-processing:
Subtle bloom
Ambient occlusion
Depth of field where useful
Selective screen-space effects

Do not overuse post-processing.

Performance is more important than visual gimmicks.

---

# DESIGN LANGUAGE

## Overall mood

Deep-tech.

Cinematic.

Precise.

Industrial.

Geospatial.

Premium.

Quiet confidence.

The website should feel expensive without being flashy.

Primary background:

Near-black / charcoal.

Secondary:

White / off-white.

Accent:

Electric terrain green.

Optional secondary accent:

Digital blue.

Avoid making the website overly green.

Green should appear primarily as an analytical/data accent.

---

# TYPOGRAPHY

Headings:

Space Grotesk

Body:

Inter

Technical metadata:

Monospace font

Use very large typography sparingly.

Typography should feel editorial and architectural rather than “tech startup”.

Examples:

CAPTURE

MAP

ANALYSE

UNDERSTAND

22 ACRES

FIELD VALIDATION

PHYSICS-INFORMED INTELLIGENCE

---

# UI LANGUAGE

Use:

* small technical labels
* coordinates
* thin divider lines
* subtle grids
* contour lines
* data readouts
* restrained glass panels
* small status indicators
* technical annotations
* minimal navigation

Avoid:

* excessive glassmorphism
* neon cyberpunk
* excessive glowing cards
* rounded SaaS cards everywhere
* huge gradients
* generic AI illustrations
* random 3D objects
* unnecessary floating elements

Every UI element should support the story.

---

# NAVIGATION

Minimal fixed navigation.

Left:

HILL SAFE

Right:

Technology
Applications
Prototype
About
Contact

Navigation should remain readable over the 3D canvas.

Use a subtle transparent/blurred background only when required for readability.

---

# HERO / SCENE 01

## 0–12% SCROLL

Start in almost complete darkness.

A faint technical grid exists in the background.

Very subtle coordinates appear.

Example:

17.3850° N
78.4867° E

The Hill Safe drone gradually emerges from darkness.

The drone should slowly rotate in a cinematic three-quarter view.

Do not start with a generic stock drone photograph.

If the actual Hill Safe drone 3D asset is provided, use it.

If not, structure the implementation so the final GLB can be dropped in without rebuilding the scene.

Hero typography:

# Turning Physical Landscapes into Digital Site Intelligence.

Supporting copy:

Hill Safe is developing drone-based technology for mapping, monitoring and analysing terrain and construction sites through aerial imaging, 3D reconstruction and physics-informed intelligence.

Primary CTA:

Explore the Technology

Secondary CTA:

See Our Prototype

At the bottom:

SCROLL TO EXPLORE

The hero should feel calm.

No excessive animation.

---

# SCENE 02 — THE DRONE

## 12–25% SCROLL

The drone becomes the primary focus.

Camera slowly moves closer.

The drone rotates.

Technical annotation points appear around the model.

Possible labels:

UAV PLATFORM

AERIAL IMAGING

DATA CAPTURE

SENSOR SYSTEM

FLIGHT SYSTEM

As scrolling continues, the drone begins an elegant exploded-view animation.

Separate components move away from the main body along controlled local axes.

Do not make the explosion chaotic.

The components should maintain spatial relationships.

The user should understand:

“This physical machine is how Hill Safe captures the world.”

Technical annotations should follow the actual 3D components using world-space to screen-space projection.

---

# SCENE 03 — CAPTURE

## 25–38% SCROLL

The exploded drone begins fading into the background.

The camera focuses on the imaging/sensor component.

Aerial image frames begin emerging from the sensor.

The frames should look like actual captured imagery rather than abstract particles.

Hundreds of image tiles can gradually form a visual stream.

Headline:

# CAPTURE

Supporting line:

The site becomes data.

Show a visual relationship:

DRONE

↓

AERIAL IMAGERY

↓

MULTIPLE SITE PERSPECTIVES

Technical labels can appear:

IMAGE CAPTURE

OVERLAPPING FRAMES

SITE COVERAGE

The imagery should visually travel toward the next scene.

---

# SCENE 04 — MAP

## 38–52% SCROLL

The captured image frames begin overlapping.

Feature points appear.

Thousands of spatial points begin forming.

The image data transforms into a point cloud.

The point cloud gradually becomes a 3D representation of terrain.

The camera moves through the transformation.

Headline:

# MAP

Supporting copy:

Aerial imagery is processed into spatial representations of the physical site.

Visual sequence:

IMAGES

→

FEATURES

→

POINT CLOUD

→

3D RECONSTRUCTION

→

TERRAIN

The transition should feel physically believable.

Do not simply fade one image into another.

Use actual geometry transformation wherever practical.

---

# SCENE 05 — TERRAIN INTELLIGENCE

## 52–68% SCROLL

The reconstructed terrain now fills the viewport.

The drone is no longer the main character.

The terrain is.

The camera moves slowly over the terrain.

Analytical layers appear one at a time.

First:

ELEVATION

Then:

SLOPE

Then:

DRAINAGE

Then:

SITE BOUNDARY

Then:

CHANGE OVER TIME

Each layer should have its own visual treatment.

Use contour lines.

Height information.

Subtle point-cloud overlays.

Technical grids.

Directional flow lines.

Avoid rainbow heatmaps.

Keep everything premium and restrained.

The text should explain what the system can currently observe.

Example:

# ANALYSE

Terrain characteristics become measurable layers.

---

# SCENE 06 — UNDERSTAND

## 68–80% SCROLL

The terrain pulls back into the centre.

Around it, environmental and physical inputs begin appearing.

Inputs:

TERRAIN

SLOPE

RAINFALL

SOIL PROPERTIES

HISTORICAL DATA

OBSERVED CONDITIONS

These inputs visually converge toward a central model.

Headline:

# PHYSICS-INFORMED INTELLIGENCE

Supporting copy:

Hill Safe is researching Physics-Informed Neural Networks to combine data-driven learning with physical relationships governing terrain and environmental behaviour.

Show:

PHYSICAL PARAMETERS

*

OBSERVED DATA

*

MACHINE LEARNING

↓

PHYSICS-INFORMED MODEL

↓

TERRAIN & STABILITY INTELLIGENCE

Clearly display:

R&D / UNDER DEVELOPMENT

Do not visually imply that predictive risk intelligence is already a validated commercial capability.

---

# SCENE 07 — FROM PROTOTYPE TO FIELD

## 80–88% SCROLL

Abruptly transition from the futuristic 3D environment into reality.

This transition is intentional.

Show:

22-ACRE CONSTRUCTION SITE

FIELD TEST 01

Then use real Hill Safe material.

Priority order:

1. Actual drone footage
2. Actual aerial imagery
3. Actual processed frames
4. Actual 3D reconstruction
5. Actual terrain output

The real material should feel documentary rather than like a marketing slideshow.

Headline:

# From Prototype to Field

Supporting copy:

Hill Safe conducted an early field test over a 22-acre construction site to evaluate aerial data capture, image processing and 3D reconstruction workflows.

Use small labels:

RAW CAPTURE

PROCESSED FRAMES

3D RECONSTRUCTION

TERRAIN VISUALISATION

PROTOTYPE OUTPUT

EARLY-STAGE RECONSTRUCTION

RESEARCH DEMONSTRATION

---

# SCENE 08 — EXPLORE OUR DATA

## 88–93% SCROLL

Create an interactive comparison interface.

Primary interaction:

REAL SITE

↔

DIGITAL SITE

Use a draggable vertical slider.

Left:

Original aerial image

Right:

3D reconstruction

Then another comparison:

3D MODEL

↔

TERRAIN ANALYSIS

The interaction should feel like a professional geospatial visualization tool.

This section is extremely important.

It proves that Hill Safe is working with actual spatial data rather than simply talking about drones.

---

# SCENE 09 — APPLICATIONS

## 93–96% SCROLL

The terrain model expands into four application paths.

01

CONSTRUCTION SITE INTELLIGENCE

Site mapping
Construction progress
Terrain visualization
Repeat monitoring

02

TERRAIN & SITE ASSESSMENT

Elevation
Slope
Drainage
Terrain visualization

03

INFRASTRUCTURE MONITORING

Repeat aerial capture
Physical site change tracking

04

HILL & MOUNTAIN RISK INTELLIGENCE

Long-term development direction

Do not present future capabilities as currently validated services.

---

# SCENE 10 — WHY HILL SAFE

## 96–98% SCROLL

Return to a clean dark environment.

Bring the drone back together.

The exploded components from earlier should now smoothly return to their original positions.

The drone becomes whole again.

Around it:

DRONE-FIRST

MODULAR

PHYSICS + AI

BUILT FOR DIFFICULT TERRAIN

CONTINUOUS INTELLIGENCE

The reassembly should symbolise the complete Hill Safe system.

The physical machine + digital intelligence now become one system.

---

# SCENE 11 — FINAL CONVERSION

## 98–100% SCROLL

The drone slowly moves away.

The terrain remains.

The terrain becomes a digital representation.

Everything fades into darkness.

Large final statement:

# Drone-based intelligence for the physical world.

Then:

HILL SAFE

Drone-based site intelligence for a safer, more measurable physical world.

Buttons:

Request a Site Assessment

Explore Technology

Then IMC banner:

SEE HILL SAFE AT IMC 2026

7–10 OCTOBER 2026
YASHOBHOOMI, NEW DELHI

Meet the team and explore our drone-based site intelligence technology.

---

# PROTOTYPE / DEVELOPMENT STATUS

Throughout the website, communicate Hill Safe's maturity honestly.

Create a subtle development indicator:

CONCEPT ✓

PROTOTYPE ✓

FIELD VALIDATION ✓

EARLY DATA PIPELINE ✓

PILOT DEPLOYMENT ○

AI INTELLIGENCE LAYER ○

SCALABLE PLATFORM ○

Label:

CURRENT STAGE
PROTOTYPE / FIELD VALIDATION

Do not make this look like a game progress bar.

It should feel like an engineering roadmap.

---

# 3D CAMERA BEHAVIOUR

The camera should behave as if controlled by a cinematographer.

Use:

* slow dolly movements
* controlled orbital movement
* smooth focal transitions
* occasional macro close-ups
* wide environmental shots
* deliberate depth-of-field shifts

Avoid:

* fast camera spins
* random rotations
* excessive parallax
* gaming-style camera movement
* constant motion

The user should always understand what they're looking at.

---

# 3D ANIMATION PRINCIPLES

Every animation must have a reason.

Examples:

Drone separates:

→ explains system components

Images emerge:

→ explains aerial capture

Images become point cloud:

→ explains reconstruction

Point cloud becomes terrain:

→ explains mapping

Terrain layers appear:

→ explains analysis

Environmental inputs converge:

→ explains future intelligence

Drone reassembles:

→ represents the complete Hill Safe system

Nothing should animate simply because it looks impressive.

---

# REAL ASSET PRIORITY

The final website should use approximately:

60–70% real Hill Safe material

wherever appropriate.

Prioritize:

* real drone photographs
* drone flight footage
* hardware photographs
* camera/sensor photographs
* 22-acre construction site footage
* aerial imagery
* processed frames
* 3D outputs
* terrain visualizations
* founder/team photographs

Do not replace real evidence with AI-generated visuals.

Temporary placeholders are acceptable during development, but structure the system so they can easily be replaced.

---

# PERFORMANCE

This is a high-end visual site, but performance is critical.

The website will potentially be accessed through QR codes at India Mobile Congress.

Mobile performance is therefore a first-class requirement.

Implement:

* lazy loading
* asset preloading only when needed
* compressed GLB files
* Draco compression
* optimized textures
* adaptive pixel ratio
* reduced post-processing on mobile
* reduced geometry on mobile
* reduced particle counts on mobile
* simplified camera movement on mobile
* intersection-based loading
* progressive media loading

Do not load a 20 MB hero video immediately.

---

# MOBILE EXPERIENCE

Do not simply shrink the desktop website.

Create a deliberate mobile experience.

On mobile:

* keep the main 3D story
* reduce model complexity
* simplify exploded views
* reduce camera movement
* reduce particles
* remove unnecessary post-processing
* prioritize typography and readable data
* maintain the narrative order

If the device is low-powered, gracefully degrade the 3D experience rather than causing dropped frames.

---

# ACCESSIBILITY

Provide:

* semantic HTML
* keyboard navigation
* visible focus states
* readable contrast
* reduced-motion support
* descriptive image alt text
* accessible buttons
* accessible form fields

If prefers-reduced-motion is enabled, replace complex scroll animation with clean transitions and static visual stages.

---

# SEO

Page title:

Hill Safe | Drone-Based Site & Terrain Intelligence

Meta description:

Hill Safe is developing drone-based site intelligence technology for construction, infrastructure and terrain analysis using aerial imaging, 3D reconstruction and physics-informed AI.

Do not keyword stuff.

---

# CONTENT ARCHITECTURE

Build the website so the homepage tells the full story, while supporting pages provide depth.

Primary pages:

Home

Technology

Applications

Prototype / Field Work

About

Insights / Updates

Contact

Optional:

Research & Development

The homepage should be the strongest experience.

---

# CONTACT

Final CTA:

# Let's map what matters.

Form fields:

Name

Company

Designation

Email

Phone

Project Location

Project Type

What are you looking for?

Options:

Site mapping

3D reconstruction

Construction monitoring

Terrain analysis

Research collaboration

Partnership

Investment

Other

CTA:

Talk to Hill Safe

Do not publish pricing.

---

# FOOTER

HILL SAFE

Drone-based site intelligence for a safer, more measurable physical world.

Navigation:

Home
Technology
Applications
Prototype
About
Contact

Social:

LinkedIn
Instagram
YouTube

Include the appropriate technical disclaimer:

Hill Safe's current outputs are intended for research, prototyping and preliminary site intelligence. They should not be treated as a substitute for certified surveying, geotechnical investigation, engineering design or regulatory approvals.

Copyright:

© 2026 Hill Safe Pvt. Ltd.

---

# CRITICAL CREATIVE RULE

Do not build this website as a collection of sections.

Build it as ONE CONTINUOUS STORY.

The user should feel that they are travelling through the Hill Safe system.

The visual continuity should be:

DRONE

↓

COMPONENTS

↓

CAMERA

↓

IMAGERY

↓

DATA

↓

POINT CLOUD

↓

3D TERRAIN

↓

ANALYSIS

↓

PHYSICS + AI

↓

REAL FIELD TEST

↓

APPLICATION

↓

COMPLETE SYSTEM

↓

HILL SAFE

The transitions between these stages are more important than individual section designs.

---

# FINAL CREATIVE DIRECTION

The finished website should make someone think:

“I understand what Hill Safe is.”

Then:

“They actually built and tested something.”

Then:

“I can see where the technology is going.”

Then:

“I want to talk to them.”

It should feel like a **deep-tech product experience**, not a corporate brochure.

The central visual metaphor is:

**A drone captures the physical world.
Hill Safe turns that captured reality into digital site intelligence.**

Build the entire experience around that idea.
