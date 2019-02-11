export function applyQuaternion(v, q) {
  const x = v.x,
    y = v.y,
    z = v.z;
  const qx = q.x,
    qy = q.y,
    qz = q.z,
    qw = q.w;

  // calculate quat * vector

  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat

  const newX = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  const newY = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  const newZ = iz * qw + iw * -qz + ix * -qy - iy * -qx;

  return { x: newX, y: newY, z: newZ };
}

export function multiplyScalar(v, scalar) {
  const x = (v.x *= scalar);
  const y = (v.y *= scalar);
  const z = (v.z *= scalar);

  return { x, y, z };
}

export function addVectors(a, b) {
  const x = a.x + b.x;
  const y = a.y + b.y;
  const z = a.z + b.z;

  return { x, y, z };
}

export function distance(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
}
