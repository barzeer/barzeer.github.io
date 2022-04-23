"use strict";

if (!window.hasOwnProperty('smartDev')) {
window.smartDev = {
	surroundIndex : function() {
		let body = document.querySelector('body');
		let article = document.querySelector('article');
		body.removeChild(article);

		let modif = this.createModified();
		article.appendChild(modif);

		let top = this.createElem('div', 'top');

		let page = this.createElem('div', 'page');
		let header = this.createHeader();
		let side = this.createSide(window.location.pathname);

		let footer = this.createElem('footer');
		let copy = this.createElem('p', null, null,
				'Copyright © 2022 Rex A. Barzee. All rights reserved.');
		footer.appendChild(copy);

		page.appendChild(header);
		page.appendChild(side);
		page.appendChild(article);
		page.appendChild(footer);

		body.appendChild(top);
		body.appendChild(page);
	},


	/** Reorganizes the structure of an HTML document or in other words,
	 * surrounds the article with this structure:
	 * <body>
	 *     <div class="top"></div>
	 *     <div class="page">
	 *         <header></header>
	 *         <div class="side">
	 *             <nav></nav>
	 *             <div class="author"></div>
	 *         </div>
	 *         <article></article>
	 *         <footer></footer>
	 *     </div>
	 * </body>
	 */
	surroundArticle : function() {
		let body = document.querySelector('body');
		let article = document.querySelector('article');
		body.removeChild(article);

		let modif = this.createModified();
		article.appendChild(modif);

		let top = this.createElem('div', 'top');

		let page = this.createElem('div', 'page');
		let header = this.createHeader();
		let side = this.createSide();
		let footer = this.createFooter();
		page.appendChild(header);
		page.appendChild(side);
		page.appendChild(article);
		page.appendChild(footer);

		body.appendChild(top);
		body.appendChild(page);
	},


	createHeader : function() {
		let header = this.createElem('header');
		let h2 = this.createElem('h2');
		let a = this.createElem('a',
				null, {'href': '../index.html'}, 'Barzee’s Notes');
		h2.appendChild(a);
		let h3 = this.createElem('h3',
				null, null, 'Smart Software Development');
		header.appendChild(h2);
		header.appendChild(h3);
		return header;
	},


	createSide : function(pathname) {
		let side = this.createElem('div', 'side');
		let h2 = this.createElem('h2', null, null, 'Categories');
		let nav = this.createNav(pathname);
		side.appendChild(h2);
		side.appendChild(nav);
		h2 = this.createElem('h2', null, null, 'About the Author');
		let author = this.createAuthor();
		side.appendChild(h2);
		side.appendChild(author);
		return side;
	},


	createNav : function(pathname) {
		let nav = this.createElem('nav');
		let ul = this.createElem('ul');
		let items = [
			['python', 'Python'],
			['javascript', 'JavaScript'],
			['java', 'Java'],
			['c_cpp', 'C and C++'],
			['shell', 'Shell Scripts'],
			['database', 'Database'],
			['modeling', 'Modeling'],
			['excel', 'Microsoft Excel'],
			['math', 'Math']
		];
		let folder = null;
		if (pathname) {
			let slash = pathname.lastIndexOf('/');
			let path = pathname.substring(0, slash);
			slash = path.lastIndexOf('/');
			folder = path.substring(slash + 1);
		}
		for (let i = 0;  i < items.length;  ++i) {
			let direc = items[i][0];
			let name = items[i][1];
			let li = this.createElem('li');
			let div = this.createElem('div');
			let text = folder == direc ?
				this.createElem('em', null, null, name) :
				this.createElem('a', null,
					{'href': '../' + direc + '/index.html'}, name);
			div.appendChild(text);
			li.appendChild(div);
			ul.appendChild(li);
		}
		nav.appendChild(ul);
		return nav;
	},


	createAuthor : function() {
		let author = this.createElem('p');
		author.innerHTML = 'Rex A. Barzee is a professor of Computer Information Technology at Brigham Young University–Idaho. He is an inventor of <a href="https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=IN%2F%22Barzee%3B+Rex+A.%22&d=PTXT">two United States patents</a> and the author of <a href="https://www.amazon.com/Rex-Barzee/e/B006SYU4S0">numerous books</a>. He earned a bachelor’s and a master’s degree in Computer Science from Brigham Young University. Before becoming a professor, he worked for eight years as a software engineer. You can see his <a href="https://www.linkedin.com/in/rex-barzee-306a0b37/">full profile</a> at LinkedIn.';
		return author;
	},


	createModified : function() {
		let modified = new Date(document.lastModified);
		let text = 'Last modified: ' + modified.toLocaleDateString();
		let div = this.createElem('div', 'modified', null, text);
		return div;
	},


	createFooter : function() {
		let footer = this.createElem('footer');
		let disclaim = this.createElem('p', null, null,
				'Rex A. Barzee used his best efforts in preparing this article.  These efforts include the development, research, and testing of the theories and computer programs in this article to determine their correctness. Mr. Barzee makes no warranty of any kind, expressed or implied, with regard to these programs or the documentation contained in this article. Mr. Barzee shall not be liable in any event for incidental or consequential damages in connection with, or arising out of, the furnishing, performance, or use of these programs.');
		let copy = this.createElem('p', null, null,
				'Copyright © 2022 Rex A. Barzee. All rights reserved.');
		footer.appendChild(disclaim);
		footer.appendChild(copy);
		return footer;
	},


	createElem : function(tagName, clss, attrs, text) {
		let elem = document.createElement(tagName);
		if (clss) {
			elem.classList.add(clss);
		}
		if (attrs) {
			for (let name in attrs) {
				let value = attrs[name];
				elem.setAttribute(name, value);
			}
		}
		if (text) {
			elem.innerText = text;
		}
		return elem;
	},


	createText : function(text) {
		return document.createTextNode(text);
	},


	/** Adds line numbers to all pre elements. */
	addLineNumbers : function() {
		const newline = /\n|<br>/g;
		const elems = document.querySelectorAll('pre.linenums');
		for (let i = 0;  i < elems.length;  ++i) {
			let elem = elems[i];
			let code = elem.nextElementSibling.innerHTML;
			let count = code.split(newline).length;

			let span = this.createElem('span', null, null, '1');
			elem.appendChild(span);
			for (let n = 2;  n <= count;  ++n) {
				elem.appendChild(this.createText('\n'));
				let span = this.createElem('span', null, null, n.toString());
				elem.appendChild(span);
			}
		}
	},


	/** Adds a button to div.pre elements that will copy the code
	 * within the div's last child pre element to the clipboard. */
	addCopyButtons : function() {
		const copyFunc = function(event) {
			const button = event.currentTarget;
			const div = button.parentElement;
			const elems = div.getElementsByTagName('pre');
			const pre = elems[elems.length - 1];

			// Copy the text to the clipboard.
			const text = pre.textContent;
			const listener = function(event) {
				event.clipboardData.setData('text/plain', text);
				event.preventDefault();
			};
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);

			// Select the text as a hint to the user that it was
			// copied to clipboard. Selecting the text is not
			// necessary for copying the text to the clipboard.
			const select = window.getSelection();
			let range = document.createRange();
			range.selectNodeContents(pre);
			select.removeAllRanges();
			select.addRange(range);
		};

		const elems = document.querySelectorAll('div.pre');
		for (let i = 0;  i < elems.length;  ++i) {
			let image = this.createElem('img', null,
					{'src': '../site/icons/copy.png',
					 'alt': 'Copy code to the clipboard'});
			let button = this.createElem('button', 'copy',
					{'type': 'button',
					 'title': 'Copy code to the clipboard'});
			button.addEventListener('click', copyFunc);
			button.appendChild(image);
			elems[i].appendChild(button);
		}
	},


	addCrossRefs : function() {
		const getReferences = function(target) {
			const space = /(\s|&nbsp;|<br>)+/g;

			// Notice the dash and en dash in the character class.
			const dash = /[-–]|&ndash;/;

			let text = target.innerText;
			let candidates = text.split(space);
			let references = [];
			for (let i = 0;  i < candidates.length;  ++i) {
				let candidate = candidates[i];
				if (dash.test(candidate)) {
					let limits = candidate.split(dash);
					let start = parseInt(limits[0]);
					let end = parseInt(limits[1]);
					if (! (Number.isNaN(start) || Number.isNaN(end))) {
						for (let j = start;  j <= end;  ++j) {
							references.push(j);
						}
					}
				}
				else {
					let linenum = parseInt(candidate);
					if (! Number.isNaN(linenum)) {
						references.push(linenum);
					}
				}
			}
			return references;
		};

		const getAllLineNumbers = function(target) {
			let refId = target.getAttribute('data-ref');
			let div = document.getElementById(refId);
			let lineNumPre = div.getElementsByTagName('pre')[0];
			return lineNumPre.children;
		};

		const findLineNumber = function(lineNumbers, key) {
			// The line numbers begin with 1 at index 0 and are
			// sequential, so it's easy to find and return the
			// span with the desired line number.
			return lineNumbers[key - 1];
		};

		const on = function(event) {
			/** Turn on highlighting for one or more line numbers. */
			let target = event.target;
			let lineNumbers = getAllLineNumbers(target);
			let references = getReferences(target);
			for (let i = 0;  i < references.length;  ++i) {
				let number = references[i];
				let elem = findLineNumber(lineNumbers, number);
				elem.classList.add('hi');
			}
		};

		const off = function(event) {
			/** Turn off highlighting for one or more line numbers. */
			let target = event.target;
			let lineNumbers = getAllLineNumbers(target);
			let references = getReferences(target);
			for (let i = 0;  i < references.length;  ++i) {
				let number = references[i];
				let elem = findLineNumber(lineNumbers, number);
				elem.classList.remove('hi');
			}
		};

		const toggle = function(event) {
			let target = event.target;
			let state = target.getAttribute('data-on');
			if (state == null) {
				// Highlights are on because the user moved the mouse
				// into the target before clicking on it. Because the
				// user clicked on the target, set the highlights to
				// stay on after the user moves out of the target.
				target.removeEventListener('mouseover', on);
				target.removeEventListener('mouseout', off);
				target.setAttribute('data-on', 'true');
				target.setAttribute('title', 'Click to turn off highlights.');
			}
			else {
				// Highlights are on because the user clicked on the
				// target. The user has now clicked on the target again,
				// so turn off the highlights.
				let lineNumbers = getAllLineNumbers(target);
				let references = getReferences(target);
				for (let i = 0;  i < references.length;  ++i) {
					let number = references[i];
					let elem = findLineNumber(lineNumbers, number);
					elem.classList.remove('hi');
				}
				target.removeAttribute('data-on');
				target.addEventListener('mouseover', on);
				target.addEventListener('mouseout', off);
				target.setAttribute('title', 'Move mouse over to turn on highlights.\nClick to keep highlights on.');
			}
		};

		// Add event handlers to each span that has a class of 'cross'.
		let targets = document.querySelectorAll('span.cross');
		for (let i = 0;  i < targets.length;  ++i) {
			let target = targets[i];
			target.addEventListener('mouseover', on);
			target.addEventListener('mouseout', off);
			target.addEventListener('click', toggle);
			target.setAttribute('title', 'Move mouse over to turn on highlights.\nClick to keep highlights on.');
		}
	},


	movePitches : function() {
		const figures = document.querySelectorAll('figure.pitch[data-sibling]');
		for (let i = 0;  i < figures.length;  ++i) {
			let figure = figures[i];
			let id = figure.getAttribute('data-sibling');
			let sibling = document.getElementById(id);
			let top = sibling.getBoundingClientRect().top;
			console.log(top);
			figure.style.top = top + "px";
			console.log(figure.style.top);
			console.log(figure.getBoundingClientRect().top);
		}
	}
};
}
