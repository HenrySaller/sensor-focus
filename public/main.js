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
	if (window.Handlebars) {
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
		document.addEventListener('DOMContentLoaded', () => {
			document.dispatchEvent(readyEvent);
		});
	}
};

 /**
  * Smooth Scroll
  * Smoothly scroll to the given target for the given duration.
  * Thanks to 'Hasen el Judy / @hasenj' for concept.
  */

document.smoothScroll = ((target, duration) => {
  target = Math.round(target);
  duration = Math.round(duration);

  // Reject if duration is below zero
  if (duration < 0) {
    return Promise.reject('Duration should be above zero');
  }

  // Immediately execute if duration is set to zero
  if (duration === 0) {
    window.scroll(0, target);
    return Promise.resolve();
  }

  // Set timing
  const startTime = Date.now();
  const endTime = startTime + duration;

  // Set distance
  const startTop = window.scrollY;
  const distance = target - startTop;
  console.log(target);

  // Based on //wikipedia.org/wiki/smoothstep
  const smoothStep = ((start, end, point) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  });

  return new Promise((resolve, reject) => {
    // Keep track of where the scroll should be.
    let previousTop = window.scrollY;

    // This is like a think function from a game loop
    const scrollFrame = (() => {
      // Reject if scroll has been interrupted
      if (window.scrollY != previousTop) {
        reject('Scroll was interrupted');
        return;
      }

      // Set scrollTop for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + (distance * point));
      window.scroll(0, frameTop);

      // Check if we are done
      if (now >= endTime) {
        resolve();
        return;
      }

      // Resolve if we hit a limit
      if (window.scrollY === previousTop && window.scrollY !== frameTop) {
        resolve();
        return;
      }
      previousTop = window.scrollY;

      // Schedule next frame execution
      setTimeout(scrollFrame, 0);
    });

    // Boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
});

/**
 * Carousel Class
 * Initializes carousel instance and handles events.
 */
class Carousel {
  /**
   * @param {HTMLElement} element - carousel container
   */
  constructor(element) {
    this.container = element;
    this.slides = new Map();

    // Keep track of first, current active slide and timer
    this.first;
    this.current;
    this.timer;

    // Set timer step
    const timerStep = 5000;

    // Set queries
    const textQuery = '[data-carousel=text]';
    const imageQuery = '[data-carousel=slide]';
    const triggerQuery = '[data-carousel=trigger]';

    // Gather all images, trigger and texts
    const texts = Array.from(element.querySelectorAll(textQuery));
    const images = Array.from(element.querySelectorAll(imageQuery));
    const triggers = Array.from(element.querySelectorAll(triggerQuery));

    // Populate slides map
    for (const image of images) {
      // Create slide object with default state
      const slide = {
        active: false,
      };

      // Get slide id
      const id = image.dataset.slide;

      // Set slide image
      slide.image = image;

      // Set slide triggers
      slide.triggers = triggers.filter((item) => item.dataset.slide === id);

      // Set slide texts
      slide.texts = texts.filter((item) => item.dataset.slide === id);

      // Iterate slide triggers
      for (const item of slide.triggers) {
        // Add click event listeners to triggers
        item.addEventListener('click', (event) => {
          this.switch(id);

          // Set offset based on target position
          const elHeight = slide.image.offsetHeight;
          const winHeight = window.innerHeight;
          const offset = (
            slide.image.getBoundingClientRect().top
            + window.scrollY
            - (winHeight - elHeight) / 2
          );

          // Scroll to element location
          document.smoothScroll(offset, 300)
            .catch((err) => {
              // console.error(err);
            });

          // Disable timer
          clearInterval(this.timer);
        });
      }

      // Add slide to map
      this.slides.set(id, slide);
    }

    // Get first slide
    this.first = this.slides.keys().next().value;

    // Check if first item exists
    if (this.first) {
      // Init first slide
      this.toggle(this.first);
      this.current = this.first;

      // Create timer
      this.timer = window.setInterval(() => {
        this.next();
      }, timerStep);
    }
  }
  /**
   * Toggle specific slide
   * @param {string} id - slide id
   */
  toggle(id) {
    // Get slide
    const slide = this.slides.get(id);

    // Check slide status
    if (slide.active) {
      // Disable slide
      for (const item of [slide.image, ...slide.triggers, ...slide.texts]) {
        item.classList.remove('active');
      }
    } else {
      // Activate slide
      for (const item of [slide.image, ...slide.triggers, ...slide.texts]) {
        item.classList.add('active');
      }
    }

    // Update status
    slide.active = !slide.active;
  }
  /**
   * Switch to specified slide
   * @param {string} id - slide id
   */
  switch(id) {
    // Deactivate current slide
    this.toggle(this.current);

    // Activate new slide
    this.toggle(id);

    // Update current slide
    this.current = id;
  }
  /**
   * Switch to next slide
   */
  next() {
    // Get slides iterator
    const slides = this.slides.entries();

    // Iterate slides
    for (const [id, {}] of slides) {
      // Check if slide matches current
      if (this.current === id) {
        // Get next slide
        const next = slides.next().value;

        // Check if next slide exists
        if (next) {
          // Get slide id
          const [id, {}] = next;

          // Switch to next slide
          this.switch(id);
        } else {
          // Else switch to first slide
          this.switch(this.first);
        }
      }
    }
  }
}

// Initialize all carousel elements
document.ready.then(() => {
  // Set carousel querie
  const query = '[data-carousel=container]';

  // Gather carousel elements
  const elements = document.querySelectorAll(query);

  // Iterate carousel elements
  for (const element of elements) {
    new Carousel(element);
  }
});

/**
 * Overlay Class
 * Creates overlay instance and handles show/hide events.
 */
class Overlay {
  /**
   * @param {HTMLElement} element - overlay element
   * @param {Object} scroll - parent scroll object
   */
  constructor(element, scroll) {
    this.container = element;
    this.parentScroll = scroll;
    this.active = false;
  }
  /**
   * Shows overlay and hijacks scroll
   */
  show() {
    if (!this.active) {
      this.container.classList.add('active');
      this.parentScroll.stop();
      this.active = true;

      // Change URL hash to overlay ID
      // Note: Potentially harmful and unsafe method, needs to be reworked
      window.location.hash = this.container.id;
    }
  }
  /**
   * Hides overlay and resumes scroll
   */
  hide() {
    if (this.active) {
      this.container.classList.remove('active');
      this.parentScroll.start();
      this.active = false;

      // Remove URL hash
      // Note: Leaves '#' sign in the URL
      window.location.hash = '';
    }
  }
}

// Create singleton to control body scroll
document.bodyScroll = {
  active: true,
  stop() {
    if (this.active) {
      document.body.classList.add('no-scroll');
      this.active = false;
    }
  },
  start() {
    if (!this.active) {
      document.body.classList.remove('no-scroll');
      this.active = true;
    }
  },
};

// Create global map of overlays
document.overlays = new Map();

// Init overlays and add hide event listeners
document.ready.then(() => {
  // Define query to find overlay and close button
  const query = '[data-overlay=container]';

  // Gather all overlays
  const overlays = Array.from(document.querySelectorAll(query));

  // Get URL hash value
  const hash = window.location.hash.slice(1);

  // Iterate overlays
  for (const item of overlays) {
    // Get overlay ID
    const id = item.id;

    // Create Overlay instance
    const overlay = new Overlay(item, document.bodyScroll);

    // Add Overlay to global map
    document.overlays.set(id, overlay);

    // Get Overlay close button
    const close = item.querySelector('[data-overlay=close]');

    // Add click event listener
    item.addEventListener('click', (event) => {
      // Get event target
      const target = event.target;

      // Check if target matches close button or container background
      if (target == item || target == close) {
        // Hide Overlay
        overlay.hide();
      }
    });

    // Show overlay if it's ID parameter matches URL hash value
    if (hash == id) overlay.show();
  }
});

/**
 * Event Listeners
 * Creates event listeners. Handles overlays and smooth scroll.
 */

// Add link event listeners
document.ready.then(() => {
  // Gather all links on page
  const links = Array.from(document.querySelectorAll('a'));

  // Filter links with valid hash
  const hashLinks = links.filter((link) => {
    return link.href.includes('#') && !link.href.endsWith('#');
  });

  // Create document overlay event
  const overlayEvent = new Event('overlayOpen');

  // Iterate hash links
  for (const link of hashLinks) {
    // Get hash value
    const hash = link.href.split('#')[1];

    // Get target element
    const target = document.getElementById(hash);

    // Continue if target does not exist
    if (!target) {
      // console.error(`Could not find element with id '${hash}'`);
      // console.error(link);
      continue;
    }

    // Check if hash targets an overlay
    // Reason:
    // CMS nature of the project requires ability to use simple hash links to
    // triger overlays by ID without usage of datasets or other distinguishing
    // techniques.
    if (hash.includes('overlay')) {
      // Add click event listener
      link.addEventListener('click', (event) => {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Get targeted overlay
        const overlay = document.overlays.get(hash);

        // Show overlay
        overlay.show();

        // Dispatch event
        document.dispatchEvent(overlayEvent);
      });
    } else {
      // Add click event listener
      link.addEventListener('click', (event) => {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Set offset based on target and header height
        const offset = (
          target.getBoundingClientRect().top
          + window.scrollY
          - 72
        );

        // Scroll to hash location
        document.smoothScroll(offset, 300)
          .catch((err) => {
            // console.error(err);
          });
      });
    }
  };
});

// Add event listeners based on link attribute
// Reason:
// Allows to use any element as a link while ignoring explicit child links.
// e.g. Project contains card based elements that require to be clickable.
document.ready.then(() => {
  // Gather all elements with link attribute
  const links = Array.from(document.querySelectorAll('[data-link]'));

  for (const item of links) {
    // Add click event listener
    item.addEventListener('click', (event) => {
      // Skip if event target is a native link
      if (!event.target.href) {
        // Get target URL
        const url = item.dataset['link'];

        // Change location to desired URL
        window.location = url;
      }
    });
  }
});

/**
 * Header Element
 * Initialises page header and handles mobile navigation.
 */

document.ready.then(() => {
  // Get header element
  const header = document.getElementById('header');

  // Stop if there is no header on the page
  if (!header) return;

  // Get header navigation and toggle
  const nav = header.querySelector('[data-header=nav]');
  const toggle = header.querySelector('[data-header=toggle]');

  // Gather all navigation items
  const navItems = Array.from(nav.getElementsByClassName('nav-button'));

  // Set mobile navigation state
  let mobile = false;

  // Iterate navigation items
  for (const item of navItems) {
    // Check if item url matches current page
    if (item.href === window.location.href) {
      // Make navigation item active
      item.classList.add('active');
    }
  }

  // Add click event listener to navigation toggle
  toggle.addEventListener('click', (event) => {
    if (mobile) {
      nav.classList.remove('active');
      mobile = false;
    } else {
      nav.classList.add('active');
      mobile = true;
    }
  });
});
