import { ParserPlugin } from '@babel/parser';

import { getPaths, readOne } from './effects/read';
import { getAST } from './pure/ast';
import { parseGroup, aggregateGroups } from './pure/parseTests';

export interface Options {
  fileMatch: string,
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
  console.log(JSON.stringify(result, null, 2))

}