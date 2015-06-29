outer
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [outer product](https://en.wikipedia.org/wiki/Outer_product).

The outer product between two vectors `x` and `y` is denoted as x ⊗ y and is equivalent to the matrix multiplication `x y^t`. For a vector `x` of length *M* and `y` of length *N*, it is equal to

<div class="equation" align="center" data-raw-text="\mathbf{x} \otimes \mathbf{y} =  
\begin{bmatrix}x_0y_0 &amp; x_0y_1 &amp; \dots &amp; x_0y_{N-1} \\ x_1y_0 &amp; x_1y_1 &amp; \dots &amp; x_1y_{N-1} \\ \ydots &amp; \ydots &amp; \ddots &amp; \ydots\\ x_{M-1}y_0 &amp; x_{M-1}y_1 &amp; \dots &amp; x_{M-1}y_{N-1} \end{bmatrix}." data-equation="eq:principal_square_root">
	<img src="https://cdn.rawgit.com/compute-io/outer/38cac9485c95388527e00262ecd83ba43d00c924/docs/img/eqn.svg" alt="Equation for the outer product.">
	<br>
</div>

## Installation

``` bash
$ npm install compute-outer
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var outer = require( 'compute-outer' );
```

#### outer( x, y[, opts] )

Computes the outer product between `x` and `y`. `x` and `y` have to either [`numbers`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays). Passing a single number either as `x` or `y` will be treated as when passing a vector of length one. The function returns a [`matrix`](https://github.com/dstructs/matrix) with *M* rows and *N* columns, where *M* is the length of `x` and *N* the length of `y`.

``` javascript
outer( [ 1, 2, 3], 2 )
/*
	[ 2
	  4
	  6 ]
*/
outer( 2, [ 1, 2, 3] )
/*
	[ 2 4 6 ]
*/

outer( [ 2, 4 ], [ 1, 3 ] )
/*
	[ 2  6
	  4 12 ]
*/
```

The function accepts the following two `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = outer( data, 2, {
	'accessor': getValue
});
/*
	[ 10
	   6
	  16
	   6
	   4 ]
*/
```

When calculating the outer product between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 2],
	['boop', 4],
];

var arr = [
	{'x': 1},
	{'x': 3},
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = outer( data, arr, {
	'accessor': getValue
});
/*
	[ 2  6
	  4 12 ]
*/
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

By default, the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

out = outer( [1,2,3], 2, {
	'dtype': 'int32'
});
/*
	[ 2
	  4
	  6 ]
*/

out.dtype === 'int32'
// returns true
```

## Examples

``` javascript
var outer = require( 'compute-outer' );

var data,
	out,
	i;

// Plain arrays...
data = new Array( 10);
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = outer( data, data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = outer( data, data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = outer( data, data );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-outer.svg
[npm-url]: https://npmjs.org/package/compute-outer

[travis-image]: http://img.shields.io/travis/compute-io/outer/master.svg
[travis-url]: https://travis-ci.org/compute-io/outer

[coveralls-image]: https://img.shields.io/coveralls/compute-io/outer/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/outer?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/outer.svg
[dependencies-url]: https://david-dm.org/compute-io/outer

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/outer.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/outer

[github-issues-image]: http://img.shields.io/github/issues/compute-io/outer.svg
[github-issues-url]: https://github.com/compute-io/outer/issues
