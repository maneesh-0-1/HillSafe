export type AnalyticalLayer = 'elevation' | 'slope' | 'drainage' | 'boundary' | 'delta';

export interface SceneStage {
  id: string;
  number: string;
  scrollStart: number;
  scrollEnd: number;
  headline: string;
  subheadline: string;
  tagline?: string;
  badge?: string;
  description: string;
}

export interface DroneComponentAnnotation {
  id: string;
  name: string;
  spec: string;
  position: [number, number, number];
  description: string;
}

export interface FieldTestData {
  title: string;
  location: string;
  coverageArea: string;
  flightAltitude: string;
  flightTime: string;
  capturedFrames: number;
  groundSamplingDistance: string;
  reconstructionPoints: string;
  validationStatus: string;
}
