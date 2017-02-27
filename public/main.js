/**
 * Template Engine
 * Generates content based on template configuration.
 */

// Create document ready event
const readyEvent = new Event('docReady');

// Create global ready state promise
document.ready = new Promise((resolve, reject) => {
	document.addEventListener('docReady', () => resolve());
});

Handlebars.render = ((template, target) => {
	// Gather all promises
	const allPomises = [];

	// Construct url to get data for page
	const url = `/data?page=${template.page}`;

	// Fetch page content
	fetch(url, {method: 'get'})
		.then((data) => data.json())
		.then((data) => {
			// Iterate page templates
			for (const {tpl, content} of template.data) {
				// Create placeholder for template
				const placeholder = document.createElement('div');
				target.append(placeholder);

				// Request template from Handlebars
				const tplPromise = Handlebars.getTemplate(tpl);

				// Push promise to array of all promises
				allPomises.push(tplPromise);

				// Request template from Handlebars
				tplPromise
					.then((rawTemplate) => {
						// Compile HTML from template with data
						const cmpTemplate = rawTemplate(data[content]);

						// Append compiled HTML to page
						placeholder.insertAdjacentHTML( 'beforebegin', cmpTemplate );
						placeholder.remove();
					})
					.catch((err) => {
						console.error(err);
					});
			};
			// Check when all promises have been resolved
			Promise.all(allPomises)
				.then(() => {
					// Triger document ready event
					document.dispatchEvent(readyEvent);
				});
		})
		.catch((err) => {
			console.error(`Could not fetch page data from '${url}'`);
			console.error(err);
		});
});

Handlebars.getTemplate = ((name) => {
	return new Promise((resolve, reject) => {
		let tpls = Handlebars.templates;

		// Create template holder if it does not exist
		tpls = tpls || {};

		// Check if template has been cached
		if ( tpls[name] ) {
			// Resolve template from cache
			resolve(tpls[name]);
		} else {
			// Construct url to get template by name
			const url = `/tpl?tpl=${name}`;

			// Fetch template
			fetch(url, {method: 'get'})
				.then((data) => data.text())
				.then((data) => {
					// Create and cache template
					tpls[name] = Handlebars.compile(data);

					// Resolve template
					resolve(tpls[name]);
				})
				.catch((err) => {
					console.error(`Could not fetch template from '${url}'`);
					reject(err);
				});
		};
	});
});

Handlebars.registerHelper('inc', (value) => parseInt(value) + 1);

/**
 * Link Event Listener
 * Creates link event listeners. Handles overlays and smooth scroll.
 */

// document.ready.then(() => {
$(function() {
  // Add smooth scrolling to all links and toggle overlays
  $('a').on('click', function(event) {
    // Store hash
    const hash = this.hash;

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
        scrollTop: $(hash).offset().top - 72,
      }, 300, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
