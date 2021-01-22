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

	function onClickedNext () {
       	if (payload) {
			Save();
		}
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}

     var hasInArguments = Boolean(
	 payload['arguments'] &&
	 payload['arguments'].execute &&
	 payload['arguments'].execute.inArguments &&
	 payload['arguments'].execute.inArguments.length > 0
	);

	var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
	
	console.log(inArguments);
	
	$.each(inArguments, function(index, inArgument) {
	 $.each(inArgument function (key, val) {
	 
	 if (key === 'statusCode')
	 {
	   $('#statusCode').val(val);
	   
	 }
	 
	 });
	 
	});

   connection.trigger('updateButton', {
   button: 'next',
   text: 'done',
   visible: true
   
   });

	function save () {
		var statusCode = $('#statusCode').val();

		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};
		payload['arguments'].execute.inArguments = [{
			"statusCode": statusCode
		}];

		payload['metaData'].isConfigured = true;

		console.log(JSON.stringify(payload));

		connection.trigger('updateActivity', payload);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);

});
