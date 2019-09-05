const { sh, cli } = require('tasksfile')

function compile () {
  return sh(`tsc`, { async: true })
}

function tsinstall (options, pkg) {
  options.dev
    ? sh(`npm install --save-dev --save-exact ${pkg} @types/${pkg}`)
    : sh(`npm install --save --save-exact ${pkg} && npm install --save-dev --save-exact @types/${pkg}`)
}

async function test (options, glob) {
  const target = glob || './src/*.ts';
  await compile();
  sh(`node lib/test-doc.js ${target}`)
}

cli({
  compile,
  test,
  tsinstall
})