const fs = require('fs');
let src = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx', 'utf8');

// 1. Replace imports: swap mergeGeometries for FontLoader + TextGeometry
src = src.replace(
  "import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';",
  "import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';\nimport { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';"
);

// 2. Replace the createAsteriskGeometry function with a font-based loader
const oldStart = src.indexOf('// Builds a proper 6-arm asterisk');
const marker = '// Reusable per-frame objects';
const oldEnd = src.indexOf(marker, oldStart);

const newFn = [
  '// Loads Instrument Serif Italic font JSON and creates extruded "x" TextGeometry.',
  '// Returns a Promise that resolves to a BufferGeometry.',
  'function loadXGeometry() {',
  '  return new Promise((resolve) => {',
  '    const loader = new FontLoader();',
  '    loader.load(',
  "      '/Instrument Serif_Italic.json',",
  '      (font) => {',
  '        const geo = new TextGeometry("x", {',
  '          font,',
  '          size: 0.9,',
  '          depth: 0.22,',
  '          bevelEnabled: true,',
  '          bevelThickness: 0.04,',
  '          bevelSize: 0.03,',
  '          bevelOffset: 0,',
  '          bevelSegments: 2,',
  '          curveSegments: 8,',
  '        });',
  '        geo.center();',
  '        geo.computeVertexNormals();',
  '        // Normalize so max dimension = 1',
  '        geo.computeBoundingBox();',
  '        const sz = new THREE.Vector3();',
  '        geo.boundingBox.getSize(sz);',
  '        const m = Math.max(sz.x, sz.y, sz.z);',
  '        if (m > 0) geo.scale(1 / m, 1 / m, 1 / m);',
  '        resolve(geo);',
  '      },',
  '      undefined,',
  '      () => {',
  '        // Fallback: simple box if font fails to load',
  '        console.warn("Font load failed, using fallback box geometry");',
  '        const fallback = new THREE.BoxGeometry(0.8, 0.8, 0.22);',
  '        resolve(fallback);',
  '      }',
  '    );',
  '  });',
  '}',
  '',
  ''
].join('\n');

src = src.slice(0, oldStart) + newFn + src.slice(oldEnd);
fs.writeFileSync('d:/x/src/components/GlassCube3D.jsx', src);
console.log('Step 1 done. Font loader added.');
console.log('Has FontLoader import:', src.includes("FontLoader"));
console.log('Has TextGeometry import:', src.includes("TextGeometry"));
console.log('Has loadXGeometry fn:', src.includes('loadXGeometry'));
