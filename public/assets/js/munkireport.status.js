$(document).on('appReady', function(e, lang) {

	try {
		if (serialNumber) {}
	} catch (e) {
		alert('Error: status.js - No serialNumber');
		return;
	}

	//Add the status DIV
	$('div.mr-status_current').append($('<div>').addClass('status'));

	// If status on this page, get status data

	$('div.status').empty().append(function() {
		var me = $(this);
		$.getJSON(appUrl + '/module/status/retrieve/' + serialNumber + '/', function(data) {
			console.log(data);
			var largest = 0;
			for (i in data) {
				if (data[largest].timestamp < data[i].timestamp) {
					largest = i;
				}
			}
			data.status = data[largest].status || 'No Status';
			me.html(data.status);
			switch (data.status) {
				case "IN":
					me.addClass('statusIN');
					break;
				case "OUT":
					me.addClass('statusOUT');
					break;
				case "REPAIR":
					me.addClass('statusREPAIR');
					break;
				case "OVERDUE":
					me.addClass('statusOVERDUE');
					break;
				default:
					me.addClass('statusUNKNOWN');
					break;
			}
		});

	});

});

