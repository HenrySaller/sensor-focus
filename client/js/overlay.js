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
