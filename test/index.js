var util = require('util')
var assert = require('assert')

var color = require('bash-color')

var regex
try {
  regex = require('../src/compile.js')
} catch (ex) {
  if (ex.code != 'MODULE_NOT_FOUND') throw ex
  else regex = require('../')
}
var expressions = require('./expressions.js')

var all = process.argv[2] === '--all' || process.argv[2] === '-a'
var failed = false
expressions.forEach(function (expression) {
  console.log()

  var exp = /^\/(.*)\/$/.exec(expression[0].toString())[1]
  var parsed = regex(exp)
  try {
    assert.deepEqual(parsed, expression[1])
    console.log(color.green(expression[0]))
    if (all) {
      console.log()
      inspect(parsed, '  ')
    }
  } catch (ex) {
    console.log(color.red(expression[0]))
    console.log()
    inspect(parsed, '  ')
    failed = true
  }
})

if (failed) {
  throw new Error('At least one test failed, see above.')
}

function inspect(obj, indent) {
  var options = {
    showHidden: false,
    depth: 30,
    colors: true
  }
  if (util.inspect.length === 4) {
    console.log(util.inspect(obj, options.showHidden, options.depth, options.colors).replace(/^/gm, indent || ''))
  } else {
    console.log(util.inspect(obj, options).replace(/^/gm, indent || ''))
  }
}