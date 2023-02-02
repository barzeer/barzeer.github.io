'use strict';

if (! window.hasOwnProperty('barzee')) {
	window.barzee = {};
}

barzee.count = {
	resetAll : function() {
		// Change the number of rows to 16 (0 - 15).
		$('input#txtMin').val(0);
		$('input#txtMax').val(15);
		barzee.count.changeLimits();

		// Reset the bases
		let bases = [2, 8, 16];
		$('table#count thead :text.base').each(function(index) {
			$(this).val(bases[index]);
			let event = {'target' : $(this).get(0)};
			barzee.count.changeBase(event);
		});

		let icon = $('img#unchecked').get(0);
		let iconAttrs = {
			src : icon.src,
			alt : icon.alt,
			title : icon.title
		};

		// Clear all the inputs and icons.
		let inputs = $('table#count tbody input:text:not([readonly])');
		inputs.attr('title', icon.title)
			.val('');
		inputs.next().attr(iconAttrs);
	},


	/** Selects all the text in an input. */
	selectAll : function(ev) { ev.target.select(); },


	/** Changes the keyboard focus to the previous or next input when
	* the user types an "up arrow", "down arrow", or the "enter" key. */
	changeFocus : function(ev) {
		let input = ev.target;
		let keynum = ev.which;
		switch (keynum) {
			case 38:  // up arrow
			case 13:  // enter
			case 40:  // down arrow
			{
				let cell = $(input).closest('td');
				let row = cell.closest('tr');
				let columnIndex = row.children('td').index(cell);
				let nextRow = keynum == 38 ? row.prev() : row.next();
				if (nextRow) {
					nextRow.children('td').eq(columnIndex)
						.children('input:text').focus();
					ev.preventDefault();
				}
			}
			break;
		}
	},


	fireChanged : function(ev) {
		let keycode = ev.which;
		if (keycode == 13) {
			$(ev.target).trigger('change');
		}
	},


	validateDecimal : function(ev) {
		return barzee.count.validate(ev, '0123456789');
	},

	/** Allows integers in any base up to base 36. */
	validateHigher : function(ev) {
		return barzee.count.validate(ev,
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
	},

	validate : function(ev, valids) {
		let keycode = ev.which;
		if (keycode != 0 && keycode != 8/*backspace*/) {
			let c = String.fromCharCode(keycode);
			if (valids.indexOf(c) == -1) {
				ev.preventDefault();
			}
		}
	},


	/** Changes the number of rows in the counting table. */
	changeLimits : function() {
		let min = parseInt($('input#txtMin').val());
		let max = parseInt($('input#txtMax').val());
		let desiredRows = Math.abs(max - min) + 1;
		let numRows = $('table#count tbody tr').length;
		if (numRows < desiredRows) {
			let firstAttrs = {
				size : 2,
				maxlength : 5,
				readonly : 'readonly'
			};
			let otherAttrs = {
				size : 8,
				maxlength : 8
			};
			let icon = $('img#unchecked').get(0);
			let iconAttrs = {
				src : icon.src,
				alt : icon.alt,
				title : icon.title
			};

			// Create rows and cells and add them
			// to the end of the counting table.
			let tbody = $('table#count tbody');
			for (let r = numRows;  r < desiredRows;  ++r) {
				let input = $('<input type="text">')
					.addClass('number')
					.attr(firstAttrs)
					.on('focus', barzee.count.selectAll)
					.on('keydown', barzee.count.changeFocus)
					.val(r);
				let cell = $('<td>').append(input);
				let row = $('<tr>').append(cell);

				for (let c = 0;  c < 3;  ++c) {
					let input = $('<input type="text">')
						.addClass('number')
						.attr(otherAttrs)
						.on('focus', barzee.count.selectAll)
						.on('keydown', barzee.count.changeFocus)
						.on('keypress', barzee.count.validateHigher)
						.on('blur', barzee.count.checkAnswer);
					let icon = $('<img>')
						.attr(iconAttrs);
					cell = $('<td>')
						.addClass('check')
						.append(input)
						.append(icon);
					row.append(cell);
				}

				tbody.append(row);
			}
		}
		else if (numRows > desiredRows) {
			// Remove the correct number of rows
			// from the end of the counting table.
			$('table#count tbody tr').slice(desiredRows).remove();
		}

		// Put numbers in the inputs in the Base 10 column.
		let val = min;
		let step = min < max ? 1 : -1;
		$('table#count tbody tr').each(function() {
			$(this).find('td:first input:text').val(val);
			val += step;
		});

		// Get the bases.
		let bases = [];
		$('table#count thead tr th input:text').each(function() {
			let base = parseInt($(this).val());
			bases.push(base);
		});

		// Check responses in all inputs.
		$('table#count tbody tr').each(function(rowIndex) {
			$(this).find('td input:text:not([readonly])').each(
			function(index) {
				barzee.count.checkAnswer2(bases[index], rowIndex, this);
			});
		});
	},


	changeBase : function(ev) {
		let baseInput = ev.target;
		let base = parseInt(baseInput.value);

		// Ensure the base is in the range [2, 36].
		base = Math.max(2, base);
		base = Math.min(base, 36);
		baseInput.value = base;

		let cell = $(baseInput).closest('th');
		let row = cell.closest('tr');
		let columnIndex = row.children('th').index(cell);

		// Check the contents of each cell of the column that baseInput is in.
		let body = row.closest('table').children('tbody');
		body.children('tr').each(function(rowIndex) {
			let row = $(this);
			let cell = row.children('td').eq(columnIndex);
			barzee.count.checkAnswer2(base, rowIndex, cell.find(':text'));
		});
	},


	/** Checks a single student response. */
	checkAnswer : function(ev) {
		let input = ev.target;
		let cell = $(input).closest('td');
		let row = cell.closest('tr');
		let columnIndex = row.children('td').index(cell);
		let rowIndex = row.closest('tbody').children('tr').index(row);
		let thead = row.closest('table').children('thead');
		let baseInput = thead.find('th').eq(columnIndex).find(':text');
		let base = parseInt($(baseInput).val());
		barzee.count.checkAnswer2(base, rowIndex, input);
	},


	checkAnswer2 : function(base, rowIndex, input) {
		let icon;
		let str = $(input).val().toLowerCase();
		if (str == '') {
			icon = $('img#unchecked').get(0);
		}
		else {
			let num = parseInt(str, base);
			let restr = num.toString(base).toLowerCase();
			let row = $('table#count tbody tr').eq(rowIndex)
			let correct = parseInt(row.find('td:first input').val());
			icon = (str == restr && num == correct) ?
				$('img#correct') : $('img#incorrect');
			icon = icon.get(0);
		}
		$(input).attr('title', icon.title);
		$(input).next().attr({
			src   : icon.src,
			alt   : icon.alt,
			title : icon.title
		});
	}
};


$(document).ready(function() {
	$('input#txtMin').on('change', barzee.count.changeLimits);
	$('input#txtMax').on('change', barzee.count.changeLimits);
	$('input.base').on('change', barzee.count.changeBase);

	// Add a jquery keypress handler to the five inputs at the top of the
	// document so the keypress events can all be handled by the same
	// function, even on non-conforming browsers such as IE.
	$('input#txtMin').add($('input#txtMax')).add($('input.base'))
		.on('keypress', barzee.count.validateDecimal)
		.on('keyup', barzee.count.fireChanged);

	barzee.count.resetAll();
});
