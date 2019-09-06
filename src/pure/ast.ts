import { parse as parseBabel, ParserOptions } from '@babel/parser';
import { File } from '@babel/types';
import { NodePath } from '@babel/traverse'

export interface AST {
  path: NodePath | File,
  file: FileRef
}

export function getASTs (files: Array<FileRef>, babelOptions: ParserOptions): Array<AST> {
  return files.map(file =>
    getAST(file, babelOptions)
  );
}

export function getAST (file: FileRef, babelOptions: ParserOptions): AST {
  return {
    path: parseBabel(file.contents, babelOptions),
    file
  };
}
