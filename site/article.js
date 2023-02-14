'use strict';

if (window.hasOwnProperty('barzee')) {
	window.addEventListener('DOMContentLoaded', function() {
		barzee.surroundArticle();
		barzee.addLineNumbers();
		barzee.addCodeCopyButtons();
		barzee.addCrossRefs();
		barzee.addHighlights();
		barzee.shadeDataRows();
	});
}
