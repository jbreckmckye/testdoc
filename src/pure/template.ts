import { isTestGroup, isTestItem } from "./typecheck";

export function template (allTests: TestGroup): string {
  const strings = templateGroup(allTests);
  return strings.join('\n');
}

function templateGroup (group: TestGroup, level: number = 1): Array<string> {
  const headerLevel = Math.min(level, 6);
  const headerMarkup = new Array(headerLevel).fill('#').join('');
  const header = `${headerMarkup} ${group.name}`;

  if (group.children.length === 0) {
    return [
      header,
      'No tests'
    ];
  }

  const childGroups = group.children.filter(isTestGroup);
  const childItems  = group.children.filter(isTestItem);

  const itemRender = templateItems(childItems);
  const groupRender = childGroups.reduce(
    (acc, group) => [...acc, ...templateGroup(group, level + 1)],
    [] as Array<string>
  );

  return [
    header,
    '',
    ...(childItems.length ? itemRender : []),
    ...(groupRender.length ? groupRender : []),
    ''
  ]
}

function templateItems (items: Array<TestItem>): Array<string> {
  return [
    "```",
    ...items.map(item => `✓ ${item.name}`),
    "```"
  ]
}