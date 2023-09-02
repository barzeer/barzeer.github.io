'use strict';

if (window.hasOwnProperty('barzee')) {
	window.addEventListener('DOMContentLoaded', function() {
		barzee.surroundArticle();
		//barzee.fetchSourceCode();
		//barzee.addLineNumbers();
	});

	window.addEventListener('load', function() {
		hljs.highlightAll();
	});
}
