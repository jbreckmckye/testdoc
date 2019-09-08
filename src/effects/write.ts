import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

export function write(filepath: string, contents: string): Promise<void> {
  const dest = path.relative(process.cwd(), filepath);
  return fs.writeFile(dest, contents, {
    encoding: 'utf8'
  });
}