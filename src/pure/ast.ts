import { parse as parseBabel, ParserOptions } from '@babel/parser';
import { File } from '@babel/types';
import { NodePath } from '@babel/traverse'

export interface AST {
  path: NodePath | File,
  file: FileRef
}

export function getAST (file: FileRef, babelOptions: ParserOptions): AST {
  return {
    path: parseBabel(file.contents, babelOptions),
    file
  };
}
