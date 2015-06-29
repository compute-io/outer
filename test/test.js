/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate if a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	outer = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-outer', function tests() {

	it( 'should export a function', function test() {
		expect( outer ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid accessor option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				outer( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				outer( [1,2,3], 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				outer( new Int8Array([1,2,3]), 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if not provided both the x and y argument', function test() {
		expect( badValue ).to.throw( Error );
		function badValue( ) {
			outer();
		}
	});

	it( 'should calculate the outer product for two numbers', function test() {
		var expected, actual;

		expected = matrix( new Float64Array( [6] ), [1,1] );
		actual = outer( 2, 3 );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

		expected = matrix( new Float64Array( [0] ), [1,1] );
		actual = outer( 2, 0 );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );
	});

	it( 'should calculate the product of a scalar and an array when the argument order is reversed', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = outer( 2, data );
		expected = matrix( new Float64Array([ 2, 4 ]), [1,2] );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );
	});

	it( 'should perform the outer product when provided a plain array and a scalar', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = matrix( new Float64Array( [0,3,6,9] ), [4,1] );

		actual = outer( data, 3 );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

	});

	it( 'should compute the outer product of a plain array and another array', function test() {
		var data, actual, expected;

		data = [ 1, 2, 3, 4 ];
		expected = matrix( new Float64Array([
			1, 2, 3, 4,
			2, 4, 6, 8,
			3, 6, 9, 12,
			4, 8, 12, 16
		]), [4,4] );

		actual = outer( data, data );

		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

	});

	it( 'should compute the outer product of a typed array and a scalar', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = matrix( new Float64Array( [0,3,6,9] ), [4,1] );

		actual = outer( data, 3 );

		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

	});

	it( 'should compute the outer product of two typed arrays', function test() {
		var data, actual, expected;

		data = new Int8Array( [1,2,3,4] );

		expected = matrix( new Float64Array([
			1, 2, 3, 4,
			2, 4, 6, 8,
			3, 6, 9, 12,
			4, 8, 12, 16
		]), [4,4] );

		actual = outer( data, data );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

	});

	it( 'should compute the outer product and return a matrix of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = matrix( new Int8Array( [0,4,8,12] ), [4,1], 'int8');

		actual = outer( data, 4, {
			'dtype': 'int8'
		});
		assert.strictEqual( actual.data.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );
	});

	it( 'should calculate the outer product of an array with a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = matrix( new Float64Array( [0,0,0,0] ), [4,1] );

		actual = outer( data, 0, {
			'accessor': getValue
		});

		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should calculate the outer product between two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = outer( data, y, {
			'accessor': getValue
		});

		expected = matrix( new Float64Array( [0,0,0,0,0,1,2,3,0,2,4,6,0,3,6,9] ), [4,4] );

		assert.deepEqual( actual.data, expected.data );
		assert.deepEqual( actual.shape, expected.shape );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

});
