import fs from 'fs';
import path from 'path';

function findDeepestDirectory(directory) {
  let deepestDepth = 0;
  let deepestDirectory = '';

  function traverseDirectory(currentPath, depth) {
    const files = fs.readdirSync(currentPath);

    if (depth > deepestDepth) {
      deepestDepth = depth;
      deepestDirectory = currentPath;
    }

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath, depth + 1);
      }
    }
  }

  traverseDirectory(directory, 0);

  return deepestDirectory;
}

const deepestDir = findDeepestDirectory('node_modules');
console.log('Deepest directory:', deepestDir);
if (deepestDir) {
  const filePath = path.join(deepestDir, 'file.txt');
  fs.writeFileSync(filePath, 'Hello world');
  console.log(`File created in the deepest directory: ${deepestDir}`);
} else {
  console.log(`No directories found in`);
}
