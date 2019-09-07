import { promisify } from 'util';
import { promises as fs } from 'fs';

import glob from 'glob';

export async function getPaths (match: string): Promise<Array<string>> {
  return promisify(glob)(match);
}

export async function readOne (path: string): Promise<FileRef> {
  return {
    path,
    contents: await fs.readFile(path, {
      encoding: 'utf8'
    })
  }
}

