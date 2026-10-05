const fs = require('fs');
let src = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx', 'utf8');

// Fix: indentation is 4 spaces, not 2
const oldBlock = "    const asteriskGeo = createAsteriskGeometry(arms);\n    const starMesh = new THREE.Mesh(asteriskGeo);\n    spinner.add(starMesh);";

const newBlock = [
  "    // starMesh placeholder — geometry is set asynchronously after font loads",
  "    let xGeo = null;",
  "    const starMesh = new THREE.Mesh();",
  "    spinner.add(starMesh);",
  "",
  "    // Load 'x' geometry from Instrument Serif Italic font",
  "    const geoPromise = loadXGeometry();"
].join('\n');

if (!src.includes(oldBlock)) {
  console.error('STILL not found. Showing raw chars:');
  const idx = src.indexOf('asteriskGeo = createAsteriskGeometry');
  const chunk = src.slice(idx - 10, idx + 150);
  console.log(Buffer.from(chunk).toString('hex'));
  process.exit(1);
}
src = src.replace(oldBlock, newBlock);
console.log('Step 2a ok');

const oldCleanup = "      if (xGeo) xGeo.dispose();";
src = src.replace("      asteriskGeo.dispose();", oldCleanup);
console.log('Step 2b ok');

const oldRace = "    Promise.race([fontPromise, timeoutPromise]).then(() => {\n      if (disposed) return;\n      layout();\n      lastFrameTime = performance.now();\n      animate();\n    });";
const newRace = [
  "    // Wait for both: text canvas fonts AND the x geometry",
  "    Promise.all([",
  "      Promise.race([fontPromise, timeoutPromise]),",
  "      geoPromise,",
  "    ]).then(([, loadedGeo]) => {",
  "      if (disposed) { loadedGeo.dispose(); return; }",
  "      xGeo = loadedGeo;",
  "      starMesh.geometry = xGeo;",
  "      layout();",
  "      lastFrameTime = performance.now();",
  "      animate();",
  "    });"
].join('\n');

if (!src.includes(oldRace)) {
  console.error('Promise.race not found!');
  const idx = src.indexOf('Promise.race');
  console.log(JSON.stringify(src.slice(idx-5, idx+250)));
  process.exit(1);
}
src = src.replace(oldRace, newRace);
console.log('Step 2c ok');

fs.writeFileSync('d:/x/src/components/GlassCube3D.jsx', src);
console.log('All done!');
