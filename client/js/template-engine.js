/**
 * Template Engine
 * Generates content based on template configuration.
 */

{
	// Create document ready event
	const readyEvent = new Event('docReady');

	// Create global ready state promise
	document.ready = new Promise((resolve, reject) => {
		document.addEventListener('docReady', () => resolve());
	});

	// Check if page depends on Handlebars
	if (Handlebars) {
		Handlebars.render = ((template, target) => {
			// Gather all promises to check for completion
			const allPomises = [];

			// Construct url to get data for page
			const url = `/data?page=${template.page}`;

			// Fetch page content
			fetch(url, {method: 'get'})
				.then((data) => {
					// Check for errors
					if (data.ok) {
						// Convert response to json
						return data.json();
					} else {
						throw new Error('Page data not found');
					}
				})
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
								// Append error to page
								placeholder.classList.add('section-error');
								placeholder.textContent = `Template '${tpl}' not found`;
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
				if (tpls[name]) {
					// Resolve template from cache
					resolve(tpls[name]);
				} else {
					// Construct url to get template by name
					const url = `/tpl?tpl=${name}`;

					// Fetch template
					fetch(url, {method: 'get'})
						.then((data) => {
							// Check for errors
							if (data.ok) {
								// Convert response to text
								return data.text();
							} else {
								throw new Error('Template not found');
							}
						})
						.then((data) => {
							// Create and cache template
							tpls[name] = Handlebars.compile(data);

							// Resolve template
							resolve(tpls[name]);
						})
						.catch((err) => {
							console.error(`Could not fetch template from '${url}'`);
							console.error(err);
							reject();
						});
				};
			});
		});

		// Create incremental helper
		Handlebars.registerHelper('inc', (value) => parseInt(value) + 1);
	} else {
		// Triger document ready event
		document.dispatchEvent(readyEvent);
	}
};
