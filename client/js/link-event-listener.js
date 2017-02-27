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
