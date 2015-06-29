'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isObject = require( 'validate.io-object' );


// OUTER //

function outer( out, x, y, clbk ) {
	var xLength = out.shape[ 0 ],
		xVal,
		yLength = out.shape[ 1 ],
		yVal,
		i, j;

	if ( isTypedArrayLike( y ) ) {
		for ( i = 0; i < xLength; i++ ) {
			for ( j = 0; j < yLength; j++ ) {
				xVal = clbk( x[ i ], i, 0 );
				if ( typeof xVal === 'number' ) {
					out.set( i, j, xVal * y[ j ] );
				} else {
					out.set( i, j, NaN );
				}
			}
		}
	} else if ( isArrayLike( y ) ) {
		if ( !isObject( y[ 0 ] ) ) {
			// Guess that y is a primitive array -> callback does not have to be applied
			for ( i = 0; i < xLength; i++ ) {
				for ( j = 0; j < yLength; j++ ) {
					xVal = clbk( x[ i ], i, 0 );
					if ( typeof xVal === 'number' && typeof y[ j ] === 'number' ) {
						out.set( i, j, xVal * y[ j ] );
					} else {
						out.set( i, j, NaN );
					}
				}
			}
		} else {
			// y is an object array, too -> callback is applied
			for ( i = 0; i < xLength; i++ ) {
				for ( j = 0; j < yLength; j++ ) {
					xVal = clbk( x[ i ], i, 0 );
					yVal = clbk( y[ j ], i, 1 );
					if ( typeof xVal === 'number' ) {
						out.set( i, j, xVal * yVal );
					} else {
						out.set( i, j, NaN );
					}
				}
			}
		}
	} else {
		if ( typeof y === 'number' ) {
			for ( i = 0; i < xLength; i++ ) {
				for ( j = 0; j < yLength; j++ ) {
					xVal = clbk( x[ i ], i, 0 );
					if ( typeof xVal === 'number' ) {
						out.set( i, j, xVal * y );
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
