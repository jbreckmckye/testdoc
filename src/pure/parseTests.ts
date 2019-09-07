import {CallExpression, Expression, File, Identifier} from '@babel/types';
import traverse, {NodePath} from '@babel/traverse'

import { AST } from './ast';

export function aggregateGroups (groups: Array<TestGroup>): TestGroup {
  return {
    tag: 'AllTests',
    name: 'Test Suite',
    children: groups
  };
}

export function parseGroup (ast: AST, topLevel: boolean = false, name?: string): TestGroup {
  const group: TestGroup = {
    tag: topLevel ? 'TestSuite' : 'TestGroup',
    name: name || ast.file.path,
    children: []
  };

  function appendGroup (path: NodePath<CallExpression>) {
    const name = extractTitle(path);
    group.children.push(
      parseGroup({...ast, path}, false, name)
    );
  }

  function appendItem (path: NodePath<CallExpression>) {
    const name = extractTitle(path);
    group.children.push(
      {tag: 'TestItem', name}
    )
  }

  const visitors = {
    CallExpression (path: NodePath<CallExpression>) {
      if (isGroup(path.node.callee)) {
        path.skip();
        appendGroup(path);
      } else if (isItem(path.node.callee)) {
        path.skip();
        appendItem(path);
      }
    }
  };

  if (ast.path.type === 'File') {
    traverse(ast.path as File, {
      ...visitors
    });

  } else {
    // Recursive calls need to have the scope and parentpath threaded back through
    const path = ast.path as NodePath;
    traverse(path.node, {
      ...visitors
    }, path.scope, undefined, path.parentPath)
  }

  return group;
}

function isGroup (exp: Expression): boolean {
  return isIdentifier(exp) && exp.name === 'describe';
}

function isItem (exp: Expression): boolean {
  return isIdentifier(exp) && (exp.name === 'test' || exp.name === 'it');
}

function isIdentifier (exp: Expression): exp is Identifier {
  return exp.type === 'Identifier'
}

function extractTitle (path: NodePath<CallExpression>): string {
  const nameArg = path.node.arguments[0];
  return (nameArg && nameArg.type === 'StringLiteral')
    ? nameArg.value
    : 'test';
}