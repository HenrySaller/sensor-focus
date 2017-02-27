'use strict';

/**
 * Template Engine
 * Generates content based on template configuration.
 */

// Create document ready event
var readyEvent = new Event('docReady');

// Create global ready state promise
document.ready = new Promise(function (resolve, reject) {
	document.addEventListener('docReady', function () {
		return resolve();
	});
});

Handlebars.render = function (template, target) {
	// Gather all promises
	var allPomises = [];

	// Construct url to get data for page
	var url = '/data?page=' + template.page;

	// Fetch page content
	fetch(url, { method: 'get' }).then(function (data) {
		return data.json();
	}).then(function (data) {
		// Iterate page templates
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			var _loop = function _loop() {
				var _step$value = _step.value,
				    tpl = _step$value.tpl,
				    content = _step$value.content;

				// Create placeholder for template
				var placeholder = document.createElement('div');
				target.append(placeholder);

				// Request template from Handlebars
				var tplPromise = Handlebars.getTemplate(tpl);

				// Push promise to array of all promises
				allPomises.push(tplPromise);

				// Request template from Handlebars
				tplPromise.then(function (rawTemplate) {
					// Compile HTML from template with data
					var cmpTemplate = rawTemplate(data[content]);

					// Append compiled HTML to page
					placeholder.insertAdjacentHTML('beforebegin', cmpTemplate);
					placeholder.remove();
				}).catch(function (err) {
					console.error(err);
				});
			};

			for (var _iterator = template.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				_loop();
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		;
		// Check when all promises have been resolved
		Promise.all(allPomises).then(function () {
			// Triger document ready event
			document.dispatchEvent(readyEvent);
		});
	}).catch(function (err) {
		console.error('Could not fetch page data from \'' + url + '\'');
		console.error(err);
	});
};

Handlebars.getTemplate = function (name) {
	return new Promise(function (resolve, reject) {
		var tpls = Handlebars.templates;

		// Create template holder if it does not exist
		tpls = tpls || {};

		// Check if template has been cached
		if (tpls[name]) {
			// Resolve template from cache
			resolve(tpls[name]);
		} else {
			// Construct url to get template by name
			var url = '/tpl?tpl=' + name;

			// Fetch template
			fetch(url, { method: 'get' }).then(function (data) {
				return data.text();
			}).then(function (data) {
				// Create and cache template
				tpls[name] = Handlebars.compile(data);

				// Resolve template
				resolve(tpls[name]);
			}).catch(function (err) {
				console.error('Could not fetch template from \'' + url + '\'');
				reject(err);
			});
		};
	});
};

Handlebars.registerHelper('inc', function (value) {
	return parseInt(value) + 1;
});

/**
 * Link Event Listener
 * Creates link event listeners. Handles overlays and smooth scroll.
 */

// document.ready.then(() => {
$(function () {
	// Add smooth scrolling to all links and toggle overlays
	$('a').on('click', function (event) {
		// Store hash
		var hash = this.hash;

		// Make sure hash has a value and element exists
		if (hash !== '' && $(hash).length) {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Check if this.hash targets an overlay
			if (hash.indexOf('overlay') == 1) {
				// Show overlay
				$(hash).addClass('overlay__container--active');

				// Hijack scroll
				$('body').css('overflow', 'hidden');

				// Terminate function
				return;
			} // End if

			// Add smooth page scroll
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 72
			}, 300, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
});
