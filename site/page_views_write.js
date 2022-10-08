"use strict";

/* The pageViews object
 * All other links (links to internal, non-downloaded documents) are
 * recorded when the document loads. */


smartDev.pageViews.barzeer = /(file:\/\/\/.+\/barzeer\.github\.io\/|https:\/\/barzeer\.github\.io\/)/;
smartDev.pageViews.protocol = /[^:]+:\/+/;


smartDev.pageViews.recordDoc = function() {
	smartDev.pageViews.writeView(document.referrer, window.location.href);
};


/** Records that a user viewed a document. */
smartDev.pageViews.writeView = function(source, target) {
	try {
		const barzeer = this.barzeer;
		const protocol = this.protocol;

		const abbreviate = function(url) {
			let remove = barzeer.test(url) ? barzeer : protocol;
			return url.replace(remove, '');
		};

		source = this.encodeURL(abbreviate(source));
		target = this.encodeURL(abbreviate(target));
		const tzo = new Date().getTimezoneOffset();

		let db = this.initDatabase();
		let ref = db.ref('/views/' + target);
		let obj = {
			'referrer':source,
			'when':firebase.database.ServerValue.TIMESTAMP,
			'tzo':tzo
		};
		ref.push(obj);

		// Because Firebase allows for only a few simultaneous
		// connections, disconnect from Firebase.
		setTimeout(function() { db.goOffline(); }, 2000);
	}
	catch (ex) {
		console.error('Error: ' + ex.toString());
	}
};


window.addEventListener('DOMContentLoaded', smartDev.pageViews.recordDoc);
