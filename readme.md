# regexp

Regex parser based on descriptions in http://www.javascriptkit.com/javatutors/redev2.shtml

[![Build Status](https://img.shields.io/travis/ForbesLindesay/regexp/master.svg)](https://travis-ci.org/ForbesLindesay/regexp)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/regexp.svg)](https://gemnasium.com/ForbesLindesay/regexp)
[![NPM version](https://img.shields.io/npm/v/regexp.svg)](http://badge.fury.io/js/regexp)

## Installation

    npm install regexp

## Usage

```js
var regexp = require('regexp')
var res = regexp('[a-z]+')
assert.deepEqual(res, { type: 'match',
  offset: 0,
  text: '[a-z]+',
  body:
   [ { type: 'quantified',
       offset: 0,
       text: '[a-z]+',
       body:
        { type: 'charset',
          offset: 0,
          text: '[a-z]',
          invert: false,
          body:
           [ { type: 'range',
               offset: 1,
               text: 'a-z',
               start: 'a',
               end: 'z' } ] },
       quantifier:
        { type: 'quantifier',
          offset: 5,
          text: '+',
          min: 1,
          max: Infinity,
          greedy: true } } ] })
```

## Contributing

To run tests:

```console
$ npm install
$ npm test
```

This will also automatically compile `index.js`.

The key source files are `src/grammer.pegjs` which is compiled using [pegjs](http://pegjs.majda.cz/) and `src/index.js` which is a CommonJS module with a special additional pseudo `import` statement.

## License

  MIT