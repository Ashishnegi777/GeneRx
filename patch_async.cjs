const fs = require('fs');
let src = fs.readFileSync('d:/x/src/components/GlassCube3D.jsx', 'utf8');

// Find the synchronous geometry call and mesh creation
// Old pattern: const asteriskGeo = createAsteriskGeometry(arms);
//              const starMesh = new THREE.Mesh(asteriskGeo);
//              spinner.add(starMesh);
const oldBlock = "  const asteriskGeo = createAsteriskGeometry(arms);\n  const starMesh = new THREE.Mesh(asteriskGeo);\n  spinner.add(starMesh);";

const newBlock = [
  "  // starMesh placeholder — geometry is added asynchronously after font loads",
  "  let xGeo = null;",
  "  const starMesh = new THREE.Mesh();",
  "  spinner.add(starMesh);",
  "",
  "  // Load 'x' geometry from Instrument Serif Italic font",
  "  const geoPromise = loadXGeometry();"
].join('\n');

if (!src.includes(oldBlock)) {
  console.error('Could not find old block! Snippet found:');
  const idx = src.indexOf('const asteriskGeo');
  console.log(JSON.stringify(src.slice(idx, idx+200)));
  process.exit(1);
}

src = src.replace(oldBlock, newBlock);
console.log('Step 2a done — placeholder mesh added.');

// Also update the cleanup to dispose xGeo
const oldCleanup = "      asteriskGeo.dispose();";
const newCleanup = "      if (xGeo) xGeo.dispose();";
src = src.replace(oldCleanup, newCleanup);
console.log('Step 2b done — cleanup updated.');

// Now find the Promise.race block and integrate geoPromise
// Old: Promise.race([fontPromise, timeoutPromise]).then(() => {
//        if (disposed) return;
//        layout();
//        lastFrameTime = performance.now();
//        animate();
//      });
const oldRace = [
  "    Promise.race([fontPromise, timeoutPromise]).then(() => {",
  "      if (disposed) return;",
  "      layout();",
  "      lastFrameTime = performance.now();",
  "      animate();",
  "    });"
].join('\n');

const newRace = [
  "    // Wait for BOTH: fonts (for canvas text) AND the x geometry",
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
  console.error('Could not find Promise.race block!');
  const idx = src.indexOf('Promise.race');
  console.log(JSON.stringify(src.slice(idx, idx+300)));
  process.exit(1);
}

src = src.replace(oldRace, newRace);
console.log('Step 2c done — Promise.all wiring done.');

fs.writeFileSync('d:/x/src/components/GlassCube3D.jsx', src);
console.log('All done. File written.');
