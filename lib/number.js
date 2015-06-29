'use strict';

// MODULES //

var isArrayLike = require('validate.io-array-like'),
	isTypedArrayLike = require('validate.io-typed-array-like');


// OUTER //

/**
* FUNCTION: outer( out, x, y )
*	Computes the outer product of a number and an array.
*
* @param {Matrix} out - output matrix
* @param {Number} x - first factor of outer product
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y - second factor of outer product
* @returns {Matrix} output matrix
*/
function outer( out, x, y ) {
	var yLength = out.shape[ 1 ],
		j;
	if ( isTypedArrayLike(y) ) {
		if ( typeof x === 'number' ) {
			for ( j = 0; j < yLength; j++ ) {
				out.set( 0, j, x * y[ j ] );
			}
		} else {
			for ( j = 0; j < yLength; j++ ) {
				out.set( 0, j, NaN );
			}
		}
	} else if ( isArrayLike(y) ) {
		if ( typeof x === 'number' ) {
			for ( j = 0; j < yLength; j++ ) {
				if ( typeof y[ j ] === 'number' ) {
					out.set( 0, j, x * y[ j ] );
				} else {
					out.set( 0, j, NaN );
				}
			}
		} else {
			for ( j = 0; j < yLength; j++ ) {
				out.set( 0, j, NaN );
			}
		}
	} else {
		if ( typeof y === 'number' ) {
			out.set( 0, 0, x * y );
		} else {
			out.set( 0, 0, NaN );
		}
	}
	return out;
} // end FUNCTION outer()


// EXPORTS //

module.exports = outer;
