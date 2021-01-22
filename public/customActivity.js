  
define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
	var payload = {};  
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
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');


	function initialize (data) {
		if (data) {
			payload = data;
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
	 
	 if (key === 'eventdefinitionkey')
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
			connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
			break;
		}
	}
	

	function save () {
		var statusCode = $('#statusCode').val();

		payload['arguments'].execute.inArguments = [{
			"statusCode": statusCode
		}];

		payload['metaData'].isConfigured = true;

		console.log(payload);

		connection.trigger('updateActivity', payload);
	}


});

	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');


	function initialize (data) {
		if (data) {
			payload = data;
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
	 
	 if (key === 'message')
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
			connection.trigger('updateButton', {
                        button: 'next',
                        text: 'done',
                        visible: true
        });
			break;
		}
	}
	

	function save () {
		var statusCode = $('#statusCode').val();

		payload['arguments'].execute.inArguments = [{
			"message": statusCode
		}];

		payload['metaData'].isConfigured = true;

		console.log(payload);

		connection.trigger('updateActivity', payload);
	}


});
