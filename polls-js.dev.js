// Variables
var poll_id = 0;
var poll_answer_id = '';
var is_being_voted = false;
pollsL10n.show_loading = parseInt(pollsL10n.show_loading);
pollsL10n.show_fading = parseInt(pollsL10n.show_fading);

// When User Vote For Poll
function poll_vote(current_poll_id, changin) {
	jQuery(document).ready(function($) {
		if(!is_being_voted) {
			set_is_being_voted(true);
			poll_id = current_poll_id;
			poll_answer_id = '';
			poll_multiple_ans = 0;
			poll_multiple_ans_count = 0;
			if($('#poll_multiple_ans_' + poll_id).length) {
				poll_multiple_ans = parseInt($('#poll_multiple_ans_' + poll_id).val());
			}
			$('#polls_form_' + poll_id + ' input:checkbox, #polls_form_' + poll_id + ' input:radio, #polls_form_' + poll_id + ' option').each(function(i){
				if ($(this).is(':checked') || $(this).is(':selected')) {
					if(poll_multiple_ans > 0) {
						poll_answer_id = $(this).val() + ',' + poll_answer_id;
						poll_multiple_ans_count++;
					} else {
						poll_answer_id = parseInt($(this).val());
					}
				}
			});
			if(poll_multiple_ans > 0) {
				if(poll_multiple_ans_count > 0 && poll_multiple_ans_count <= poll_multiple_ans) {
					poll_answer_id = poll_answer_id.substring(0, (poll_answer_id.length-1));
					poll_process();
				} else if(poll_multiple_ans_count == 0) {
					set_is_being_voted(false);
					alert(pollsL10n.text_valid);
				} else {
					set_is_being_voted(false);
					alert(pollsL10n.text_multiple + ' ' + poll_multiple_ans);
				}
			} else {
				if(poll_answer_id > 0) {
					poll_process();
				} else {
					set_is_being_voted(false);
					alert(pollsL10n.text_valid);
				}
			}
		} else {
			alert(pollsL10n.text_wait);
		}
	});
}

// Process Poll (User Click "Vote" Button)
function poll_process() {
	jQuery(document).ready(function($) {
		$('.fair-polls-reqreplymsg').remove();
		$('.fair-polls-replymsg').remove();
		poll_nonce = $('#poll_' + poll_id + '_nonce').val();
		if(pollsL10n.show_fading) {
			$('#polls-' + poll_id).fadeTo('def', 0);
			if(pollsL10n.show_loading) {
				$('#polls-' + poll_id + '-loading').show();
			}
			$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=process&poll_id=' + poll_id + '&poll_' + poll_id + '=' + poll_answer_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
		} else {
			if(pollsL10n.show_loading) {
				$('#polls-' + poll_id + '-loading').show();
			}
			$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=process&poll_id=' + poll_id + '&poll_' + poll_id + '=' + poll_answer_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
		}
	});
}

// Poll's Result (User Click "View Results" Link)
function poll_result(current_poll_id) {
	jQuery(document).ready(function($) {
		$('.fair-polls-reqreplymsg').remove();
		$('.fair-polls-replymsg').remove();
		if(!is_being_voted) {
			set_is_being_voted(true);
			poll_id = current_poll_id;
			poll_nonce = $('#poll_' + poll_id + '_nonce').val();
			if(pollsL10n.show_fading) {
				$('#polls-' + poll_id).fadeTo('def', 0);
				if(pollsL10n.show_loading) {
					$('#polls-' + poll_id + '-loading').show();
				}
				$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=result&poll_id=' + poll_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
			} else {
				if(pollsL10n.show_loading) {
					$('#polls-' + poll_id + '-loading').show();
				}
				$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=result&poll_id=' + poll_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
			}
		} else {
			alert(pollsL10n.text_wait);
		}
	});
}

// Poll's Voting Booth  (User Click "Vote" Link or "Change Vote" Link)
function poll_booth(current_poll_id, chnge) { // bumbum chnge
	jQuery(document).ready(function($) {
		if(!is_being_voted) {
			set_is_being_voted(true);
			poll_id = current_poll_id;
			poll_nonce = $('#poll_' + poll_id + '_nonce').val();
			if(pollsL10n.show_fading) {
				$('#polls-' + poll_id).fadeTo('def', 0);
				if(pollsL10n.show_loading) {
					$('#polls-' + poll_id + '-loading').show();
				}
				$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=booth&poll_id=' + poll_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
			} else {
				if(pollsL10n.show_loading) {
					$('#polls-' + poll_id + '-loading').show();
				}
				$.ajax({type: 'POST', xhrFields: {withCredentials: true}, url: pollsL10n.ajax_url, data: 'action=polls&view=booth&poll_id=' + poll_id + '&poll_' + poll_id + '_nonce=' + poll_nonce, cache: false, success: poll_process_success});
			}
		} else {
			alert(pollsL10n.text_wait);
		}
	});
}

// Poll Process Successfully
function poll_process_success(data) {
	jQuery(document).ready(function($) {
		$('#polls-' + poll_id).replaceWith(data);
		if(pollsL10n.show_loading) {
			$('#polls-' + poll_id + '-loading').hide();
		}
		if(pollsL10n.show_fading) {
			$('#polls-' + poll_id).fadeTo('def', 1);
			set_is_being_voted(false);
		} else {
			set_is_being_voted(false);
		}

		$('.fair-polls input[checked="checked"]:checked').click();

	});
}

// Set is_being_voted Status
function set_is_being_voted(voted_status) {
	is_being_voted = voted_status;
}

// bumbum
function check_vote_msg(input, chnge) {
	jQuery(document).ready(function($) {
		if($(input).is(':checked')) {
			if($(input).attr('checked') == 'checked' && chnge){
				$('.fair-polls input.submit').attr('disabled', 'disabled').attr('class','disabled');
				$('.fair-polls-reqreplymsg').hide();
				$('.fair-polls-replymsg').hide();
			} else {
				$('.fair-polls input[disabled="disabled"]').removeAttr('disabled').attr('class','button submit');
				if($(input).attr('reqarg') == 1){
					$('.fair-polls-reqreplymsg').fadeTo('def', 1);//show();
					$('.fair-polls-replymsg').hide();
				} else {
					$('.fair-polls-replymsg').fadeTo('def', 1);//show();
					$('.fair-polls-reqreplymsg').hide();
				}
			}
		} else {
			$('.fair-polls-reqreplymsg').hide();
			$('.fair-polls-replymsg').hide();
			$('.fair-polls input.disabled').removeAttr('disabled').attr('class','button submit');
		}
	});
}
