"use strict";

if (!window.hasOwnProperty('cse111')) {
	window.cse111 = {};
}

cse111.anim = {
	resizeCanvas : function() {
		const div = document.querySelector('div.pre');
		const canvas = document.querySelector('div.pre > canvas');
		const width = div.scrollWidth;
		const height = div.scrollHeight;
		//console.log(width, height);
		canvas.width = width;
		canvas.height = height;
	},


	script : [],

	buildScript : function () {
		const self = this;
		const script = self.script;
		const lineNums = document.querySelectorAll('div.pre > pre.linenums > span.line');
		const codeLines = document.querySelectorAll('div.pre > pre.python span.line');
		const termLines = document.querySelectorAll('pre.console > span');

		const explanation = document.querySelector('div.pre > div.explain');
		const canvas = document.querySelector('div.pre > canvas');
		const width = canvas.width;
		const height = canvas.height;
		//console.log(width, height);

		const numChars = 56
		const numLines = 37
		const charWidth = width / numChars;
		const lineHeight = height / numLines;

		const ctx = canvas.getContext('2d');

		/*
		// Call main
		ctx.beginPath();
		ctx.moveTo(6*charWidth, 36*lineHeight);
		ctx.lineTo(6*charWidth, 5.5*lineHeight);
		ctx.lineTo(8*charWidth, 5.5*lineHeight);
		ctx.stroke();

		//ctx.fillStyle = "#4040ff";
		//ctx.fillRect(0, 0, width, height);
		//ctx.fillStyle = "#ff8040";
		//let x = width / 2;
		//let y = height / 2;
		//let radius = width / 4;
		//ctx.arc(x, y, radius, 0, 2*Math.PI);
		//ctx.fill();
		*/

		function explain(x, y, w, h, text, delay) {
			return function() {
				//console.log(text);
				explanation.style.left = Math.floor(x * charWidth) + 'px';
				explanation.style.top = Math.floor(y * lineHeight) + 'px';
				explanation.style.width = Math.floor(w * charWidth) + 'px';
				explanation.style.height = Math.floor(h * lineHeight) + 'px';
				explanation.innerText = text;
				explanation.style.display = 'block';
				return delay;
			};
		};

		function pcOff(lineNum) {
			const executing = 'executing';
			let index = lineNum - 1;
			let line = lineNums[index];
			if (line.classList.contains(executing)) {
				line.classList.remove(executing);
				line = codeLines[index];
				line.classList.remove(executing);
			}
		};

		function execute(lineNum, delay) {
			return function() {
				//console.log('execute(' + lineNum + ')');
				function pcOn(lineNum) {
					const executing = 'executing';
					let index = lineNum - 1;
					let line = lineNums[index];
					line.classList.add(executing);
					line = codeLines[index];
					line.classList.add(executing);
				};

				for (let lineNum = 1;  lineNum <= lineNums.length;  ++lineNum) {
					pcOff(lineNum);
				}
				pcOn(lineNum);
				return delay;
			};
		};

		function store(varId, value) {
			return function() {
				//console.log('store');
				document.getElementById(varId).innerText = value;
				return 2000;
			};
		};

		function drawArrow(fromX, fromY, toX, toY) {
			function radians(degrees) {
				return degrees * Math.PI / 180;
			}

			fromX *= charWidth;
			fromY *= lineHeight;
			toX *= charWidth;
			toY *= lineHeight;
			let diffX = toX - fromX;
			let diffY = toY - fromY;
			let alpha = Math.atan2(diffY, diffX);
			console.log(alpha / Math.PI * 180);

			let barbLen = 15;
			let angle = radians(145);

			let beta = alpha - angle;
			let x1 = toX + barbLen * Math.cos(beta);
			let y1 = toY + barbLen * Math.sin(beta);

			beta = alpha + angle;
			let x2 = toX + barbLen * Math.cos(beta);
			let y2 = toY + barbLen * Math.sin(beta);

			ctx.lineWidth = 4;
			ctx.strokeStyle = "#20ff40";
			ctx.beginPath();
			ctx.moveTo(fromX, fromY);
			ctx.lineTo(toX, toY);
			ctx.moveTo(x1, y1);
			ctx.lineTo(toX, toY);
			ctx.moveTo(x2, y2);
			ctx.lineTo(toX, toY);
			ctx.stroke();
		}

		function copyArg(argId, fromX, fromY, toX, toY, paramId) {
			return function() {
				//console.log('copyArg');
				drawArrow(fromX, fromY, toX, toY);
				let value = document.getElementById(argId).innerText;
				document.getElementById(paramId).innerText = value;
				return 2000;
			};
		};

		function returnVal(fromX, fromY, toX, toY, delay) {
			return function() {
				drawArrow(fromX, fromY, toX, toY);
				return delay;
			};
		};

		function typeInConsole(lineNum, text) {
			return function() {
				// Create an array of random delays to simulate pausing
				// between pressing keys while typing int the console.
				let total = 0;
				let pauses = new Array(text.length);
				for (let i = 0;  i < pauses.length;  ++i) {
					let pause = 50 + Math.floor(Math.random() * 100);
					pauses[i] = pause;
					total += pause;
				}

				let line = termLines[lineNum - 1];
				let index = 0;

				function typeNext() {
					line.innerText += text[index];
					if (++index < text.length) {
						setTimeout(typeNext, pauses[index]);
					}
				}

				line.classList.add('new');
				typeNext();
				setTimeout(function() {
					line.classList.remove('new');
					line.classList.add('recent');
					setTimeout(function() { line.classList.remove('recent'); }, 3000);
				}, total + 3000);

				return total + 1000;
			};
		}

		function printInConsole(lineNum, text, delay) {
			return function() {
				let line = termLines[lineNum - 1];
				line.innerText += text;
				line.classList.add('new');
				setTimeout(function() {
					line.classList.remove('new');
					line.classList.add('recent');
					setTimeout(function() { line.classList.remove('recent'); }, 3000);
				}, 3000);
				return delay;
			};
		}

		function clearVars(varIds) {
			return function() {
				for (let i = 0;  i < varIds.length;  ++i) {
					document.getElementById(varIds[i]).innerText = ' ';
				}
				return 50;
			};
		}

		function clearCanvas() {
			ctx.clearRect(0, 0, width, height);
			return 50;
		}

		function clearExplain() {
			explanation.style.display = 'none';
			explanation.innerText = '';
			return 50;
		}

		function end() {
			clearCanvas();
			clearExplain();
			for (let lineNum = 1;  lineNum <= lineNums.length;  ++lineNum) {
				pcOff(lineNum);
			}
			return 4000;
		}

		let cyl_radius = 2.1;
		let cyl_height = 4.7;
		let cyl_volume = Math.PI * cyl_radius * cyl_radius * cyl_height;

		script.push(explain(15, 34.2, 33, 2.6, 'The user runs the program by typing "python cylinder_volume.py" in the terminal window.', 500));
		script.push(typeInConsole(1, 'python cylinder_volume.py'));
		script.push(explain(21, 0, 31, 3.8, 'The computer begins executing the cylinder_volume program. It executes each statement that is not inside a function.', 6000));
		script.push(execute(1, 500));
		script.push(explain(15, 0, 30, 1.4, 'The computer imports the math module.', 3000));
		script.push(clearExplain);
		script.push(execute(4, 500));
		script.push(explain(15, 1.5, 23, 2.6, 'The computer reads but does not execute the main function.', 3000));
		script.push(clearExplain);
		script.push(execute(17, 500));
		script.push(explain(21, 16.2, 31, 2.6, 'The computer reads but does not execute the compute_cylinder_volume function.', 3000));
		script.push(clearExplain);
		script.push(execute(32, 500));
		script.push(explain(11, 33, 32, 3.8, 'Because of the call to the main function, the computer begins executing the statements inside the main function.', 6000));
		script.push(execute(6, 1000));
		script.push(clearExplain);
		script.push(printInConsole(2, 'Enter the radius of a cylinder: '));
		script.push(typeInConsole(2, cyl_radius.toFixed(1)));
		script.push(store('mainVarR', cyl_radius.toFixed(1)));
		script.push(execute(7, 1000));
		script.push(printInConsole(3, 'Enter the height of a cylinder: '));
		script.push(typeInConsole(3, cyl_height.toFixed(1)));
		script.push(store('mainVarH', cyl_height.toFixed(1)));
		script.push(execute(11, 500));
		script.push(explain(14.2, 7.5, 38, 3.8, 'Because of the call to the computer_cylinder_volume function, the computer copies the values in the arguments into the parameters.', 3000));
		script.push(copyArg('mainVarR', 33.8, 13, 33, 19, 'ccvVarRadius'));
		script.push(copyArg('mainVarH', 36.7, 13, 40, 19, 'ccvVarHeight'));
		script.push(clearCanvas);
		script.push(explain(14.2, 9, 38, 2.6, 'Then the computer begins executing the statements inside the computer_cylinder_volume function.', 4000));
		script.push(execute(25, 2000));
		script.push(clearExplain);
		script.push(store('ccvVarVolume', cyl_volume.toFixed(6)));
		script.push(execute(29, 500));
		script.push(explain(19, 28.5, 34, 3.8, 'Because of the return statement, the computer copies the value that is in the volume variable and returns it to the call point.', 6000));
		script.push(returnVal(17, 33, 8.8, 13, 1000));
		script.push(clearVars(['ccvVarRadius', 'ccvVarHeight', 'ccvVarVolume']));
		script.push(store('mainVarV', cyl_volume.toFixed(6)));
		script.push(clearExplain);
		script.push(clearCanvas);
		script.push(execute(14, 1000));
		script.push(printInConsole(4, 'Volume: ' + cyl_volume.toFixed(2), 3000));
		script.push(clearVars(['mainVarR', 'mainVarH', 'mainVarV']));
		script.push(end);
	},


	animate : function() {
		const script = this.script;
		let index = 0;

		function next() {
			let delay = script[index]();
			if (++index < script.length) {
				setTimeout(next, delay);
			}
		};
		setTimeout(next, 2000);
	},


	onLoad : function() {
		const self = cse111.anim;
		self.resizeCanvas();
		self.buildScript();
		self.animate();
	}
};


window.addEventListener('load', cse111.anim.onLoad);
