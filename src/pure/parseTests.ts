import {CallExpression, File, Identifier} from '@babel/types';
import traverse, {NodePath} from '@babel/traverse'

import { AST } from './ast';

export function parseAll (ASTs: Array<AST>): TestGroup {
  return {
    tag: 'AllTests',
    children: ASTs.map(ast =>
      parseGroup(ast, 'TestSuite')
    )
  }
}

export function parseGroup (ast: AST, level: 'TestSuite' | 'TestGroup', name?: string): TestGroup {
  const group: TestGroup = {
    tag: level,
    name: name || ast.file.path,
    children: []
  };

  function appendGroup (path: NodePath<CallExpression>) {
    const nameArg = path.node.arguments[0];

    if (!nameArg) return;

    const groupName = nameArg.type === 'StringLiteral'
      ? nameArg.value
      : 'Test';

    group.children.push(
      parseGroup({...ast, path}, 'TestGroup', groupName)
    );
  }

  const visitors = {
    CallExpression (path: NodePath<CallExpression>) {
      const node = path.node;
      if (
        node.callee &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'describe'
      ) {
        path.skip();
        appendGroup(path);
      }
    }
  };

  if (ast.path.type === 'File') {
    traverse(ast.path as File, {
      ...visitors
    });

  } else {

    const path = ast.path as NodePath;
    traverse(path.node, {
      ...visitors
    }, path.scope, undefined, path.parentPath)
  }

  return group;
}