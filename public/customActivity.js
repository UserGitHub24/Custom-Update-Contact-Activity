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
		if (currentStep.key === 'eventdefinitionkey') {
			save();
		} else {
			connection.trigger('nextStep');
		}
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}


	function onGotoStep (step) {
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step, stepIndex) {
		if (stepIndex && !step) {
			step = steps[stepIndex - 1];
		}

		currentStep = step;

		$('.step').hide();

		switch 	(currentStep.key) {
		case 'eventdefinitionkey':
			$('#step1').show();
			$('#step1 input').focus();
			break;
		}
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
	connection.on('gotoStep', onGotoStep);

});
