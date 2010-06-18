$(document).ready(function () {
	$('div.setting_group a.cat').click(function () {
		$('table.settings').hide();
		
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
		}
		else {
			$(this).addClass('open');
			$(this).parent().children('table.settings').slideDown();
		}
		
		return false;
	});

	$('a.text').click(function () {
		if ($(this).hasClass('edit')) {
			var post_url = $('#current_url').html() + '/save';
		
			// get value td object
			var value_td = $(this).parent().parent().children('td.value');
			
			// setting name
			var setting_name = $(this).parent().parent().children('td.name').html();
			
			var current_value = value_td.html().trim();
			value_td.html('<form class="validate form mark_empty" rel="new setting" action="' + post_url + '"><input type="hidden" name="name" value="' + setting_name + '" /><input class="text required" style="width:100%" name="value" value="' + current_value + '" /></form>');
			
			$(this).removeClass('edit');
			$(this).addClass('save');
			$(this).html('save');
			
			return false;
		}
		else if ($(this).hasClass('save')) {
			// get form object
			var form = $(this).parent().parent().find('form');
			
			// get value td object
			var value_td = $(this).parent().parent().children('td.value');
			
			var post_url = form.attr('action');
			
			$.post(post_url, form.serialize(), function (data) {
				value_td.html(data);
				
				notice_ok('Setting saved successfully.');
			});
			
			$(this).removeClass('save');
			$(this).addClass('edit');
			$(this).html('edit');
			
			return false;
		}
	});
	
	$('a.toggle').click(function () {
		var post_url = $('#current_url').html() + '/save_toggle';
		
		var setting_name = $(this).parent().parent().children('td.name').html();
		
		var value_td = $(this).parent().parent().children('td.value');
		
		$.post(post_url, { 'name' : setting_name }, function (data) {
			value_td.html(data);
			
			notice_ok('Setting saved successfully.');
		});
		
		return false;
	});
});