'use strict';

if (! window.hasOwnProperty('barzee')) {
	window.barzee = {
		strings : {
			siteTitle : 'Barzee’s Notes',
			slogan : 'Smart Software Development',

			copyHint : 'Copy code to the clipboard',

			offHint : 'Click to turn off highlights.',
			onHint  : 'Move mouse over to turn on highlights.\n' +
						'Click to keep highlights on.',

			upHint : 'Scroll to the top of this document',

			modified : 'Last modified',
			copyrightNotice : 'Copyright © 2020 Rex A. Barzee. All rights reserved.',
			aboutAuthor : 'About the Author',
			disclaimer : 'Disclaimer'
		},

		/** Reorganizes the structure of the home index.html
		 * file. Surrounds the article with this structure:
		 * <body>
		 *     <div class="top"></div>
		 *     <div class="page">
		 *         <header></header>
		 *         <nav></nav>
		 *         <article></article>
		 *         <footer></footer>
		 *     </div>
		 * </body>
		 */
		surroundHome : function() {
			let body = document.querySelector('body');
			let article = document.querySelector('article');
			body.removeChild(article);

			let header = this.createHeader('', window.location.protocol, null);
			let footer = this.createHomeFooter();
			let page = this.createElem('div', 'page');
			page.appendChild(header);
			page.appendChild(article);
			page.appendChild(footer);

			let top = this.createElem('div', 'top');
			body.appendChild(top);
			body.appendChild(page);
		},


		/** Reorganizes the structure of an
		 * index.html file within a subfolder. */
		surroundIndex : function() {
			let body = document.querySelector('body');
			let article = document.querySelector('article');
			body.removeChild(article);

			let header = this.createHeader('../', window.location.protocol,
							window.location.pathname);
			let page = this.createElem('div', 'page');
			page.appendChild(header);
			page.appendChild(article);

			let top = this.createElem('div', 'top');
			body.appendChild(top);
			body.appendChild(page);
		},


		/** Reorganizes the structure of the other HTML files. */
		surroundArticle : function() {
			let body = document.querySelector('body');
			let article = document.querySelector('article');
			body.removeChild(article);
			let copy = this.createCopyright();
			article.appendChild(copy);

			let header = this.createHeader('../',
							window.location.protocol, null);
			let footer = this.createFooter();
			let page = this.createElem('div', 'page');
			page.appendChild(header);
			page.appendChild(article);
			page.appendChild(footer);

			let top = this.createElem('div', 'top');
			body.appendChild(top);
			body.appendChild(page);
		},


		createHeader : function(prefix, protocol, pathname) {
			const strings = this.strings;
			const createElem = this.createElem;

			let h2;
			if (prefix == '') {
				h2 = createElem('h2', null, null, strings.siteTitle);
			}
			else {
				h2 = createElem('h2');
				let suffix = (protocol == 'file:' ? 'index.html' : '');
				let a = createElem('a', null,
						{href : prefix + suffix}, strings.siteTitle);
				h2.appendChild(a);
			}
			let h3 = createElem('h3', null, null, strings.slogan);
			let nav = this.createNav(prefix, protocol, pathname);

			let header = createElem('header');
			header.appendChild(h2);
			header.appendChild(h3);
			header.appendChild(nav);
			return header;
		},


		createNav : function(prefix, protocol, pathname) {
			let folder = null;
			if (pathname) {
				let slash = pathname.lastIndexOf('/');
				let path = pathname.substring(0, slash);
				slash = path.lastIndexOf('/');
				folder = path.substring(slash + 1);
			}
			let suffix = (protocol == 'file:' ? '/index.html' : '/');

			const createElem = this.createElem;
			const items = [
				['python', 'Python'],
				['js', 'JavaScript'],
				['web', 'Web'],
				['c_cpp', 'C and C++'],
				['java', 'Java'],
				['database', 'Database'],
				['excel', 'Excel'],
				['math', 'Math'],
				['shell', 'Shell Scripts']
			];
			let ul = createElem('ul');
			for (let [directory, name] of items) {
				let li = createElem('li');
				let a = (directory == folder ?
						createElem('em', null, null, name) :
						createElem('a', null,
								{href : prefix + directory + suffix}, name));
				li.appendChild(a);
				ul.appendChild(li);
			}

			let nav = createElem('nav');
			nav.appendChild(ul);
			return nav;
		},


		/* This function sort of works. The code is correct and creates
		 * a div that contains the last date that a file was modified.
		 * Unfortunately, if the website uses a content management
		 * system like GitHub, each time the author pushes a commit to
		 * the main branch of the repository the system copies all the
		 * files. This means that the last modified date for all files
		 * becomes the last date that an author executed a push to the
		 * main branch.
		createModified : function() {
			let modified = new Date(document.lastModified);
			let text = 'Last modified ' + modified.toLocaleDateString();
			let div = this.createElem('div', 'modified', null, text);
			return div;
		},*/


		createCopyright : function() {
			const strings = this.strings;
			const createElem = this.createElem;
			const copyData = this.getCopyrightData();

			let inner = createElem('div');
			if (copyData.modified) {
				let mod = document.createTextNode(
						strings.modified + ' ' + copyData.modified);
				inner.appendChild(mod);
			}
			inner.appendChild(createElem('br'));
			let copy = document.createTextNode(copyData.notice);
			inner.appendChild(copy);

			//let svg = cse111.createSVG('svgArrowUp', null, strings.upHint);
			/* TODO
			let svg = document.createTextNode('Up');
			let button = createElem('button', 'up',
					{type : 'button', title : strings.upHint});
			button.appendChild(svg);
			button.addEventListener('click', function(){window.scroll(0, 0);});
			*/

			let outer = createElem('div', 'modcopy');
			outer.appendChild(inner);
			//outer.appendChild(button);
			return outer;
		},


		createHomeFooter : function() {
			const strings = this.strings;
			const createElem = this.createElem;

			let about = createElem('h2', null, null, strings.aboutAuthor);
			let img = createElem('img', null,
					{src : 'site/images/rappelling.jpg'});
			let author = this.createAuthor();
			let clear = createElem('div', 'clear');

			let footer = createElem('footer');
			footer.appendChild(img);
			footer.appendChild(about);
			footer.appendChild(author);
			footer.appendChild(clear);
			return footer;
		},


		createFooter : function() {
			const strings = this.strings;
			const createElem = this.createElem;

			let about = createElem('h2', null, null, strings.aboutAuthor);
			let img = createElem('img', null,
					{src : '../site/images/rappelling.jpg'});
			let author = this.createAuthor();
			let h2 = createElem('h2', null, null, strings.disclaimer);
			let disclaim = this.createDisclaimer();
			let clear = createElem('div', 'clear');

			let footer = createElem('footer');
			footer.appendChild(about);
			footer.appendChild(img);
			footer.appendChild(author);
			footer.appendChild(h2);
			footer.appendChild(disclaim);
			footer.appendChild(clear);
			return footer;
		},


		createAuthor : function() {
			let author = this.createElem('p');
			author.innerHTML = 'Rex A. Barzee is a professor of Computer Science at Brigham Young University–Idaho. He is an inventor of <a href="https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=IN%2F%22Barzee%3B+Rex+A.%22&d=PTXT">two United States patents</a> and the author of numerous courses <a href="https://www.amazon.com/Rex-Barzee/e/B006SYU4S0">and books</a>. He earned a bachelor’s and a master’s degree in computer science from Brigham Young University. Before becoming a professor, he worked for eight years as a software engineer. You can see his <a href="https://www.linkedin.com/in/rex-barzee-306a0b37/">full profile</a> at LinkedIn.';
			return author;
		},

		createDisclaimer : function() {
			let disclaim = this.createElem('p', null, null,
					'Mr. Barzee used his best efforts in preparing this article. These efforts include the development, research, and testing of the theories and computer programs in this article to determine their correctness. Mr. Barzee makes no warranty of any kind, expressed or implied, with regard to these programs or the documentation contained in this article. Mr. Barzee shall not be liable in any event for incidental or consequential damages in connection with, or arising out of, the furnishing, performance, or use of these programs.');
			return disclaim;
		},


		/** Gets the copyright notice and the last modified date, from
		 * the search engine structured data in this document's head.
		 * Returns the two values in an object. */
		getCopyrightData : function() {
			let notice = this.strings.copyrightNotice;
			let modified;
			const query = 'script[type="application/ld+json"]';
			const script = document.head.querySelector(query);
			if (script) {
				const object = JSON.parse(script.innerHTML);
				if (object.hasOwnProperty('copyrightNotice')) {
					notice = object.copyrightNotice;
				}
				if (object.hasOwnProperty('dateModified')) {
					modified = object.dateModified;
				}
			}
			return {notice : notice, modified : modified};
		},


		/** Creates and returns an HTML element in the current document. */
		createElem : function(tagName, clss, attrs, text) {
			let elem = document.createElement(tagName);
			if (clss) {
				elem.classList.add(clss);
			}
			if (attrs) {
				for (let name in attrs) {
					elem.setAttribute(name, attrs[name]);
				}
			}
			if (text) {
				elem.textContent = text;
			}
			return elem;
		},


		/** Fetches the contents from many files on the server. */
		fetchFiles : function(protocol, folder, examples) {
			const self = this;

			function encode(html) {
				return html
					.replaceAll('&', '&amp;')
					.replaceAll('<', '&lt;')
					.replaceAll('>', '&gt;');
			}

			for (let [container, filename] of examples) {
				let pathname = folder + '/' + filename;
				if (protocol == 'file:') {
					pathname = 'https://barzeer.github.io/' + pathname;
				}

				let closure = (function (id) {
					return function (text) {
						let elem = document.getElementById(id);
						let encoded = encode(text);
						elem.innerHTML = encoded;
					};
				})(container);

				fetch(pathname)
				.then(function (response) {
					if (response.status != 200) {
						throw new URIError('status: ' + response.status +
								JSON.stringify(response));
					}
					return response.text();
				})
				.then(closure)
				.catch(function (error) {
					console.error(JSON.stringify(error));
					console.error(error);
				});
			}
		},


		/** Adds line numbers to all <pre class="linenums"> elements. */
		addLineNumbers : function() {
			const createElem = this.createElem;
			const newline = /\n|<br>/g;
			const elements = document.querySelectorAll('pre.linenums');
			for (let pre of elements) {
				let code = pre.nextElementSibling.textContent;
				if (code.length > 0) {

					// If the pre.linenums element contains
					// any children nodes, remove them.
					pre.replaceChildren();

					let span = createElem('span', null, null, '1');
					pre.appendChild(span);
					let count = code.split(newline).length;
					for (let n = 2;  n <= count;  ++n) {
						pre.appendChild(document.createTextNode('\n'));
						let span = createElem('span', null, null, n.toString());
						pre.appendChild(span);
					}
				}
			}
		},


		copyCodeToClipboard : function(divId) {
			let div = document.getElementById(divId);
			let pre = div.querySelector('pre.code');
			this.copyToClipboard(pre);
		},


		copyToClipboard : function(pre) {
			const text = pre.textContent;

			// Copy the text to the clipboard.
			function listener(event) {
				event.clipboardData.setData('text/plain', text);
				event.preventDefault();
			}
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);

			// Select the text as a hint to the user that it was
			// copied to the clipboard. Selecting the text is not
			// necessary for copying the text to the clipboard.
			// Selecting the text is simply feedback to the user.
			const select = window.getSelection();
			let range = document.createRange();
			range.selectNodeContents(pre);
			select.removeAllRanges();
			select.addRange(range);
		},


		/** Adds code and classes to line number cross references. */
		addCrossRefs : function() {
			function getReferences(target) {
				const space = /(\s|&nbsp;|<br>)+/g;

				// Notice the dash and en dash in the character class.
				const dash = /[-–]|&ndash;/;

				let text = target.textContent;
				let candidates = text.split(space);
				let references = [];
				for (let candidate of candidates) {
					if (dash.test(candidate)) {
						let limits = candidate.split(dash);
						let start = parseInt(limits[0]);
						let end = parseInt(limits[1]);
						if (! (Number.isNaN(start) || Number.isNaN(end))) {
							for (let n = start;  n <= end;  ++n) {
								references.push(n);
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
			}

			function getAllLineNumbers(target) {
				let refId = target.getAttribute('data-ref');
				let div = document.getElementById(refId);
				let lineNumPre = div.querySelector('pre.linenums');
				return lineNumPre.children;
			}

			function getLineNumber(lineNumbers, key) {
				// The line numbers begin with 1 at index 0 and are
				// sequential, so it's easy to find and return the
				// span with the desired line number.
				return lineNumbers[key - 1];
			}

			function on(event) {
				/** Turn on highlighting for one or more line numbers. */
				let target = event.target;
				let lineNumbers = getAllLineNumbers(target);
				let references = getReferences(target);
				for (let number of references) {
					let elem = getLineNumber(lineNumbers, number);
					elem.classList.add('hi');
				}
			}

			function off(event) {
				/** Turn off highlighting for one or more line numbers. */
				let target = event.target;
				let lineNumbers = getAllLineNumbers(target);
				let references = getReferences(target);
				for (let number of references) {
					let elem = getLineNumber(lineNumbers, number);
					elem.classList.remove('hi');
				}
			}

			function toggle(event) {
				const strings = barzee.strings;
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
					target.setAttribute('title', strings.offHint);
				}
				else {
					// Highlights are on because the user clicked on the
					// target. The user has now clicked on the target again,
					// so turn off the highlights.
					let lineNumbers = getAllLineNumbers(target);
					let references = getReferences(target);
					for (number of references) {
						let elem = getLineNumber(lineNumbers, number);
						elem.classList.remove('hi');
					}
					target.removeAttribute('data-on');
					target.addEventListener('mouseover', on);
					target.addEventListener('mouseout', off);
					target.setAttribute('title', strings.onHint);
				}
			}

			// Add event handlers to each <span class="cross"> element.
			let targets = document.querySelectorAll('span.cross');
			for (let target of targets) {
				target.addEventListener('mouseover', on);
				target.addEventListener('mouseout', off);
				target.addEventListener('click', toggle);
				target.setAttribute('title', strings.onHint);
			}
		},


		/** Adds a button to all div.pre elements that will copy to the
		 * clipboard, the code that is within the div's pre.code child
		 * element. */
		addCodeCopyButtons : function() {
			const self = this;
			function copyFunc(event) {
				const button = event.currentTarget;
				const div = button.parentElement;
				const pre = div.querySelector('pre.code');
				self.copyToClipboard(pre);
			}

			const copyHint = self.strings.copyHint;
			const createElem = self.createElem;
			const elements = document.querySelectorAll('div.pre');
			for (let div of elements) {
				let image = createElem('img', null,
						{src : '../site/icons/copy.png', alt : copyHint});
				let button = createElem('button', 'copy',
						{type : 'button', title : copyHint});
				button.addEventListener('click', copyFunc);
				button.appendChild(image);
				div.appendChild(button);
			}
		},


		addHighlights : function() {
			function on(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high').split(' ');
				for (let id of idents) {
					let elem = document.getElementById(id);
					elem.classList.add('highlight');
				}
			}

			function off(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high').split(' ');
				for (let id of idents) {
					let elem = document.getElementById(id);
					elem.classList.remove('highlight');
				}
			}

			function on2(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high2').split(' ');
				for (let id of idents) {
					let elem = document.getElementById(id);
					elem.classList.add('highlight2');
				}
			}

			function off2(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high2').split(' ');
				for (let id of idents) {
					let elem = document.getElementById(id);
					elem.classList.remove('highlight2');
				}
			}

			let elements = document.querySelectorAll('[data-high]');
			for (let elem of elements) {
				elem.addEventListener('mouseover', on);
				elem.addEventListener('mouseout', off);
			}
			elements = document.querySelectorAll('[data-high2]');
			for (let elem of elements) {
				elem.addEventListener('mouseover', on2);
				elem.addEventListener('mouseout', off2);
			}
		},


		/** Add the "shaded" class to every third row in data tables. */
		shadeDataRows : function() {
			let tables = document.querySelectorAll('table.data');
			for (let table of tables) {
				let rows = table.querySelectorAll('tbody tr');
				for (let r = 2;  r < rows.length;  r += 3) {
					rows[r].classList.add('shaded');
				}
			}
		}
	};
}
