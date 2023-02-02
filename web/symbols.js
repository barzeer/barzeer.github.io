'use strict';

if (! window.hasOwnProperty('barzee')) {
	window.barzee = {};
}

barzee.symbols = {
	makeButtons : function() {
		const article = document.body.querySelector('article');
		const textarea = article.querySelector('textarea');


		function copyFunc(event) {
			const button = event.target;
			const text = button.innerHTML;

			// Get the current scroll position of the document because
			// in order for .setSelectionRange() to work, we must call
			// .focus(), and calling .focus() causes the page to jump to
			// the textarea.
			//
			// It seems to be incredibly difficult to reliably get the
			// scroll position in all browsers.
			const x = window.pageXOffset || window.scrollX ||
					window.scrollLeft ||
					document.body.scrollLeft ||
					document.documentElement.scrollLeft ||
					document.getElementsByTagName('html')[0].scrollLeft;
			const y = window.pageYOffset || window.scrollY ||
					window.scrollTop ||
					document.body.scrollTop ||
					document.documentElement.scrollTop ||
					document.getElementsByTagName('html')[0].scrollTop;

			// Copy the text into the textarea
			// at the bottom of the document.
			let start = textarea.selectionStart;
			let end = textarea.selectionEnd;
			let currval = textarea.value;
			let newval = currval.substring(0, start) + text +
				currval.substring(end, currval.length);
			start++;
			textarea.value = newval;
			textarea.focus();
			textarea.setSelectionRange(start, start, 'forward');

			// Reset the scroll position to what it was before inserting
			// the text into the textarea.
			window.scrollTo(x, y);

			// Copy the text to the clipboard.
			const listener = function(event) {
				event.clipboardData.setData('text/plain', text);
				event.preventDefault();
			};
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);
		}


		function Group(heading, clss, buttons) {
			return {heading: heading, clss: clss, buttons: buttons};
		}

		function Single(name, entity) {
			let button = document.createElement('button');
			button.setAttribute('type', 'button');
			button.setAttribute('data-title', name);
			button.setAttribute('data-shift-title', name);
			button.setAttribute('data-entity', entity);
			button.setAttribute('data-shift-entity', entity);
			button.setAttribute('title', name);
			button.innerHTML = entity;
			button.addEventListener('click', copyFunc);
			return button;
		}

		function Double(name, entity, shiftName, shiftEntity) {
			let button = document.createElement('button');
			button.setAttribute('type', 'button');
			button.setAttribute('data-title', name);
			button.setAttribute('data-shift-title', shiftName);
			button.setAttribute('data-entity', entity);
			button.setAttribute('data-shift-entity', shiftEntity);
			button.setAttribute('title', name);
			button.innerHTML = entity;
			button.addEventListener('click', copyFunc);
			return button;
		}

		const groups = [
			Group('Quotes', 'quotes',
				[Double('left single quote', '&lsquo;',
						'left double quote', '&ldquo;'),
				 Double('right single quote', '&rsquo;',
						'right double quote', '&rdquo;')]),

			Group('Dashes', 'dashes',
				[Single('em dash', '&mdash;'),
				 Single('en dash', '&ndash;'),
				 Single('non-breaking hyphen', '&#x2011;')]),

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
				[Double('times', '&times;',
						'one tenth', '&#x2152;'),
				 Double('divide', '&div;',
						'one ninth', '&#x2151;'),
				 Double('plus', '&plus;',
						'one eighth', '&frac18;'),
				 Double('minus', '&minus;',
						'one seventh', '&#x2150;'),
				 Double('square root', '&#x221a;',
						'one sixth', '&frac16;'),
				 Double('cube root', '&#x221b;',
						'one fifth', '&frac15;'),
				 Double('quad root', '&#x221c;',
						'one fourth', '&frac14;'),
				 Double('less than or equal', '&#x2264;',
						'one third', '&frac13;'),
				 Double('greater than or equal', '&#x2265;',
						'three eighths', '&frac38;'),
				 Double('not equal', '&#x2260;',
						'two fifths', '&frac25;'),
				 Double('equivalent', '&#x2248;',
						'one half', '&frac12;'),
				 Double('not equivalent', '&#x2249;',
						'three fifths', '&frac35;'),
				 Double('degrees', '&deg;',
						'five eighths', '&frac58;'),
				 Double('infinity', '&infin;',
						'two thirds', '&frac23;'),
				 Double('for each', '&#x2203;',
						'three fourths', '&frac34;'),
				 Double('for all', '&#x2200;',
						'four fifths', '&frac45;'),
				 Double('element of', '&#x2208;',
						'five sixths', '&frac56;'),
				 Double('not an element of', '&#x2209;',
						'seven eighths', '&frac78;'),
				 Single('subset of', '&#x2282;'),
				 Single('not a subset of', '&#x2284;'),
				 Single('union', '&#x22c3;'),
				 Single('intersection', '&#x22c2;')]),

			Group('Currency', 'currency',
				[Single('cent', '&cent;'),
				 Single('euro', '&euro;'),
				 Single('pound', '&pound;'),
				 Single('yen', '&yen;'),
				 Single('peso', '&#x20b1;')]),

			Group('Others', 'others',
				[Single('section', '&sect;'),
				 Single('paragraph', '&para;'),
				 Single('horizontal ellipsis', '&hellip;'),
				 Single('vertical ellipsis', '&vellip;'),
				 Single('copyright', '&copy;'),
				 Single('registered trademark', '&reg;')])
		];

		for (let g = 0;  g < groups.length;  ++g) {
			let group = groups[g];

			// Create a new heading element and
			// append it to the document article.
			let heading = document.createElement('h2');
			heading.innerText = group.heading;
			article.insertBefore(heading, textarea);

			// Create a div that will contain buttons.
			let div = document.createElement('div');
			div.classList.add('buttons');
			div.classList.add(group.clss);
			let buttons = group.buttons;
			for (let b = 0;  b < buttons.length;  ++b) {
				div.appendChild(buttons[b]);
			}

			// Append the new div to the document article.
			article.insertBefore(div, textarea);
		}
	},


	prevKeyEvent : null,
	attribNames : [['data-title', 'data-entity'],
					['data-shift-title', 'data-shift-entity']],


	keydown : function(event) {
		let code = event.code;
		if (code == 'ShiftLeft' || code == 'ShiftRight') {
			let symbols = barzee.symbols;
			let currKeyEvent = 'down ' + code;

			// This if statement guards against repeated key down events
			// that are caused by the user holding down shift key.
			if (currKeyEvent != symbols.prevKeyEvent) {
				symbols.changeButtons(symbols.attribNames[1]);
				symbols.prevKeyEvent = currKeyEvent;
			}
		}
	},


	keyup : function(event) {
		let code = event.code;
		if (code == 'ShiftLeft' || code == 'ShiftRight' || code == 'CapsLock') {
			let symbols = barzee.symbols;
			if (code == 'CapsLock') {
				// Because the user pressed (down and then up) the Caps
				// Lock key, swap the attribute names that the keydown
				// and keyup functions use for the Shift keys.
				let attribNames = symbols.attribNames;
				let swap = attribNames[0];
				attribNames[0] = attribNames[1];
				attribNames[1] = swap;
			}
			symbols.changeButtons(symbols.attribNames[0]);
			symbols.prevKeyEvent = 'up ' + code;
		}
	},


	changeButtons : function(attribNames) {
		let titleKey = attribNames[0];
		let entityKey = attribNames[1];
		let buttons = document.getElementsByTagName('button');
		for (let i = 0;  i < buttons.length;  ++i) {
			let button = buttons[i];
			let title = button.getAttribute(titleKey);
			let entity = button.getAttribute(entityKey);
			button.title = title;
			button.innerHTML = entity;
		}
	}
};


window.addEventListener('DOMContentLoaded', barzee.symbols.makeButtons);
document.addEventListener('keydown', barzee.symbols.keydown);
document.addEventListener('keyup', barzee.symbols.keyup);
