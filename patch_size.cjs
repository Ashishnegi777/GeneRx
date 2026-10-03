const fs = require('fs');
let src = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx', 'utf8');
src = src.replace('size: 0.9,\n          depth: 0.22,', 'size: 0.72,\n          depth: 0.09,');
fs.writeFileSync('d:/x/src/components/GlassCube3D.jsx', src);
const check = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx','utf8');
const i = check.indexOf('loadXGeometry');
console.log(check.slice(i+90, i+250));
