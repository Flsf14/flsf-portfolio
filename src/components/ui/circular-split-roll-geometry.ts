/** Geometry adapted from the owner's circular-split-roll.tsx reference. */
export function wrapProgress(value: number) {
  return ((value % 1) + 1) % 1;
}

export function getCircularPosition(progress: number, radiusX: number, radiusY: number, angleOffset = 0) {
  const angle = progress * Math.PI * 2 + angleOffset;
  return {
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    horizontalDepth: Math.sin(angle),
  };
}

export function shapeFocus(strength: number, start = .45, power = 3.2) {
  return Math.pow(Math.max(0, Math.min(1, (strength - start) / (1 - start))), power);
}

export function circularSplitRollPosition(index: number, position: number, total: number, radius: number) {
  // Align the first card with the left focus arc rather than between two cards.
  const point = getCircularPosition(wrapProgress((index - position) / total), radius, radius, -Math.PI / 2);
  const strength = Math.max(0, Math.min(1, (-point.horizontalDepth + 1) / 2));
  const focus = shapeFocus(strength);
  return {
    x: point.x,
    y: point.y,
    scale: .58 + (1 - .58) * focus,
    opacity: .14 + (1 - .14) * focus,
    zIndex: Math.round(1 + (40 - 1) * focus),
  };
}
