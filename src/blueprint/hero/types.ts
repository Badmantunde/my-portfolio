/** A hero renderer that shows the frame for a given construction progress (0 = blank canvas, 1 = finished blueprint). */
export interface FrameRenderer {
  setProgress(progress: number): void
}
