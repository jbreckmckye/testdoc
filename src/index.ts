import {Command, flags} from '@oclif/command'
import {ParserPlugin} from '@babel/parser';

import { testDoc } from './api';

class TestDoc extends Command {
  static description = 'Turns JavaScript tests into documentation';

  static flags = {
    help: flags.help({
      char: 'h',
      description: 'show help'
    }),
    flow: flags.boolean({
      char: 'f',
      description: 'Parse Flow files'
    }),
    outputFile: flags.string({
      char: 'o',
      description: 'Destination for the generated document'
    }),
    typescript: flags.boolean({
      char: 't',
      description: 'Parse TypeScript files'
    }),
  };

  static args = [{name: 'files'}];

  async run() {
    const {args, flags} = this.parse(TestDoc);

    const parsers: ParserPlugin[] = ['jsx'];
    if (flags.flow) parsers.push('flow');
    if (flags.typescript) parsers.push('typescript');

    await testDoc({
      fileMatch: args.files,
      outputFile: flags.outputFile || 'TESTS.md',
      parsers
    });
  }
}


export = TestDoc
