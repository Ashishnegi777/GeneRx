import * as THREE from 'three';

export interface FilamentData {
  geometry: THREE.BufferGeometry;
}

export function generateFilamentGeometry(count: number = 2500): THREE.BufferGeometry {
  const pointsPerStrand = 48;
  const totalVertices = count * pointsPerStrand;
  const segmentsPerStrand = pointsPerStrand - 1;
  const totalIndices = count * segmentsPerStrand * 2;

  const posAArray = new Float32Array(totalVertices * 3);
  const posBArray = new Float32Array(totalVertices * 3);
  const progressArray = new Float32Array(totalVertices);
  const randArray = new Float32Array(totalVertices * 3);
  const indices = new Uint32Array(totalIndices);

  const numLobes = 11;
  let idxOffset = 0;

  for (let s = 0; s < count; s++) {
    // Strand unique properties
    const strandT = s / count;
    const strandAngle = strandT * Math.PI * 2;
    const strandSeed = Math.sin(s * 91.34) * 1000;
    const strandRadiusFrac = (s % 17) / 17; // depth inside bundle
    const strandRand1 = Math.abs(Math.sin(strandSeed * 1.1));
    const strandRand2 = Math.abs(Math.sin(strandSeed * 2.3));
    const strandRand3 = Math.abs(Math.sin(strandSeed * 3.7));

    // Parallel band micro-offset
    const microX = (strandRand1 - 0.5) * 0.04;
    const microY = (strandRand2 - 0.5) * 0.04;
    const microZ = (strandRand3 - 0.5) * 0.04;

    // --- 1. CHAOS GENERATION (Curl noise flow field inside blob with escaping loops) ---
    // Start inside a lumpy blob
    const theta0 = strandAngle + (strandRand1 - 0.5) * 0.8;
    const phi0 = Math.acos(2 * strandRand2 - 1);
    const r0 = 0.5 + Math.pow(strandRand3, 0.7) * 1.1; // radius ~0.5 to 1.6

    let cx = r0 * Math.sin(phi0) * Math.cos(theta0);
    let cy = r0 * Math.sin(phi0) * Math.sin(theta0);
    let cz = r0 * Math.cos(phi0) * 0.85;

    // Is this an escaping loop strand? (~15% of strands)
    const isEscaping = strandRand1 > 0.85;
    const escapeDirX = Math.cos(theta0) * 1.4;
    const escapeDirY = Math.sin(theta0) * 1.4;

    const chaosPoints: THREE.Vector3[] = [];
    const stepSize = 0.052;

    for (let p = 0; p < pointsPerStrand; p++) {
      chaosPoints.push(new THREE.Vector3(cx, cy, cz));

      // Calculate pseudo curl noise velocity
      const s1 = 1.35;
      const s2 = 2.6;
      let vx = Math.sin(s1 * cy + strandSeed * 0.01) + Math.cos(s1 * cz);
      let vy = Math.sin(s1 * cz + strandSeed * 0.02) + Math.cos(s1 * cx);
      let vz = Math.sin(s1 * cx + strandSeed * 0.03) + Math.cos(s1 * cy);

      const vx2 = 0.45 * Math.sin(s2 * cy - s2 * cz);
      const vy2 = 0.45 * Math.sin(s2 * cz - s2 * cx);
      const vz2 = 0.45 * Math.sin(s2 * cx - s2 * cy);

      vx += vx2;
      vy += vy2;
      vz += vz2;

      if (isEscaping && p > 20) {
        vx += escapeDirX * 0.4;
        vy += escapeDirY * 0.4;
      }

      // Normalize velocity and step
      const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
      cx += (vx / vLen) * stepSize;
      cy += (vy / vLen) * stepSize;
      cz += (vz / vLen) * stepSize;
    }

    // --- 2. ORDER GENERATION (Torus vortex with 11 lobes and combed spiral ribbons) ---
    // Swirling wreath seen from the front (Reference Image 1)
    const orderPoints: THREE.Vector3[] = [];
    const swirlTurns = 1.6 + strandRand1 * 0.4; // 1.6 to 2.0 full turns around the ring
    const lobeOffset = Math.sin(strandAngle * numLobes) * 0.28;

    for (let p = 0; p < pointsPerStrand; p++) {
      const u = p / (pointsPerStrand - 1); // 0.0 to 1.0 along the strand

      // Angle advances around the circle
      const angle = strandAngle + u * swirlTurns * Math.PI;

      // Distance from center:
      // Inner radius starts around 0.45 (near core), expands out to 1.5, curves back
      const lobeWave = Math.cos(angle * numLobes + strandRadiusFrac * 0.5) * (0.28 + lobeOffset * 0.3);
      const baseR = 0.65 + Math.sin(u * Math.PI) * 0.65 + strandRadiusFrac * 0.22;
      const R = Math.max(0.38, baseR + lobeWave + microX);

      // Z depth creates the 3D bowl/cavity shape where the core sits inside
      const cavityZ = -0.35 * Math.pow(1.0 - Math.min(R / 1.4, 1.0), 1.5);
      const waveZ = Math.sin(angle * numLobes * 0.5 + u * Math.PI * 2.0) * 0.25;
      const Z = cavityZ + waveZ + microZ;

      const ox = R * Math.cos(angle) + microX;
      const oy = R * Math.sin(angle) + microY;
      const oz = Z;

      orderPoints.push(new THREE.Vector3(ox, oy, oz));
    }

    // Write into buffers
    const baseVertex = s * pointsPerStrand;
    for (let p = 0; p < pointsPerStrand; p++) {
      const vIdx = baseVertex + p;
      const vIdx3 = vIdx * 3;

      // Position A (Chaos)
      posAArray[vIdx3] = chaosPoints[p].x;
      posAArray[vIdx3 + 1] = chaosPoints[p].y;
      posAArray[vIdx3 + 2] = chaosPoints[p].z;

      // Position B (Order)
      posBArray[vIdx3] = orderPoints[p].x;
      posBArray[vIdx3 + 1] = orderPoints[p].y;
      posBArray[vIdx3 + 2] = orderPoints[p].z;

      // Progress along strand (0 to 1)
      progressArray[vIdx] = p / (pointsPerStrand - 1);

      // Random attributes for shader
      randArray[vIdx3] = strandRand1;
      randArray[vIdx3 + 1] = strandRand2;
      randArray[vIdx3 + 2] = strandRand3;
    }

    // Indices for LineSegments: connecting (p, p+1)
    for (let p = 0; p < segmentsPerStrand; p++) {
      indices[idxOffset++] = baseVertex + p;
      indices[idxOffset++] = baseVertex + p + 1;
    }
  }

  const geometry = new THREE.BufferGeometry();
  // Standard position attribute initialized to positionA
  geometry.setAttribute('position', new THREE.BufferAttribute(posAArray.slice(), 3));
  geometry.setAttribute('positionA', new THREE.BufferAttribute(posAArray, 3));
  geometry.setAttribute('positionB', new THREE.BufferAttribute(posBArray, 3));
  geometry.setAttribute('aProgress', new THREE.BufferAttribute(progressArray, 1));
  geometry.setAttribute('aRand', new THREE.BufferAttribute(randArray, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  return geometry;
}
