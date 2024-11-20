export type AnimationStep =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "code"; line: number };

export interface VisualizerProps {
  array: number[];
}
