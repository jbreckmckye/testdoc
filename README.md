# TestDoc

Generate documentation from your Mocha, Jest or Ava tests.

From a test like this...

```typescript
// in file ./test/examples/jest.mock.ts

describe('The Math object', function () {
  describe('Math.max()', () => {
    it('returns the greater of the two arguments', () => {
      expect(Math.max(1, 2)).toBe(2)
    })
  
    it('returns minus Infinity if provided no arguments', () => {
      expect(Math.max()).toBe(-Infinity)
    })
  }) 
})
```

TestDoc will create Markdown content like this...

```markdown
## ./test/examples/jest.mock.ts

### The Math object

#### Math.max()

'''
✓ returns the greater of the two arguments
✓ returns minus Infinity if provided no arguments
'''
```

See the [examples](test/examples) directory for more details.

## Installing

```
npm install testdoc
[or]
yarn add testdoc
```

## CLI

Call TestDoc from the command line with a glob pattern of tests to analyse:

`npx testdoc .test/**/*.spec.js`

This will output a file named TESTS.md in the current working directory.

TestDoc has several CLI flags you can use to adjust its behaviour. Read them by calling `npx testdoc --help`:

```bash
Turns JavaScript tests into documentation

USAGE
  $ testdoc [FILES]

OPTIONS
  -f, --flow                   Parse Flow files
  -h, --help                   show help
  -o, --outputFile=outputFile  Destination for the generated document
  -t, --typescript             Parse TypeScript files

```

## API

TestDoc also has a programmatic interface you can import into your own JavaScript or TypeScript files:

```
import { testDoc } from 'testdoc/lib/api';

testDoc({
    fileMatch: './tests/**/*.spec.ts',
    outputFile: 'documentation.markdown',
    parsers: ['typescript']
});
```

## Limitations

TestDoc performs only static analysis of test files, so it can't reason about any tests registered dynamically, e.g.
within a loop, or outside the scanned files themselves.

## License

AGPL v3