'use strict';

if (! window.hasOwnProperty('barzee')) {
	window.barzee = {};
}

barzee.unicode = {
	makeButtons : function() {
		const quarry = document.getElementById('quarry');
		const article = document.body.querySelector('article');

		function copyFunc(event) {
			//const text = event.target.innerHTML;
			const text = event.target.getAttribute('data-symbol');

			function listener(event) {
				event.clipboardData.setData('text/plain', text);
				event.preventDefault();
			}

			// Copy the text to the clipboard.
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);
		}


		function symbolFromEntity(entity) {
			quarry.innerHTML = entity;
			return quarry.textContent;
		}


		function Group(heading, clss, buttons) {
			return {heading: heading, clss: clss, buttons: buttons};
		}

		function Space() {
			return document.createElement('span');
		}

		function Single(name, entity) {
			const symbol = symbolFromEntity(entity);
			let button = document.createElement('button');
			button.setAttribute('type', 'button');
			button.setAttribute('data-symbol', symbol);
			button.setAttribute('title', name);
			button.textContent = symbol;
			button.addEventListener('click', copyFunc);
			return button;
		}

		function Double(name, entity, shiftName, shiftEntity) {
			let button = Single(name, entity);
			const symbol = button.getAttribute('data-symbol');
			const shiftSymbol = symbolFromEntity(shiftEntity);
			button.setAttribute('data-title', name);
			button.setAttribute('data-entity', symbol);
			button.setAttribute('data-shift-title', shiftName);
			button.setAttribute('data-shift-entity', shiftSymbol);
			return button;
		}

		function Control(name, abbrev, entity) {
			let button = Single(name, abbrev);
			const symbol = symbolFromEntity(entity);
			button.setAttribute('data-symbol', symbol);
			return button;
		}

		const groups = [
			Group('Quotes', 'quotes',
				[Double('left single quote', '&lsquo;',
						'left double quote', '&ldquo;'),
				 Double('right single quote', '&rsquo;',
						'right double quote', '&rdquo;')]),

			Group('Punctuation', 'punc',
				[Single('em dash', '&mdash;'),
				 Single('en dash', '&ndash;'),
				 Single('non-breaking hyphen', '&#x2011;'),
				 Single('horizontal ellipsis', '&hellip;'),
				 Single('vertical ellipsis', '&vellip;'),
				 Single('inverted question mark', '&#x00bf;'),
				 Single('inverted exclamation mark', '&#x00a1;')]),

			Group('Latin Letters with Accents', 'latin',
				[Double('lower a with grave', '&agrave;',
						'upper A with grave', '&Agrave;'),
				 Double('lower a with acute', '&aacute;',
						'upper A with acute', '&Aacute;'),
				 Double('lower a with circumflex', '&acirc;',
						'upper A with circumflex', '&Acirc;'),
				 Double('lower a with tilde', '&atilde;',
						'upper A with tilde', '&Atilde;'),
				 Double('lower a with diaeresis', '&auml;',
						'upper A with diaeresis', '&Auml;'),
				 Double('lower a with ring', '&aring;',
						'upper A with ring', '&Aring;'),
				 Double('lower ae ligature', '&aelig;',
						'upper AE ligature', '&AElig;'),
				 Double('lower c with cedilla', '&ccedil;',
						'upper C with cedilla', '&Ccedil;'),
				 Double('lower e with grave', '&egrave;',
						'upper E with grave', '&Egrave;'),
				 Double('lower e with acute', '&eacute;',
						'upper E with acute', '&Eacute;'),
				 Double('lower e with circumflex', '&ecirc;',
						'upper E with circumflex', '&Ecirc;'),
				 Double('lower e with diaeresis', '&euml;',
						'upper E with diaeresis', '&Euml;'),
				 Double('lower i with grave', '&igrave;',
						'upper I with grave', '&Igrave;'),
				 Double('lower i with acute', '&iacute;',
						'upper I with acute', '&Iacute;'),
				 Double('lower i with circumflex', '&icirc;',
						'upper I with circumflex', '&Icirc;'),
				 Double('lower i with diaeresis', '&iuml;',
						'upper I with diaeresis', '&Iuml;'),
				 Double('lower n with tilde', '&ntilde;',
						'upper N with tilde', '&Ntilde;'),
				 Double('lower o with grave', '&ograve;',
						'upper O with grave', '&Ograve;'),
				 Double('lower o with acute', '&oacute;',
						'upper O with acute', '&Oacute;'),
				 Double('lower o with circumflex', '&ocirc;',
						'upper O with circumflex', '&Ocirc;'),
				 Double('lower o with tilde', '&otilde;',
						'upper O with tilde', '&Otilde;'),
				 Double('lower o with diaeresis', '&ouml;',
						'upper O with diaeresis', '&Ouml;'),
				 Double('lower u with grave', '&ugrave;',
						'upper U with grave', '&Ugrave;'),
				 Double('lower u with acute', '&uacute;',
						'upper U with acute', '&Uacute;'),
				 Double('lower u with circumflex', '&ucirc;',
						'upper U with circumflex', '&Ucirc;'),
				 Double('lower u with tilde', '&utilde;',
						'upper U with tilde', '&Utilde;'),
				 Double('lower u with diaeresis', '&uuml;',
						'upper U with diaeresis', '&Uuml;')]),

			Group('Greek Letters', 'greek',
				[Double('lower alpha', '&alpha;',
						'upper alpha', '&Alpha;'),
				 Double('lower beta;', '&beta;',
						'upper Beta;', '&Beta;'),
				 Double('lower gamma;', '&gamma;',
						'upper Gamma;', '&Gamma;'),
				 Double('lower delta;', '&delta;',
						'upper Delta;', '&Delta;'),
				 Double('lower epsilon;', '&epsilon;',
						'upper Epsilon;', '&Epsilon;'),
				 Double('lower zeta;', '&zeta;',
						'upper Zeta;', '&Zeta;'),
				 Double('lower eta;', '&eta;',
						'upper Eta;', '&Eta;'),
				 Double('lower theta;', '&theta;',
						'upper Theta;', '&Theta;'),
				 Double('lower iota;', '&iota;',
						'upper Iota;', '&Iota;'),
				 Double('lower kappa;', '&kappa;',
						'upper Kappa;', '&Kappa;'),
				 Double('lower lambda;', '&lambda;',
						'upper Lambda;', '&Lambda;'),
				 Double('lower mu;', '&mu;',
						'upper Mu;', '&Mu;'),
				 Double('lower nu;', '&nu;',
						'upper Nu;', '&Nu;'),
				 Double('lower omicron;', '&omicron;',
						'upper Omicron;', '&Omicron;'),
				 Double('lower pi;', '&pi;',
						'upper Pi;', '&Pi;'),
				 Double('lower rho;', '&rho;',
						'upper Rho;', '&Rho;'),
				 Double('lower sigma;', '&sigma;',
						'upper Sigma;', '&Sigma;'),
				 Double('lower tau;', '&tau;',
						'upper Tau;', '&Tau;'),
				 Double('lower upsilon;', '&upsilon;',
						'upper Upsilon;', '&Upsilon;'),
				 Double('lower phi;', '&phi;',
						'upper Phi;', '&Phi;'),
				 Double('lower psi;', '&psi;',
						'upper Psi;', '&Psi;'),
				 Double('lower omega;', '&omega;',
						'upper Omega;', '&Omega;')]),

			Group('Mathematical', 'math',
				[Single('times', '&times;'),
				 Single('divide', '&div;'),
				 Single('plus', '&plus;'),
				 Single('minus', '&minus;'),
				 Double('square root', '&#x221a;',
						'one tenth', '&#x2152;'),
				 Double('cube root', '&#x221b;',
						'one ninth', '&#x2151;'),
				 Double('quad root', '&#x221c;',
						'one eighth', '&frac18;'),
				 Double('less than or equal', '&#x2264;',
						'one seventh', '&#x2150;'),
				 Double('greater than or equal', '&#x2265;',
						'one sixth', '&frac16;'),
				 Double('not equal', '&#x2260;',
						'one fifth', '&frac15;'),
				 Double('equivalent', '&#x2248;',
						'one fourth', '&frac14;'),
				 Double('not equivalent', '&#x2249;',
						'one third', '&frac13;'),
				 Double('degrees', '&deg;',
						'three eighths', '&frac38;'),
				 Double('infinity', '&infin;',
						'two fifths', '&frac25;'),
				 Double('for each', '&#x2203;',
						'one half', '&frac12;'),
				 Double('for all', '&#x2200;',
						'three fifths', '&frac35;'),
				 Double('element of', '&#x2208;',
						'five eighths', '&frac58;'),
				 Double('not an element of', '&#x2209;',
						'two thirds', '&frac23;'),
				 Double('subset of', '&#x2282;',
						'three fourths', '&frac34;'),
				 Double('not a subset of', '&#x2284;',
						'four fifths', '&frac45;'),
				 Double('union', '&#x22c3;',
						'five sixths', '&frac56;'),
				 Double('intersection', '&#x22c2;',
						'seven eighths', '&frac78;')]),

			Group('Arrows', 'arrows',
				[Single('north west arrow', '&nwarr;'),
				 Single('up arrow', '&uarr;'),
				 Single('north east arrow', '&nearr;'),
				 Single('left arrow', '&larr;'),
				 Space(),
				 Single('right arrow', '&rarr;'),
				 Single('south west arrow', '&swarr;'),
				 Single('down arrow', '&darr;'),
				 Single('south east arror', '&searr;')]),

			Group('Currency', 'currency',
				[Single('cent', '&cent;'),
				 Single('euro', '&euro;'),
				 Single('pound', '&pound;'),
				 Single('yen', '&yen;'),
				 Single('peso', '&#x20b1;')]),

			Group('Others', 'others',
				[Single('section', '&sect;'),
				 Single('paragraph', '&para;'),
				 Single('copyright', '&copy;'),
				 Single('registered trademark', '&reg;')]),

			Group('Control', 'control',
				[Control('null', 'NUL', '&#x0000;'),
				 Control('acknowledge', 'ACK', '&#x0006;'),
				 Control('negative acknowledge', 'NAK', '&#x0015;'),
				 Control('cancel', 'CAN', '&#x0018;'),
				 Control('bell', 'BEL', '&#x0007;'),
				 Control('tab',  'TAB', '&#x0009;'),
				 Control('vertical tab', 'VT', '&#x000b;'),
				 Control('carriage return', 'CR', '&#x000d;'),
				 Control('line feed, new line', 'LF', '&#x000a;'),
				 Control('form feed, new page', 'FF', '&#x000c;'),
				 Control('escape', 'ESC', '&#x001b;'),
				 Control('backspace', 'BS', '&#x0008;'),
				 Control('delete', 'DEL', '&#x007f;')])
		];

		const next = document.getElementById('unknown');
		for (let group of groups) {

			// Create a new heading element and
			// append it to the document article.
			let heading = document.createElement('h2');
			heading.textContent = group.heading;
			article.insertBefore(heading, next);

			// Create a div that will contain buttons.
			let div = document.createElement('div');
			div.classList.add('buttons');
			div.classList.add(group.clss);
			for (let button of group.buttons) {
				div.appendChild(button);
			}

			// Append the new div to the document article.
			article.insertBefore(div, next);
		}
	},


	prevKeyEvent : null,
	attribNames : [['data-title', 'data-entity'],
					['data-shift-title', 'data-shift-entity']],


	keydown : function(event) {
		let code = event.code;
		if (code == 'ShiftLeft' || code == 'ShiftRight') {
			let unicode = barzee.unicode;
			let currKeyEvent = 'down ' + code;

			// This if statement guards against repeated key down events
			// that are caused by the user holding down the shift key.
			if (currKeyEvent != unicode.prevKeyEvent) {
				unicode.changeButtons(unicode.attribNames[1]);
				unicode.prevKeyEvent = currKeyEvent;
			}
		}
	},


	keyup : function(event) {
		const code = event.code;
		if (code == 'ShiftLeft' || code == 'ShiftRight' || code == 'CapsLock') {
			const unicode = barzee.unicode;
			const attribNames = unicode.attribNames;
			if (code == 'CapsLock') {
				// Because the user pressed (down and then up) the Caps
				// Lock key, swap the attribute names that the keydown
				// and keyup functions use for the Shift keys.
				let swap = attribNames[0];
				attribNames[0] = attribNames[1];
				attribNames[1] = swap;
			}
			unicode.changeButtons(attribNames[0]);
			unicode.prevKeyEvent = 'up ' + code;
		}
	},


	changeButtons : function(attribNames) {
		const titleKey = attribNames[0];
		const entityKey = attribNames[1];
		const buttons = document.querySelectorAll('button[data-shift-title]');
		for (let button of buttons) {
			let title = button.getAttribute(titleKey);
			let symbol = button.getAttribute(entityKey);
			button.title = title;
			button.setAttribute('data-symbol', symbol);
			button.textContent = symbol;
		}
	},


	/** Event listener for the text input at the bottom of the webpage. */
	charToHex : function(event) {
		const input = event.target;
		const text = input.value;
		let sep = '';
		let points = '';
		for (let ch of text) {
			let code = ch.codePointAt(0);
			points += sep + code.toString(16);
			sep = ' ';
		}
		let output = input.closest('.charToHex').querySelector('.hex');
		output.textContent = points;
	}
};


window.addEventListener('DOMContentLoaded', barzee.unicode.makeButtons);
document.addEventListener('keydown', barzee.unicode.keydown);
document.addEventListener('keyup', barzee.unicode.keyup);
