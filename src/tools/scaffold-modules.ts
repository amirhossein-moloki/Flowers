import * as fs from 'fs';
import * as path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

const basePath = path.join(__dirname, '..', 'modules', moduleName);
const directories = [
  'application/dtos',
  'application/use-cases',
  'domain',
  'infrastructure',
  'presentation/http',
];

console.log(`Scaffolding module: ${moduleName} at ${basePath}`);

directories.forEach((dir) => {
  const fullPath = path.join(basePath, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  fs.writeFileSync(path.join(fullPath, '.gitkeep'), '');
  console.log(`Created directory: ${fullPath}`);
});

// You can extend this script to create boilerplate files as well.
// For example, create entity, repository, controller files with basic content.

console.log('Module scaffolding complete!');