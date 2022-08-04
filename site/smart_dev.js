"use strict";

if (!window.hasOwnProperty('smartDev')) {
	window.smartDev = {
		/** Reorganizes the structure of the home index.html file. */
		surroundHome : function() {
			let body = document.querySelector('body');
			let article = document.querySelector('article');
			body.removeChild(article);

			let top = this.createElem('div', 'top');
			let page = this.createElem('div', 'page');
			body.appendChild(top);
			body.appendChild(page);

			let header = this.createHeader();
			let nav = this.createNav(window.location.pathname);
			let footer = this.createHomeFooter();
			page.appendChild(header);
			page.appendChild(nav);
			page.appendChild(article);
			page.appendChild(footer);
		},

		surroundIndex : function() {
			let body = document.querySelector('body');
			let article = document.querySelector('article');
			body.removeChild(article);

			let top = this.createElem('div', 'top');
			let page = this.createElem('div', 'page');
			body.appendChild(top);
			body.appendChild(page);

			let header = this.createHeader();
			let nav = this.createNav(window.location.pathname);
			page.appendChild(header);
			page.appendChild(nav);
			page.appendChild(article);
		},


		/** Reorganizes the structure of an HTML document or in other
		 * words, surrounds the article with this structure:
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

			let top = this.createElem('div', 'top');
			let page = this.createElem('div', 'page');
			body.appendChild(top);
			body.appendChild(page);

			let header = this.createHeader();
			let nav = this.createNav(null);
			let footer = this.createFooter();
			page.appendChild(header);
			page.appendChild(nav);
			page.appendChild(article);
			page.appendChild(footer);
		},


		createHeader : function() {
			let header = this.createElem('header');
			let h2 = this.createElem('h2');
			let a = this.createElem('a',
					null, {href: '../'}, 'Barzee’s Notes');
			h2.appendChild(a);
			let h3 = this.createElem('h3',
					null, null, 'Smart Software Development');
			header.appendChild(h2);
			header.appendChild(h3);
			return header;
		},


		createNav : function(pathname) {
			let nav = this.createElem('nav');

			let h2 = this.createElem('h2', null, null, 'Categories');
			nav.appendChild(h2);

			let ul = this.createElem('ul');
			nav.appendChild(ul);

			let items = [
				['python', 'Python'],
				['js', 'JavaScript'],
				['java', 'Java'],
				['c_cpp', 'C and C++'],
				['shell', 'Shell Scripts'],
				['database', 'Database'],
				//['modeling', 'Modeling'],
				['excel', 'Excel'],
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
						{'href': '../' + direc + '/'}, name);
				div.appendChild(text);
				li.appendChild(div);
				ul.appendChild(li);
			}
			return nav;
		},


		// This function sort of works. The code is correct and creates
		// a div that contains the last date that a file was modified.
		// Unfortunately, if the website uses a content management
		// system like GitHub, the system copies all the files each time
		// the author pushes a commit to the main branch of the
		// repository. This means that the last modified date for all
		// files becomes the last date that an author executed a push to
		// the main branch.
		//createModified : function() {
		//	let modified = new Date(document.lastModified);
		//	let text = 'Last modified: ' + modified.toLocaleDateString();
		//	let div = this.createElem('div', 'modified', null, text);
		//	return div;
		//},


		createHomeFooter : function() {
			let img = this.createElem('img', null,
					{src:'site/images/rappelling.jpg'});
			let about = this.createElem('h2', null, null, 'About the Author');
			let author = this.createAuthor();

			let footer = this.createElem('footer');
			footer.appendChild(img);
			footer.appendChild(about);
			footer.appendChild(author);
			return footer;
		},


		createFooter : function() {
			let year = new Date(document.lastModified).getFullYear();
			let copy = this.createElem('p', 'clear', null,
					'Copyright © '+year+' Rex A. Barzee. All rights reserved.');
			let about = this.createElem('h2', null, null, 'About the Author');
			let img = this.createElem('img', null,
					{src:'../site/images/rappelling.jpg'});
			let author = this.createAuthor();
			let h2 = this.createElem('h2', null, null, 'Disclaimer');
			let disclaim = this.createDisclaimer();

			let footer = this.createElem('footer');
			footer.appendChild(copy);
			footer.appendChild(about);
			footer.appendChild(img);
			footer.appendChild(author);
			footer.appendChild(h2);
			footer.appendChild(disclaim);
			return footer;
		},


		createAuthor : function() {
			let author = this.createElem('p');
			author.innerHTML = 'Rex A. Barzee is a professor of Computer Information Technology at Brigham Young University–Idaho. He is an inventor of <a href="https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=IN%2F%22Barzee%3B+Rex+A.%22&d=PTXT">two United States patents</a> and the author of numerous courses <a href="https://www.amazon.com/Rex-Barzee/e/B006SYU4S0">and books</a>. He earned a bachelor’s and a master’s degree in computer science from Brigham Young University. Before becoming a professor, he worked for eight years as a software engineer. You can see his <a href="https://www.linkedin.com/in/rex-barzee-306a0b37/">full profile</a> at LinkedIn.';
			return author;
		},

		createDisclaimer : function() {
			let disclaim = this.createElem('p', null, null,
					'Mr. Barzee used his best efforts in preparing this article. These efforts include the development, research, and testing of the theories and computer programs in this article to determine their correctness. Mr. Barzee makes no warranty of any kind, expressed or implied, with regard to these programs or the documentation contained in this article. Mr. Barzee shall not be liable in any event for incidental or consequential damages in connection with, or arising out of, the furnishing, performance, or use of these programs.');
			return disclaim;
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


		addHighlights : function() {
			const on = function(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high').split(' ');
				for (let i = 0;  i < idents.length;  ++i) {
					let id = idents[i];
					let elem = document.getElementById(id);
					elem.classList.add('highlight');
				}
			};

			const off = function(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high').split(' ');
				for (let i = 0;  i < idents.length;  ++i) {
					let id = idents[i];
					let elem = document.getElementById(id);
					elem.classList.remove('highlight');
				}
			};

			const on2 = function(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high2').split(' ');
				for (let i = 0;  i < idents.length;  ++i) {
					let id = idents[i];
					let elem = document.getElementById(id);
					elem.classList.add('highlight2');
				}
			};

			const off2 = function(event) {
				let target = event.currentTarget;
				let idents = target.getAttribute('data-high2').split(' ');
				for (let i = 0;  i < idents.length;  ++i) {
					let id = idents[i];
					let elem = document.getElementById(id);
					elem.classList.remove('highlight2');
				}
			};

			let elements = document.querySelectorAll('[data-high]');
			for (let i = 0;  i < elements.length;  ++i) {
				let elem = elements[i];
				elem.addEventListener('mouseover', on);
				elem.addEventListener('mouseout', off);
			}
			elements = document.querySelectorAll('[data-high2]');
			for (let i = 0;  i < elements.length;  ++i) {
				let elem = elements[i];
				elem.addEventListener('mouseover', on2);
				elem.addEventListener('mouseout', off2);
			}
		},


		/** Add the "shaded" class to every third row in data tables. */
		shadeDataRows : function() {
			let tables = document.querySelectorAll('table.data');
			for (let t = 0;  t < tables.length;  ++t) {
				let table = tables[t];
				let rows = table.querySelectorAll('tbody tr');
				for (let r = 2;  r < rows.length;  r += 3) {
					rows[r].classList.add('shaded');
				}
			}
		}
	};
}
