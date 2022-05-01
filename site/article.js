"use strict";

if (window.hasOwnProperty('smartDev')) {
	window.addEventListener('DOMContentLoaded', function() {
		smartDev.surroundArticle();
		smartDev.addLineNumbers();
		smartDev.addCopyButtons();
		smartDev.addCrossRefs();
		smartDev.shadeDataRows();
	});


	window.addEventListener('load', function() {
		smartDev.movePitches();
	});
}
