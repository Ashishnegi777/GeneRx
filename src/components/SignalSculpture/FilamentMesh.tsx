import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface FilamentMeshProps {
  geometry: THREE.BufferGeometry;
  morph: number;
  pointerNdc: THREE.Vector2;
  enableRipple: boolean;
  opacity?: number;
}

const filamentVertexShader = `
  attribute vec3 positionA;
  attribute vec3 positionB;
  attribute float aProgress;
  attribute vec3 aRand;

  uniform float uTime;
  uniform float uMorph;
  uniform vec2 uPointer;
  uniform float uPointerRipple;

  varying float vProgress;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  varying float vStrandRand;
  varying float vMorph;

  void main() {
    vProgress = aProgress;
    vStrandRand = aRand.x;

    float m = clamp(uMorph, 0.0, 1.0);
    vMorph = m;

    // Direct interpolation from Chaos (positionA) to Order (positionB)
    vec3 basePos = mix(positionA, positionB, m);

    // Flowing breathing wobble (sin of uTime plus progress along the strand)
    float breatheAmp = mix(0.045, 0.016, m);
    float wave = sin(uTime * 1.5 + aProgress * 9.0 + aRand.y * 6.28);
    vec3 wobble = vec3(
      sin(uTime * 1.1 + aProgress * 7.0 + aRand.z * 3.14) * breatheAmp,
      cos(uTime * 1.3 + aProgress * 6.0 + aRand.x * 3.14) * breatheAmp,
      wave * breatheAmp * 0.75
    );

    vec3 finalPos = basePos + wobble;

    // Local cursor ripple disturbance if enabled
    if (uPointerRipple > 0.01) {
      vec4 screenPos = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      vec2 ndc = screenPos.xy / max(screenPos.w, 0.001);
      float d = length(ndc - uPointer);
      float ripple = smoothstep(0.65, 0.0, d) * uPointerRipple;
      // Perturb towards chaos when cursor moves near
      finalPos = mix(finalPos, positionA + wobble * 2.2, ripple * 0.45);
    }

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    vViewPos = mvPosition.xyz;
    vWorldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const filamentFragmentShader = `
  varying float vProgress;
  varying vec3 vViewPos;
  varying vec3 vWorldPos;
  varying float vStrandRand;
  varying float vMorph;

  uniform vec3 uColorBase;
  uniform vec3 uColorBlue;
  uniform vec3 uColorBronze;
  uniform float uOpacity;

  void main() {
    // Subtle strand tip fade so outer ends soften like fine hair
    float tipFade = smoothstep(0.0, 0.09, vProgress) * smoothstep(1.0, 0.91, vProgress);

    // Depth cue: strands farther from camera are darker
    float depthFactor = smoothstep(-6.5, -3.2, vViewPos.z);
    depthFactor = clamp(depthFactor * 0.75 + 0.25, 0.25, 1.0);

    // Chaos state: pale cool white
    vec3 chaosColor = vec3(0.92, 0.93, 0.96);

    // Order state: cool white with graphite blue rim and faint bronze tint (10-15%)
    float bronzeMix = smoothstep(0.35, 0.85, sin(vStrandRand * 14.0 + vProgress * 4.0)) * 0.14;
    float blueMix = smoothstep(-0.25, 0.75, cos(vStrandRand * 8.0 + vViewPos.x * 0.8)) * 0.38;

    vec3 orderColor = mix(uColorBase, uColorBlue, blueMix);
    orderColor = mix(orderColor, uColorBronze, bronzeMix);

    // Mix chaos vs order color
    vec3 finalColor = mix(chaosColor, orderColor, vMorph);
    finalColor *= depthFactor;

    // Per-strand opacity modulation (0.15 to 0.7)
    float strandAlpha = mix(0.18, 0.68, vStrandRand);
    float alpha = strandAlpha * tipFade * uOpacity;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const FilamentMesh: React.FC<FilamentMeshProps> = ({
  geometry,
  morph,
  pointerNdc,
  enableRipple,
  opacity = 1.0,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerRipple: { value: enableRipple ? 1.0 : 0.0 },
      uOpacity: { value: opacity },
      uColorBase: { value: new THREE.Color('#e8ecf2') },
      uColorBlue: { value: new THREE.Color('#5f6f8f') },
      uColorBronze: { value: new THREE.Color('#8a6a4a') },
    }),
    [enableRipple, opacity]
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uMorph.value = morph;
    materialRef.current.uniforms.uPointer.value.copy(pointerNdc);
    materialRef.current.uniforms.uPointerRipple.value = enableRipple ? 1.0 : 0.0;
    materialRef.current.uniforms.uOpacity.value = opacity;
  });

  return (
    <lineSegments geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={filamentVertexShader}
        fragmentShader={filamentFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </lineSegments>
  );
};
