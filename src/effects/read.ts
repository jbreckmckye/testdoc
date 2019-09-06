import { promisify } from 'util';
import { promises as fs } from 'fs';

import glob from 'glob';

export async function read (match: string): Promise<Array<FileRef>> {
  const filePaths = await promisify(glob)(match);
  return Promise.all(
    filePaths.map(async (path) => ({
      path,
      contents: await fs.readFile(path, {
        encoding: 'utf8'
      })
    }))
  )
}
