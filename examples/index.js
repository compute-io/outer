'use strict';

var outer = require( './../lib' );

var data,
	out,
	i;

// ----
// Plain arrays...
data = new Array( 10);
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = outer( data, data );
console.log( 'Arrays: %s\n', out.toString() );


// ----
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
console.log( 'Accessors: %s\n', out.toString() );

// ----
// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = outer( data, data );
console.log( 'Typed arrays: %s\n', out.toString() );
