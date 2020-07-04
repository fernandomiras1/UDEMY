const workboxBuild = require('workbox-build');

const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    globDirectory: "dist/browser",
    globPatterns: [
      '**/*.{js,css,html,png,svg,webp}',
      "assets/**/*.{css,html,js,json,png,svg,woff,woff2}"
    ],
    swSrc: "src/service-worker.js",
    swDest: "dist/browser/service-worker.js"
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  })
};

buildSW();
