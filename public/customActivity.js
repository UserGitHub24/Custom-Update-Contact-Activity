       var connection = new Postmonger.Session();
	
	connection.trigger('ready');

	
	connection.on('initActivity', function( data ){
	document.getElementById( 'statusCode' ).value = JSON.stringfy( data, null, 2);
	});


	
	connection.on('clickedNext', function() {
	var statusCode = JSON.parse ( document.getElementById( 'statusCode' ).value);
	connection.trigger('updateActivity', statusCode);
        });
