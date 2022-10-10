"use strict";

if (! window.hasOwnProperty('smartDev')) {
	window.smartDev = {};
}

smartDev.pageViews = {
	initFirebase : function() {
		if (! firebase.apps.length) {
			const config = {
				apiKey: "AIzaSyCedeJh8BVhSTfgxDaIQ0KaHDaM-4pAkCw",
				authDomain: "page-views-1.firebaseapp.com",
				databaseURL: "https://page-views-1-default-rtdb.firebaseio.com",
				projectId: "page-views-1",
				storageBucket: "page-views-1.appspot.com",
				messagingSenderId: "61297772601",
				appId: "1:61297772601:web:51f03bc4f1fbd7d54ca5e8"
			};

			// Initialize Firebase.
			firebase.initializeApp(config);
		}
	},

	database : null,

	initDatabase : function() {
		let db = this.database;
		if (! db) {
			this.initFirebase();

			// Get the Firebase Realtime Database.
			db = this.database = firebase.database();
		}
		db.goOnline();
		return db;
	},


	symbols : {
		'%':'%25',
		' ':'%20', '!':'%21',  '#':'%23', '&':'%26',
		',':'%2c', '.':'%2e',  '/':'%2f',
		':':'%3a', ';':'%3b',  '=':'%3d', '?':'%3f',
		'[':'%5b', '\\':'%5c', ']':'%5d'
	},
	symbolsRegex : null,
	encodings : null,
	encodingsRegex : null,

	makeEncodings : function() {
		let encodings = this.encodings;
		if (! encodings) {
			const keys = Object.keys(this.symbols).join('');
			this.symbolsRegex = new RegExp('[' + keys + ']', 'g');

			encodings = {};
			let values = [];
			let symbols = this.symbols;
			for (let symbol in symbols) {
				let value = symbols[symbol];
				encodings[value] = symbol;
				values.push(value.replace('%', ''));
			}
			this.encodings = encodings;
			this.encodingsRegex = new RegExp('%('+ values.join('|') +')', 'g');
		}
	},

	encodeURL : function(url) {
		const symbols = this.symbols;
		return url.replace(this.symbolsRegex,
				function(match0) { return symbols[match0]; });
	},

	decodeURL : function(url) {
		const encodings = this.encodings;
		return url.replace(this.encodingsRegex,
				function(match0) { return encodings[match0]; });
	}
};


smartDev.pageViews.makeEncodings();
