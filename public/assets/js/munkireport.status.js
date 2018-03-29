/*!
 * Status for MunkiReport
 * requires bootstrap-markdown.js (http://github.com/toopay/bootstrap-markdown)
 */
$(document).on('appReady', function(e, lang) {

	try {
		if(serialNumber){}
	} catch(e) {
		alert('Error: status.js - No serialNumber');
		return;
	}

	//Initialize marked library
	var markdown_parser = marked;
	markdown_parser.setOptions({
	  renderer: new marked.Renderer(),
	  gfm: true,
	  tables: true,
	  breaks: true,
	  pedantic: false,
	  sanitize: true,
	  smartLists: true,
	  smartypants: false
	});

	var addStatus = function() {

			var section = $(this).data('section'),
				statusdiv = $(this).prev(),
				editor = '',
				saveStatus = function(){

					// add parsed text to hidden field
					var html = editor.parseContent();
					$('#myModal input[name="html"]').val(html);

					// Get formdata
					var formData = $('#myModal form').serializeArray();

					// Save status
					var jqxhr = $.post( appUrl + "/module/status/save", formData);

					jqxhr.done(function(data){

						// Update status in page
						statusdiv.html(html);

						// Dismiss modal
						$('#myModal').modal('hide');
					})

				}

			$('#myModal .modal-body')
				.empty()
				.append($('<form>')
					.submit(saveStatus)
					.append($('<input>')
						.attr('type', 'submit')
						.addClass('invisible'))
					.append($('<input>')
						.attr('type', 'hidden')
						.attr('name', 'serial_number')
						.val(serialNumber))
					.append($('<input>')
						.attr('type', 'hidden')
						.attr('name', 'section')
						.val(section))
					.append($('<input>')
						.attr('type', 'hidden')
						.attr('name', 'html'))
					.append($('<div>')
						.addClass('form-group')
						.append($('<label>')
							.text(i18n.t("dialog.status.label")))));

			$.getJSON( appUrl + '/module/status/retrieve/' + serialNumber + '/' + section, function( data ) {
				data.text = data.text || ''
				$('textarea').text(data.text)
			});


			$('#myModal button.ok')
				.text(i18n.t("dialog.save"))
				.off()
				.click(saveStatus);
			$('#myModal .modal-title').text(i18n.t("dialog.status.add"));
			$('#myModal').modal('show');
		}

	// If status on this page, get status data
	$('div.status')
		.empty()
		.append(function(){
			var me = $(this),
				section = $(this).data('section');
			$.getJSON( appUrl + '/module/status/retrieve/' + serialNumber + '/' + section, function( data ) {
				data.html = data.html || 'No Status'
				me.html(data.html)
					.after($('<button>')
						.addClass('btn btn-default hidden-print')
						.data('section', section)
						.click(addStatus)
						.text('Change Status'))
			});

		});

});
