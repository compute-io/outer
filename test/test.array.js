/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ).raw,

	// Module to be tested:
	outer = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array outer', function tests() {

	it( 'should export a function', function test() {
		expect( outer).to.be.a( 'function' );
	});

	it( 'should calculate the outer product between two arrays', function test() {
		var data, actual, expected, y;

		data = [
			1,
			2,
			3,
			4,
			5
		];
		actual = matrix( new Float64Array( data.length ), [data.length,1] );

		actual = outer( actual, data, 2 );

		expected = matrix( new Float64Array( [2,4,6,8,10] ), [data.length,1] );

		assert.deepEqual( actual, expected );

		data = [
			1,
			2,
			3,
			4,
		];

	 	y = [
			1,
			2,
			3,
			4,
		];
		actual = matrix( new Float64Array( data.length * y.length ), [data.length,y.length] );
		actual = outer( actual, data, y );

		expected = matrix( new Float64Array([
			1, 2, 3, 4,
			2, 4, 6, 8,
			3, 6, 9, 12,
			4, 8, 12, 16
		]), [4,4] );

	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [ true, null, [], {} ];
		actual = matrix( new Float64Array( data.length ), [data.length,1] );
		actual = outer( actual, data, 1 );

		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [data.length,1] );

		assert.deepEqual( actual, expected );

		actual = matrix( new Float64Array( data.length ), [data.length,1] );
		y = [ 1, 2, 3, 4 ];
		actual = outer( actual, data, y );

		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [data.length,1] );

		assert.deepEqual( actual, expected );

		data = [ 1, 2, 3 ];
		y = null;
		actual = matrix( new Float64Array( data.length ), [data.length,1] );
		actual = outer( actual, data, y );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN ] ), [data.length,1] );

		assert.deepEqual( actual, expected );

		data = [ 1, null, 3 ];
		y = new Int32Array( [1,2,3] );
		actual = matrix( new Float64Array( data.length * y.length ), [data.length,y.length] );
		actual = outer( actual, data, y );
		expected = matrix( new Float64Array( [1,2,3,NaN,NaN,NaN,3,6,9] ), [data.length,y.length] );

		assert.deepEqual( actual, expected );

	});

});
