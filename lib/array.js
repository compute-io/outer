'use strict';

// MODULES //

var isArrayLike = require('validate.io-array-like'),
	isTypedArrayLike = require('validate.io-typed-array-like');


// OUTER //

/**
* FUNCTION: outer( out, x, y )
*	Computes the outer product of an array.
*
* @param {Matrix} out - output matrix
* @param {Number[]} x - first factor of outer product
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y - second factor of outer product
* @returns {Matrix} output matrix
*/
function outer( out, x, y ) {
	var xLength = out.shape[ 0 ],
		yLength = out.shape[ 1 ],
		i, j;
	if ( isTypedArrayLike(y) ) {
		for ( i = 0; i < xLength; i++ ) {
			for ( j = 0; j < yLength; j++ ) {
				if ( typeof x[ i ] === 'number' ) {
					out.set( i, j, x[ i ] * y[ j ] );
				} else {
					out.set( i, j, NaN );
				}
			}
		}
	} else if ( isArrayLike(y) ) {
		for ( i = 0; i < xLength; i++ ) {
			for ( j = 0; j < yLength; j++ ) {
				if ( typeof x[ i ] === 'number' && typeof y[ j ] === 'number' ) {
					out.set( i, j, x[ i ] * y[ j ] );
				} else {
					out.set( i, j, NaN );
				}
			}
		}
	} else {
		if ( typeof y === 'number' ) {
			for ( i = 0; i < xLength; i++ ) {
				for ( j = 0; j < yLength; j++ ) {
					if ( typeof x[ i ] === 'number' ) {
						out.set( i, j, x[ i ] * y );
					} else {
						out.set( i, j, NaN );
					}
				}
			}
		} else {
			for ( i = 0; i < xLength; i++ ) {
				for ( j = 0; j < yLength; j++ ) {
					out.set( i, j, NaN );
				}
			}
		}
	}
	return out;
} // end FUNCTION outer()


// EXPORTS //

module.exports = outer;
