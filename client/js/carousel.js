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
