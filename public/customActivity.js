'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(function () {
		connection.trigger('ready');
	});

	function initialize (data) {
		if (data) {
			payload = data;
		}
	}
	
	connection.on('initActivity', function( payload ){
	document.getElementById( 'statusCode' ).value = JSON.stringfy( payload, null, 2);
	});


	
	connection.on('clickedNext', function() {
	var statusCode = JSON.parse ( document.getElementById( 'statusCode' ).value);
	connection.trigger('updateActivity', statusCode);

	}
	
    connection.on('initActivity', initialize);
});
