/**
 * Header Element
 * Initialises page header and handles mobile navigation.
 */

document.ready.then(() => {
  // Get header element
  const header = document.getElementById('header');

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
