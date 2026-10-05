import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Fullscreen quad shaders for offscreen render targets
const quadVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const quadFragmentShader = `
uniform sampler2D uTex;
varying vec2 vUv;
void main() {
  vec4 color = texture2D(uTex, vUv);
  gl_FragColor = color;
  #include <colorspace_fragment>
}
`;

const glassVertexShader = `
varying vec3 vNormal;
varying vec3 vEye;
void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPos = viewMatrix * worldPos;
  gl_Position = projectionMatrix * mvPos;
  vNormal = normalize(normalMatrix * normal);
  vEye = normalize(mvPos.xyz);
}
`;

const glassFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;
uniform float uRefractPower;
uniform float uChromatic;
uniform float uSaturation;
uniform float uShininess;
uniform float uDiffuseness;
uniform float uFresnelPower;
uniform vec3 uLight;
uniform float uBackside;
varying vec3 vNormal;
varying vec3 vEye;

float specular(vec3 light, float shininess, float diffuseness, vec3 n, vec3 view) {
  vec3 lightVec = normalize(-light);
  vec3 halfVec = normalize(lightVec + view);
  float nDotH = max(dot(n, halfVec), 0.0);
  return pow(nDotH, shininess) + max(0.0, dot(n, lightVec)) * diffuseness;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 n = normalize(vNormal);
  if (uBackside > 0.5) n = -n;
  vec3 eye = normalize(vEye);
  vec3 color = vec3(0.0);
  const int LOOP = 8;
  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.045;
    vec3 refrR = refract(eye, n, 1.0 / uIorR);
    vec3 refrY = refract(eye, n, 1.0 / uIorY);
    vec3 refrG = refract(eye, n, 1.0 / uIorG);
    vec3 refrC = refract(eye, n, 1.0 / uIorC);
    vec3 refrB = refract(eye, n, 1.0 / uIorB);
    vec3 refrP = refract(eye, n, 1.0 / uIorP);
    vec2 uvR = uv + refrR.xy * (uRefractPower + slide * 1.0) * uChromatic;
    vec2 uvY = uv + refrY.xy * (uRefractPower + slide * 1.0) * uChromatic;
    vec2 uvG = uv + refrG.xy * (uRefractPower + slide * 2.0) * uChromatic;
    vec2 uvC = uv + refrC.xy * (uRefractPower + slide * 2.5) * uChromatic;
    vec2 uvB = uv + refrB.xy * (uRefractPower + slide * 3.0) * uChromatic;
    vec2 uvP = uv + refrP.xy * (uRefractPower + slide * 1.0) * uChromatic;
    float r = texture2D(uTexture, uvR).x * 0.5;
    vec4 texY = texture2D(uTexture, uvY);
    float y = (texY.x * 2.0 + texY.y * 2.0 - texY.z) / 6.0;
    float g = texture2D(uTexture, uvG).y * 0.5;
    vec4 texC = texture2D(uTexture, uvC);
    float c = (texC.y * 2.0 + texC.z * 2.0 - texC.x) / 6.0;
    float b = texture2D(uTexture, uvB).z * 0.5;
    vec4 texP = texture2D(uTexture, uvP);
    float p = (texP.z * 2.0 + texP.x * 2.0 - texP.y) / 6.0;
    float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
    float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
    float B = b + (2.0 * c + 2.0 * p - y) / 3.0;
    color += vec3(R, G, B);
  }
  color /= float(LOOP);
  float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
  color = mix(vec3(luma), color, uSaturation);
  float spec = specular(uLight, uShininess, uDiffuseness, n, -eye) +
               0.6 * specular(vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5, n, -eye);
  color += spec * (uBackside > 0.5 ? 0.35 : 1.0);
  float f = pow(clamp(1.0 + dot(eye, n), 0.0, 1.0), uFresnelPower);
  color = mix(color, vec3(1.0), f * (uBackside > 0.5 ? 0.25 : 0.55));
  color += vec3(0.004, 0.005, 0.007);
  float alpha = clamp(length(color) * 1.6 + f * (uBackside > 0.5 ? 0.3 : 0.65) + spec + 0.15, 0.0, 0.96);
  gl_FragColor = vec4(color, alpha);
  #include <colorspace_fragment>
}
`;

/**
 * Creates a proper 6-arm asterisk (*) geometry.
 * Each arm is a clean tapered rectangle radiating from center.
 */
// Loads Instrument Serif Italic font JSON and creates extruded "x" TextGeometry.
// Returns a Promise that resolves to a BufferGeometry.
function loadXGeometry() {
  return new Promise((resolve) => {
    const loader = new FontLoader();
    loader.load(
      '/Instrument Serif_Italic.json',
      (font) => {
        const geo = new TextGeometry("x", {
          font,
          size: 0.58,
          depth: 0.04,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.012,
          bevelOffset: 0,
          bevelSegments: 2,
          curveSegments: 8,
        });
        geo.center();
        geo.computeVertexNormals();
        // Normalize so max dimension = 1
        geo.computeBoundingBox();
        const sz = new THREE.Vector3();
        geo.boundingBox.getSize(sz);
        const m = Math.max(sz.x, sz.y, sz.z);
        if (m > 0) geo.scale(1 / m, 1 / m, 1 / m);
        resolve(geo);
      },
      undefined,
      () => {
        // Fallback: simple box if font fails to load
        console.warn("Font load failed, using fallback box geometry");
        const fallback = new THREE.BoxGeometry(0.8, 0.8, 0.11);
        resolve(fallback);
      }
    );
  });
}

// Reusable per-frame objects � prevents GC pressure every frame
const _qY = new THREE.Quaternion();
const _qX = new THREE.Quaternion();
const _axisY = new THREE.Vector3(0, 1, 0);
const _axisX = new THREE.Vector3(1, 0, 0);

export const GlassCube3D = forwardRef(function GlassCube3D(
  {
    headlineLines = ['Intelligence, Built Into', 'the Physical World'],
    fontFamily = "'Instrument Serif', serif",
    fontWeight = 400,
    fontStyle = 'italic',
    textColor = '#ffffff',
    bgColor = '#000000',
    bgImage,
    headlineCenter = { x: 0.5, y: 0.288 },
    headlineFontSizePx = (W, H, mobile) => Math.min(Math.max(40, W * 0.052), 76),
    cubeCenter = { x: 0.517, y: 0.488 },
    arms = 6,
    scaleFactor = 0.75,
    xLetterScale = 0.72,
    showDysonRings = true,
    dysonRingRadii = [0.48, 0.58, 0.68],
    dysonRingTube = 0.012,
    dysonDelays = [0.0, 0.5, 1.1],
    dysonMoveDuration = 1.8,
    dysonPauseDuration = 1.2,
    dysonStrokeAngle = Math.PI,
  },
  ref
) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imperativeRotationRef = useRef(0);

  useImperativeHandle(ref, () => ({
    rotateBy(radians) { imperativeRotationRef.current += radians; },
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    let disposed = false;
    let isVisible = !document.hidden;
    let isIntersecting = true;
    let rafId = null;

    let bgImgElement = null;
    if (bgImage) {
      bgImgElement = new Image();
      bgImgElement.src = bgImage;
      bgImgElement.onload = () => { if (!disposed) redrawHeadlineCanvas(); };
    }

    const dprHint = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: dprHint <= 1,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(dprHint);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const pivot = new THREE.Group();
    const spinner = new THREE.Group();
    spinner.rotation.set(-0.42, 0.62, 0.18);
    scene.add(pivot);
    pivot.add(spinner);

    // starMesh placeholder — geometry is set asynchronously after font loads
    let xGeo = null;
    const starMesh = new THREE.Mesh();
    starMesh.scale.setScalar(xLetterScale);
    spinner.add(starMesh);

    // Load 'x' geometry from Instrument Serif Italic font
    const geoPromise = loadXGeometry();

    // Render targets at 75% resolution on high-DPI for perf
    const rtScale = dprHint > 1 ? 0.75 : 1.0;
    const targetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
    };
    let rtBack = new THREE.WebGLRenderTarget(1, 1, targetOptions);
    let rtFront = new THREE.WebGLRenderTarget(1, 1, targetOptions);

    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();
    const offscreenCanvas = document.createElement('canvas');
    const canvasTexture = new THREE.CanvasTexture(offscreenCanvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.minFilter = THREE.LinearFilter;
    canvasTexture.magFilter = THREE.LinearFilter;
    canvasTexture.generateMipmaps = false;

    const quadMat = new THREE.ShaderMaterial({
      vertexShader: quadVertexShader,
      fragmentShader: quadFragmentShader,
      uniforms: { uTex: { value: canvasTexture } },
      depthTest: false,
      depthWrite: false,
    });
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, quadMat);
    quadMesh.frustumCulled = false;
    bgScene.add(quadMesh);

    const createUniforms = (isBackside, rtTexture) => ({
      uTexture: { value: rtTexture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uIorR: { value: 1.15 },
      uIorY: { value: 1.16 },
      uIorG: { value: 1.18 },
      uIorC: { value: 1.22 },
      uIorB: { value: 1.22 },
      uIorP: { value: 1.22 },
      uRefractPower: { value: isBackside ? 0.22 : 0.3 },
      uChromatic: { value: 0.5 },
      uSaturation: { value: 1.08 },
      uShininess: { value: 90.0 },
      uDiffuseness: { value: 0.02 },
      uFresnelPower: { value: 5.0 },
      uLight: { value: new THREE.Vector3(-1, 1, 1) },
      uBackside: { value: isBackside ? 1.0 : 0.0 },
    });

    const frontMat = new THREE.ShaderMaterial({
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      uniforms: createUniforms(false, rtFront.texture),
      side: THREE.FrontSide,
      depthTest: true,
      depthWrite: true,
      transparent: true,
    });
    const backMat = new THREE.ShaderMaterial({
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      uniforms: createUniforms(true, rtBack.texture),
      side: THREE.BackSide,
      depthTest: true,
      depthWrite: true,
      transparent: true,
    });

    // 3 Dyson sphere glass rings surrounding the 'x' letter
    // Mounted to pivot (NOT spinner) so they don't tumble on the X letter's axis,
    // but tilted at the exact same base 3D orientation as the X letter (-0.42, 0.62, 0.18)
    const dysonGroup = new THREE.Group();
    dysonGroup.rotation.set(-0.42, 0.62, 0.18);
    pivot.add(dysonGroup);

    const ringGeos = [];
    const ringItems = [];
    const ringMeshes = [];

    if (showDysonRings) {
      // All 3 rings start at the exact same point (nested concentric in the same plane)
      const commonAxis = new THREE.Vector3(0.35, 0.92, 0.15).normalize();
      const baseTilt = { rx: 0.28, ry: 0.18, rz: 0.05 };

      const ringConfigs = [
        {
          radius: dysonRingRadii[0] || 0.48,
          tube: dysonRingTube || 0.012,
          rx: baseTilt.rx,
          ry: baseTilt.ry,
          rz: baseTilt.rz,
          axis: commonAxis,
        },
        {
          radius: dysonRingRadii[1] || 0.58,
          tube: dysonRingTube || 0.012,
          rx: baseTilt.rx,
          ry: baseTilt.ry,
          rz: baseTilt.rz,
          axis: commonAxis,
        },
        {
          radius: dysonRingRadii[2] || 0.68,
          tube: dysonRingTube || 0.012,
          rx: baseTilt.rx,
          ry: baseTilt.ry,
          rz: baseTilt.rz,
          axis: commonAxis,
        },
      ];

      ringConfigs.forEach((cfg) => {
        const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 24, 80);
        ringGeos.push(geo);

        const holder = new THREE.Group();
        holder.rotation.set(cfg.rx, cfg.ry, cfg.rz);

        const mesh = new THREE.Mesh(geo, frontMat);
        holder.add(mesh);
        dysonGroup.add(holder);

        ringItems.push({ mesh, cfg });
        ringMeshes.push(mesh);
      });
    }

    const redrawHeadlineCanvas = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      if (W === 0 || H === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const wDpr = Math.max(1, Math.round(W * dpr));
      const hDpr = Math.max(1, Math.round(H * dpr));
      if (offscreenCanvas.width !== wDpr || offscreenCanvas.height !== hDpr) {
        offscreenCanvas.width = wDpr;
        offscreenCanvas.height = hDpr;
      }
      const ctx = offscreenCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, wDpr, hDpr);
      if (bgImgElement && bgImgElement.complete && bgImgElement.naturalWidth > 0) {
        const imgAspect = bgImgElement.naturalWidth / bgImgElement.naturalHeight;
        const canvasAspect = wDpr / hDpr;
        let sW, sH, sX, sY;
        if (canvasAspect > imgAspect) {
          sW = wDpr; sH = wDpr / imgAspect; sX = 0; sY = (hDpr - sH) * 0.45;
        } else {
          sH = hDpr; sW = hDpr * imgAspect; sX = (wDpr - sW) * 0.5; sY = 0;
        }
        ctx.drawImage(bgImgElement, sX, sY, sW, sH);
        const radGrad = ctx.createRadialGradient(wDpr*0.5,hDpr*0.48,0,wDpr*0.5,hDpr*0.48,Math.max(wDpr,hDpr)*0.7);
        radGrad.addColorStop(0, 'rgba(0,0,0,0.0)');
        radGrad.addColorStop(0.6, 'rgba(0,0,0,0.20)');
        radGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, wDpr, hDpr);

        // Cinematic ambient core warmth baked into the refraction canvas
        const sparkX = wDpr * 0.515;
        const sparkY = hDpr * 0.488;
        const sparkRadius = Math.min(wDpr, hDpr) * 0.20;
        const sparkGrad = ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, sparkRadius);
        sparkGrad.addColorStop(0, 'rgba(255, 230, 180, 0.14)');
        sparkGrad.addColorStop(0.35, 'rgba(251, 191, 36, 0.06)');
        sparkGrad.addColorStop(0.70, 'rgba(56, 189, 248, 0.02)');
        sparkGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sparkGrad;
        ctx.fillRect(sparkX - sparkRadius, sparkY - sparkRadius, sparkRadius * 2, sparkRadius * 2);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, wDpr, hDpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      const mobile = W < 768 || W / H < 1;
      const fs = headlineFontSizePx(W, H, mobile);
      const stylePrefix = fontStyle ? `${fontStyle} ` : '';
      ctx.font = `${stylePrefix}${fontWeight} ${fs}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      const hc = mobile && headlineCenter?.mobile
        ? headlineCenter.mobile
        : headlineCenter?.desktop || headlineCenter || { x: 0.5, y: mobile ? 0.28 : 0.288 };
      const cx = hc.x * W;
      const cy = hc.y * H;
      const gap = fs * 1.07;
      const cap = fs * 0.7;
      const lines = Array.isArray(headlineLines)
        ? headlineLines
        : mobile && headlineLines?.mobile ? headlineLines.mobile
        : headlineLines?.desktop || [headlineLines];
      const n = lines.length;
      for (let i = 0; i < n; i++) {
        const y = cy + cap / 2 + (i - (n - 1) / 2) * gap;
        ctx.fillText(lines[i], cx, y);
      }
      ctx.restore();
      canvasTexture.needsUpdate = true;
    };

    const layout = () => {
      if (disposed) return;
      const W = container.clientWidth;
      const H = container.clientHeight;
      if (W === 0 || H === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const wDpr = Math.max(1, Math.round(W * dpr * rtScale));
      const hDpr = Math.max(1, Math.round(H * dpr * rtScale));
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(dpr);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      rtBack.setSize(wDpr, hDpr);
      rtFront.setSize(wDpr, hDpr);
      const fullW = Math.round(W * dpr);
      const fullH = Math.round(H * dpr);
      frontMat.uniforms.uResolution.value.set(fullW, fullH);
      backMat.uniforms.uResolution.value.set(fullW, fullH);
      redrawHeadlineCanvas();
      const mobile = W < 768 || W / H < 1;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * camera.aspect;
      const cc = mobile && cubeCenter?.mobile
        ? cubeCenter.mobile
        : cubeCenter?.desktop || cubeCenter || (mobile ? { x: 0.5, y: 0.45 } : { x: 0.517, y: 0.488 });
      pivot.position.set((cc.x - 0.5) * visW, (0.5 - cc.y) * visH, 0);
      const baseEdgeLengthPx = Math.min(H * 0.44, W * (mobile ? 0.45 : 0.29));
      const edgeLengthPx = baseEdgeLengthPx * scaleFactor;
      const scale = (edgeLengthPx / H) * visH;
      pivot.scale.set(scale, scale, scale);
    };

    setIsLoaded(true);

    const onFontLoadingDone = () => { redrawHeadlineCanvas(); };
    document.fonts?.addEventListener?.('loadingdone', onFontLoadingDone);
    const onVisibilityChange = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => { isIntersecting = entry.isIntersecting; },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => { layout(); });
    resizeObserver.observe(container);

    let lastFrameTime = performance.now();
    const startTime = performance.now();
    const fovRad = (camera.fov * Math.PI) / 180;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible || !isIntersecting) {
        lastFrameTime = performance.now();
        return;
      }
      const now = performance.now();
      const rawDt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      const dt = Math.min(rawDt, 0.05);
      const elapsed = (now - startTime) * 0.001;

      if (Math.abs(imperativeRotationRef.current) > 0.0005) {
        const step = imperativeRotationRef.current * Math.min(1, 0.09 * dt * 60);
        _qY.setFromAxisAngle(_axisY, step);
        spinner.quaternion.premultiply(_qY);
        imperativeRotationRef.current -= step;
        if (Math.abs(imperativeRotationRef.current) < 0.0005) imperativeRotationRef.current = 0;
      }

      const rotY = 0.0035 * (dt * 60);
      const rotX = 0.0012 * (dt * 60);
      _qY.setFromAxisAngle(_axisY, rotY);
      _qX.setFromAxisAngle(_axisX, rotX);
      spinner.quaternion.premultiply(_qY);
      spinner.quaternion.premultiply(_qX);

      // Sequential chase choreography:
      // Three rings start at the same point.
      // Ring 0 moves first.
      // After 0.7s, Ring 1 moves towards it with ease-in-out.
      // After 0.5s (1.2s total), Ring 2 moves after towards it with ease-in-out.
      const ringCount = ringItems.length;
      if (ringCount > 0) {
        const delays = dysonDelays || [0.0, 0.5, 1.22];
        const moveDur = dysonMoveDuration || 1.8;
        const pauseDur = dysonPauseDuration || 1.2;
        const stroke = dysonStrokeAngle || Math.PI;

        const maxDelay = Math.max(...delays);
        const cycle = maxDelay + moveDur + pauseDur;

        const cycleIndex = Math.floor(elapsed / cycle);
        const timeInCycle = elapsed - cycleIndex * cycle;
        const baseAngle = cycleIndex * stroke;

        for (let i = 0; i < ringCount; i++) {
          const { mesh, cfg } = ringItems[i];
          const delay = delays[i] || 0;

          let currentAngle = baseAngle;
          if (timeInCycle >= delay + moveDur) {
            currentAngle = baseAngle + stroke;
          } else if (timeInCycle > delay) {
            const p = (timeInCycle - delay) / moveDur;
            // Smooth ease-in-out cubic curve
            const easedP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            currentAngle = baseAngle + easedP * stroke;
          }

          mesh.quaternion.setFromAxisAngle(cfg.axis, currentAngle);
        }
      }

      const H = container.clientHeight || 800;
      const W = container.clientWidth || 1280;
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * (W / H);
      const mobile = W < 768 || W / H < 1;
      const cc = mobile && cubeCenter?.mobile
        ? cubeCenter.mobile
        : cubeCenter?.desktop || cubeCenter || (mobile ? { x: 0.5, y: 0.45 } : { x: 0.517, y: 0.488 });
      const floatOffset = Math.sin(elapsed * 1.2) * 0.02 * visH;
      pivot.position.set((cc.x - 0.5) * visW, (0.5 - cc.y) * visH + floatOffset, 0);

      renderer.setRenderTarget(rtBack);
      renderer.clear();
      renderer.render(bgScene, bgCamera);

      renderer.setRenderTarget(rtFront);
      renderer.clear();
      renderer.render(bgScene, bgCamera);
      starMesh.material = backMat;
      for (let i = 0; i < ringMeshes.length; i++) {
        ringMeshes[i].material = backMat;
      }
      renderer.autoClear = false;
      renderer.render(scene, camera);

      renderer.setRenderTarget(null);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      starMesh.material = frontMat;
      for (let i = 0; i < ringMeshes.length; i++) {
        ringMeshes[i].material = frontMat;
      }
      renderer.render(scene, camera);
      renderer.autoClear = true;
    };

    const fontStr = `${fontStyle ? fontStyle + ' ' : ''}${fontWeight} 100px ${fontFamily}`;
    const fontPromise = document.fonts
      ? Promise.all([document.fonts.load(fontStr), document.fonts.ready])
      : Promise.resolve();
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 2500));
    // Wait for both: text canvas fonts AND the x geometry
    Promise.all([
      Promise.race([fontPromise, timeoutPromise]),
      geoPromise,
    ]).then(([, loadedGeo]) => {
      if (disposed) { loadedGeo.dispose(); return; }
      xGeo = loadedGeo;
      starMesh.geometry = xGeo;
      starMesh.scale.setScalar(xLetterScale);
      layout();
      lastFrameTime = performance.now();
      animate();
    });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      document.fonts?.removeEventListener?.('loadingdone', onFontLoadingDone);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      quadGeo.dispose();
      quadMat.dispose();
      if (xGeo) xGeo.dispose();
      ringGeos.forEach((geo) => geo.dispose());
      frontMat.dispose();
      backMat.dispose();
      canvasTexture.dispose();
      rtBack.dispose();
      rtFront.dispose();
      renderer.dispose();
    };
  }, [headlineLines, fontFamily, fontWeight, fontStyle, textColor, bgColor, bgImage,
      headlineCenter, headlineFontSizePx, cubeCenter, arms, scaleFactor, xLetterScale,
      showDysonRings, dysonRingRadii, dysonRingTube,
      dysonDelays, dysonMoveDuration, dysonPauseDuration, dysonStrokeAngle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
    />
  );
});

export default GlassCube3D;
