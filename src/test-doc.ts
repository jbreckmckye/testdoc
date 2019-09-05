import glob from 'glob';
import process from 'process';
import { promisify } from 'util';

const parseGlob = promisify(glob);

async function main () {
  const [argFiles] = process.argv.slice(2);

  const tests = await Promise.resolve(argFiles)
    .then(parseGlob)
    .then(files => files.map(parseAST))
    .then(ASTs => ASTs.map(parseTestAST));

  console.log(tests.length)
}

function parseAST (file: string) {
  console.log(file);
  return file;
}

function parseTestAST (ast: string) {
  return ast;
}

main();