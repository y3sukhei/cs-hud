export function averagePreviousPositions() {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (const [x, y, z, a] of this.previousPositions) {
    sumX += x;
    sumY += y;
    sumZ += z;
  }

  return [
    sumX / this.previousPositions.length,
    sumY / this.previousPositions.length,
    sumZ / this.previousPositions.length,
  ];
}

export function rememberPosition(gameObject) {
  const [x, y, z] = gameObject.position;

  this.previousPositions.push([x, y, z]);

  if (this.previousPositions.length > 16) {
    this.previousPositions.shift();
  }
}
