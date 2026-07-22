export interface FloatingPosition {
  x: number;
  y: number;
  duration: number;
  delay: number;
  distance: number;
  rotation: number;
}

export function generateFloatingLayout(count: number): FloatingPosition[] {
  const columns = 4;
  const horizontalSpacing = 22;
  const verticalSpacing = 18;

  const positions: FloatingPosition[] = [];

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;

    const offset = row % 2 === 0 ? 0 : horizontalSpacing / 2;

    positions.push({
      x:
        15 +
        col * horizontalSpacing +
        offset +
        (Math.random() - 0.5) * 4,

      y:
        15 +
        row * verticalSpacing +
        (Math.random() - 0.5) * 3,

      duration: 4 + Math.random() * 3,

      delay: Math.random() * 2,

      distance: 4 + Math.random() * 8,

      rotation: Math.random() * 16 - 8,
    });
  }

  return positions;
}