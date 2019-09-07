export function isTestItem (node: TestNode): node is TestItem {
  return node.tag === 'TestItem';
}

export function isTestGroup (node: TestNode): node is TestGroup {
  return ['TestGroup', 'TestSuite', 'AllTests'].includes(node.tag);
}