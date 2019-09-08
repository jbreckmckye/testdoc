import { ParserPlugin } from '@babel/parser';

import { getAST } from './pure/ast';
import { parseGroup, aggregateGroups } from './pure/parseTests';
import { template } from "./pure/template";

import { getPaths, readOne } from './effects/read';
import { write } from './effects/write';

export interface Options {
  fileMatch: string,
  outputFile: string,
  parsers?: ParserPlugin[]
}

export async function testDoc (options: Options): Promise<void> {
  const filePaths = await getPaths(options.fileMatch);
  const babelOpts = {
    plugins: options.parsers
  };

  const parses = filePaths.map((path: string) =>
    readOne(path)
      .then(file => getAST(file, babelOpts))
      .then(ast => parseGroup(ast, true))
  );

  const testSuites = await Promise.all(parses);
  const result = aggregateGroups(testSuites);

  const documentation = template(result);

  await write(options.outputFile, documentation);
}