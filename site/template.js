"use strict";

if (!window.hasOwnProperty('barzee')) {

window.barzee = {
	/** Reorganizes the structure of an HTML document or in other words,
	 * surrounds the article with this structure:
	 * <body>
	 *     <div class="back">
	 *         <div class="top"></div>
	 *         <div class="page">
	 *             <header></header>
	 *             <side>
	 *                 <nav></nav>
	 *                 <div class="author"></div>
	 *             </side>
	 *             <article></article>
	 *             <footer></footer>
	 *         </div>
	 *     </div>
	 * </body>
	 */
	surroundArticle: function() {
		let body = this.getByTagName('body');
		let article = this.getByTagName('article');
		body.removeChild(article);

		let modif = this.createModified();
		article.appendChild(modif);

		let back = this.createElem('div', 'back');
		let top = this.createElem('div', 'top');
		back.appendChild(top);

		let page = this.createElem('div', 'page');
		let header = this.createHeader();
		let side = this.createSide();
		let footer = this.createFooter();
		page.appendChild(header);
		page.appendChild(side);
		page.appendChild(article);
		page.appendChild(footer);

		back.appendChild(page);
		body.appendChild(back);
	},


	createHeader : function() {
		let header = this.createElem('header');
		let h2 = this.createElem('h2', null, null, 'Barzee’s Notes');
		let h3 = this.createElem('h3', null, null, 'Smart Software Development');
		header.appendChild(h2);
		header.appendChild(h3);
		return header;
	},


	createSide : function() {
		let side = this.createElem('div', 'side');
		let h2 = this.createElem('h2', null, null, 'Categories');
		let nav = this.createNav();
		side.appendChild(h2);
		side.appendChild(nav);
		h2 = this.createElem('h2', null, null, 'About the Author');
		let p = this.createElem('p');
		p.innerHTML = 'Rex A. Barzee is a professor of Computer Information Technology at Brigham Young University–Idaho. He is an inventor of two United States patents and the author of numerous books. He earned a bachelor’s and a master’s degree in Computer Science from Brigham Young University. Before becoming a professor, he worked for eight years as a software engineer. You can see his <a href="https://www.linkedin.com/in/rex-barzee-306a0b37/">full profile</a> at LinkedIn.';
		side.appendChild(h2);
		side.appendChild(p);
		return side;
	},


	createNav : function() {
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
		for (let i = 0;  i < items.length;  ++i) {
			let direc = items[i][0];
			let name = items[i][1];
			let li = this.createElem('li');
			let div = this.createElem('div');
			let a = this.createElem('a', null,
					{'href': '../' + direc + '/index.html'}, name);
			div.appendChild(a);
			li.appendChild(div);
			ul.appendChild(li);
		}
		nav.appendChild(ul);
		return nav;
	},


	createModified : function() {
		let modified = new Date(document.lastModified);
		let text = 'Last modified: ' + modified.toLocaleDateString();
		let div = this.createElem('div', 'modified', null, text);
		return div;
	},


	createFooter : function() {
		let footer = this.createElem('footer');
		let disclaim = this.createElem('p');
		disclaim.innerText = 'Rex A. Barzee used his best efforts in preparing this article.  These efforts include the development, research, and testing of the theories and computer programs in this article to determine their correctness. Mr. Barzee makes no warranty of any kind, expressed or implied, with regard to these programs or the documentation contained in this article. Mr. Barzee shall not be liable in any event for incidental or consequential damages in connection with, or arising out of, the furnishing, performance, or use of these programs.';
		let copy = this.createElem('p');
		copy.innerText = 'Copyright © 2022 Rex A. Barzee. All rights reserved.';
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


	getByTagName : function(name) {
		return document.getElementsByTagName(name)[0];
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
	}
};


	window.addEventListener('DOMContentLoaded', function() {
		barzee.surroundArticle();
		barzee.addLineNumbers();
	});
}
