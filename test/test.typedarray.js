/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ).raw,

	// Module to be tested:
	outer = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array outer', function tests() {

	it( 'should export a function', function test() {
		expect( outer ).to.be.a( 'function' );
	});

	it( 'should compute the outer product of two typed arrays', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		y = new Float64Array([
			2,
			2,
			3,
			3
		]);
		actual = matrix( new Float64Array( data.length * y.length ), [4,4]);
		actual = outer( actual, data, y );

		expected = matrix( new Float64Array( [2,2,3,3,4,4,6,6,6,6,9,9,8,8,12,12] ), [4,4] );

		assert.deepEqual( expected, actual );
	});


	it( 'should handle non-numeric y values by setting the respective elements to NaN', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = matrix( new Float64Array( data.length), [data.length,1] );
		actual = outer( actual, data, null  );
		expected = matrix( new Float64Array( [ NaN, NaN, NaN, NaN ] ), [data.length,1] );
		assert.deepEqual( actual, expected );

		y = [ 1, 2, 3, null ];
		actual = matrix( new Float64Array( data.length * y.length ), [data.length,y.length] );
		actual = outer( actual, data, y );
		expected =  matrix( new Float64Array( [1,2,3,NaN,2,4,6,NaN,3,6,9,NaN,4,8,12,NaN] ), [4,4] );
		assert.deepEqual( actual, expected );

	});

});
