import {CallExpression, Expression, File, Identifier} from '@babel/types';
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
    const name = extractTitle(path);
    group.children.push(
      parseGroup({...ast, path}, 'TestGroup', name)
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