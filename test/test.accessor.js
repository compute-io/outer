/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ).raw,

	// Module to be tested:
	outer = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor outer', function tests() {

	it( 'should export a function', function test() {
		expect( outer ).to.be.a( 'function' );
	});

	it( 'should compute the outer product using an accessor', function test() {

		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = matrix( new Float64Array( 4 ), [4,1] );
		actual = outer( actual, data, 2, getValue );

		expected = matrix( new Float64Array( [0,2,4,6] ), [4,1] );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

		data = [
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			1,
			2,
			3,
			4
		];

		actual = matrix( new Float64Array( 4 * 3 ), [3,4] );
		actual = outer( actual, data, y, getValue );

		expected = matrix( new Float64Array( [1,2,3,4,2,4,6,8,3,6,9,12] ),[3,4] );

		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should compute the outer product of two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':1},
			{'y':2},
			{'y':3},
			{'y':4}
		];

		actual = matrix( new Float64Array( 4 * 3 ), [3,4] );
		actual = outer( actual, data, y, getValue );

		expected = matrix( new Float64Array( [1,2,3,4,2,4,6,8,3,6,9,12] ), [3,4] );

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should handle non-numeric values by setting the respective elements to NaN', function test() {
		var data, actual, expected, y;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = matrix( new Float64Array( 3 ), [3,1] );
		actual = outer( actual, data, 1, getValue );

		expected = matrix( new Float64Array([1,NaN,3]), [3,1] );
		assert.deepEqual( actual, expected );

		// single non-numeric value

		y = false;
		actual = matrix( new Float64Array( 3 ), [3,1] );
		actual = outer( actual, data, y, getValue );
		expected = matrix( new Float64Array( [NaN,NaN,NaN] ), [3,1] );

		assert.deepEqual( actual, expected );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = matrix( new Float64Array( 3*3 ), [3,3] );
		actual = outer( actual, data, y, getValue );
		expected = matrix( new Float64Array( [1,2,3,NaN,NaN,NaN,3,6,9] ), [3,3] );

		assert.deepEqual( actual, expected );

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = matrix( new Float64Array( 3*3 ), [3,3] );
		actual = outer( actual, data, y, getValue );
		expected = matrix( new Float64Array( [1,2,3,NaN,NaN,NaN,3,6,9] ), [3,3] );

		assert.deepEqual( actual, expected );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = matrix( new Float64Array( 3*3 ), [3,3] );
		actual = outer( actual, data, y, getValue2 );
		expected = matrix( new Float64Array( [1,2,3,NaN,NaN,NaN,3,6,9] ), [3,3] );


		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}
	});

});
