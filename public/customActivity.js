  
define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
	var payload = {};
	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
	
    connection.on('clickedNext', save);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

    }
	function initialize (data) {
		if (data) {
			payload = data;
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
	

	function save () {
		var statusCode = $('#statusCode').val();

		payload['arguments'].execute.inArguments = [{
			"Status Code": statusCode,
		}];

		payload['metaData'].isConfigured = true;

		console.log(payload);

		connection.trigger('updateActivity', payload);
	}


});
