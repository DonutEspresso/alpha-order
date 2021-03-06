# alpha-order

[![NPM Version](https://img.shields.io/npm/v/alpha-order.svg)](https://npmjs.org/package/alpha-order)
[![Build Status](https://travis-ci.org/DonutEspresso/alpha-order.svg?branch=master)](https://travis-ci.org/DonutEspresso/alpha-order)
[![Coverage Status](https://coveralls.io/repos/github/DonutEspresso/alpha-order/badge.svg?branch=master)](https://coveralls.io/github/DonutEspresso/alpha-order?branch=master)
[![Dependency Status](https://david-dm.org/DonutEspresso/alpha-order.svg)](https://david-dm.org/DonutEspresso/alpha-order)
[![devDependency Status](https://david-dm.org/DonutEspresso/alpha-order/dev-status.svg)](https://david-dm.org/DonutEspresso/alpha-order#info=devDependencies)

> Sort JS objects and arrays by alpha order

The JavaScript specification makes no guarantees about the order of keys in
objects. However, V8 tends to sort them in the order in which they were added
to the object. This allows us to to get deterministic results from
`JSON.stringify` by alpha sorting objects and arrays ahead of time. BE WARNED:
DO NOT DEPEND ON KEY ORDERING IN YOUR CODE.

## Getting Started

Install the module with: `npm install alpha-order`

## Usage

Simply require the module, then call the `sort()` method. alpha-order does not
mutate the object passed in, and it always returns a new object to you.

```js
const alpha = require('alpha-order');

const a = [3, 1, 2];
alpha.sort(a);
// => [1, 2, 3]

const obj = { b: 1, a: 1 };
alpha.sort(obj);
// => { a: 1, b: 2 }

// You can also sort nested objects
const obj2 = { b: { ib: 2, ia: 1 }, a: 1 };
alpha.sort(obj, true);
// => { a: 1, b: { ia: 1, ib: 2 }}
```

## API

See [API](/api.md)


## Contributing

Ensure that all linting and codestyle tasks are passing. Add unit tests for any
new or changed functionality.

To start contributing, install the git prepush hooks:

```sh
make githooks
```

Before committing, lint and test your code using the included Makefile:
```sh
make prepush
```

## License

Copyright (c) 2018 Alex Liu

Licensed under the MIT license.
