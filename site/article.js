'use strict';

if (window.hasOwnProperty('barzee')) {
	window.addEventListener('DOMContentLoaded', function() {
		barzee.surroundArticle();
		barzee.addLineNumbers();
		barzee.addCopyButtons();
		barzee.addCrossRefs();
		barzee.addHighlights();
		barzee.shadeDataRows();
	});

	/*
	window.addEventListener('load', function() {
	});
	*/
}
