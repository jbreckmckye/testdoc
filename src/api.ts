import { ParserPlugin } from '@babel/parser';

import { read } from './effects/read';
import { getASTs } from './pure/ast';
import { parseAll } from './pure/parseTests';

export interface Options {
  fileMatch: string,
  parsers?: ParserPlugin[]
}

export async function testDoc (options: Options): Promise<void> {
  const files = await read(options.fileMatch);
  const ASTs = getASTs(files, {
    plugins: options.parsers
  });
  const testASTs = parseAll(ASTs);
  console.log(JSON.stringify(testASTs, null, 2))

}