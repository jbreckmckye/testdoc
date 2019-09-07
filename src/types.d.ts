interface TestNode {
  tag: string,
  name?: string,
  file?: string,
  line?: number
}

interface TestGroup extends TestNode {
  tag: 'TestGroup' | 'TestSuite' | 'AllTests',
  children: Array<TestGroup | TestItem>
}

interface TestItem extends TestNode {
  tag: 'TestItem'
}

interface FileRef {
  path: string,
  contents: string
}