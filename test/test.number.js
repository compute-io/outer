/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ).raw,

	// Module to be tested:
	outer = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number outer', function tests() {

	it( 'should export a function', function test() {
		expect( outer ).to.be.a( 'function' );
	});

	it( 'should compute the outer product of two numbers', function test() {

		var expected, actual;

		actual = matrix( new Float64Array( 1 ), [1,1] );
		actual = outer( actual, 9, 3 );
		expected = matrix( new Float64Array( [27] ), [1,1] );

		assert.deepEqual( actual, expected );

	});


	it( 'should compute the outer product of a number and an array', function test() {

		var expected, actual;

		actual = matrix( new Float64Array( 3 ), [1,3] );
		actual = outer( actual, 3, [1,2,3] );
		expected = matrix( new Float64Array( [3,6,9] ), [1,3] );

		assert.deepEqual( actual, expected );

	});

	it( 'should compute the outer product of a number and a typed array', function test() {

		var expected, actual;

		actual = matrix( new Float64Array( 3 ), [1,3] );
		actual = outer( actual, 3, new Int32Array( [1,2,3] ) );
		expected = matrix( new Float64Array( [3,6,9] ), [1,3] );

		assert.deepEqual( actual, expected );

	});

	it( 'should handle non-numeric values by setting the respective elements to NaN', function test() {
		var actual, expected, y;

		y = [ true, null, [], {} ];
		actual = matrix( new Float64Array( y.length ), [1,y.length] );
		actual = outer( actual, 1, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [1,y.length] );
		assert.deepEqual( actual, expected );

		y = new Float64Array( [ NaN, NaN, NaN, NaN ] );
		actual = matrix( new Float64Array( y.length ), [1,y.length] );
		actual = outer( actual, 1, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [1,y.length] );
		assert.deepEqual( actual, expected );

		y = new Float64Array( [ NaN, NaN, NaN, NaN ] );
		actual = matrix( new Float64Array( y.length ), [1,y.length] );
		actual = outer( actual, 1, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [1,y.length] );
		assert.deepEqual( actual, expected );

		y = new Float64Array( [ 1, 2, 3, 4 ] );
		actual = matrix( new Float64Array( y.length ), [1,y.length] );
		actual = outer( actual, false, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [1,y.length] );
		assert.deepEqual( actual, expected );

		y = [ 1, 2, 3, 4 ];
		actual = matrix( new Float64Array( y.length ), [1,y.length] );
		actual = outer( actual, false, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [1,y.length] );
		assert.deepEqual( actual, expected );

		y = null;
		actual = matrix( new Float64Array( 1 ), [1,1] );
		actual = outer( actual, false, y );
		expected = matrix( new Float64Array( [ NaN ] ), [1,1] );
		assert.deepEqual( actual, expected );

	});

});
