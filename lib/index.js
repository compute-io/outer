'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw;


// FUNCTIONS //

var outer1 = require( './typedarray.js' ),
	outer2 = require( './accessor.js' ),
	outer3 = require( './array.js' ),
	outer4 = require( './number.js' ),
	validate = require( './validate.js' );


// OUTER //

/**
* FUNCTION: outer( x, y[, opts] )
*	Computes the outer product between two arrays.
*/
function outer( x, y, options ) {
	var opts = {},
		err,
		ctor,
		dt,
		out,
		xLength, yLength;

	if ( x === undefined && y === undefined ) {
		throw new Error( 'outer()::invalid arguments. Both x and y have to be supplied. Values: x:`' + x + ', y:' + y + '`.' );
	}

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	xLength = x.length || 1;
	yLength = y.length || 1;

	dt = opts.dtype || 'float64';
	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'outer()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
	}
	out = matrix( ctor( xLength * yLength ), [ xLength, yLength ], dt);

	if ( isTypedArrayLike( x ) ) {
		return outer1( out, x, y );
	}
	if ( isArrayLike ( x ) ) {
		if ( opts.accessor ) {
			return outer2( out, x, y, opts.accessor );
		}
		return outer3( out, x, y );
	} else {
		return outer4( out, x, y );
	}
} // end FUNCTION outer()


// EXPORTS //

module.exports = outer;
