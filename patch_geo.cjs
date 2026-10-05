const fs = require('fs');
let src = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx', 'utf8');

// 1. Add mergeGeometries import after THREE import
const importLine = "import * as THREE from 'three';";
if (!src.includes('BufferGeometryUtils')) {
  src = src.replace(importLine, importLine + "\nimport { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';");
}

// 2. Replace createAsteriskGeometry function
const oldStart = src.indexOf('function createAsteriskGeometry(');
const marker = '// Reusable per-frame objects';
const oldEnd = src.indexOf(marker, oldStart);

const newFn = [
  '// Builds a proper 6-arm asterisk (*) from 3 merged BoxGeometry bars (0deg, 60deg, 120deg).',
  '// This is geometrically exact - no polygon self-intersection issues.',
  'function createAsteriskGeometry(numArms, barWidth, depth) {',
  '  numArms = numArms || 6;',
  '  barWidth = barWidth || 0.20;',
  '  depth = depth || 0.22;',
  '  var numBars = numArms / 2;',
  '  var geos = [];',
  '  for (var i = 0; i < numBars; i++) {',
  '    var angle = (i * Math.PI) / numBars;',
  '    var g = new THREE.BoxGeometry(1.0, barWidth, depth);',
  '    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(angle));',
  '    geos.push(g);',
  '  }',
  '  var merged = mergeGeometries(geos, false);',
  '  geos.forEach(function(g) { g.dispose(); });',
  '  merged.computeVertexNormals();',
  '  merged.computeBoundingBox();',
  '  var sz = new THREE.Vector3();',
  '  merged.boundingBox.getSize(sz);',
  '  var m = Math.max(sz.x, sz.y, sz.z);',
  '  if (m > 0) merged.scale(1 / m, 1 / m, 1 / m);',
  '  return merged;',
  '}',
  '',
  ''
].join('\n');

src = src.slice(0, oldStart) + newFn + src.slice(oldEnd);
fs.writeFileSync('d:/x/src/components/GlassCube3D.jsx', src);
console.log('Done. Length:', src.length);
console.log('Has import:', src.includes('BufferGeometryUtils'));
console.log('Has BoxGeometry:', src.includes('BoxGeometry(1.0'));
console.log('Old arm fn gone:', !src.includes('armLength'));
