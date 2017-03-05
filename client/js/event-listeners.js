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

  // Iterate hash links
  for (const link of hashLinks) {
    // Get hash value
    const hash = link.href.split('#')[1];

    // Get target element
    const target = document.getElementById(hash);

    // Continue if target does not exist
    if (!target) {
      console.error(`Could not find element with id '${hash}'`);
      console.error(link);
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
      });
    } else {
      // Add click event listener
      link.addEventListener('click', (event) => {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Set offset based on target and header height
        const offset = (
          target.getBoundingClientRect().top
          + document.body.scrollTop
          - 72
        );

        // Scroll to hash location
        document.smoothScroll(document.body, offset, 300)
          .catch((err) => {
            // console.error(err);
          });
      });
    }
  };
});

// Add event listeners based on link attribute
// Reason:
// Allows to use any element as a links while ignoring explicit child links.
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
