'use strict';

/**
 * Template Engine
 * Generates content based on template configuration.
 */

Handlebars.registerHelper('inc', function (value) {
  return parseInt(value) + 1;
});

Handlebars.getTemplate = function (name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url: '/tpl',
      data: { 'tpl': name },
      async: false,
      success: function success(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        };
        Handlebars.templates[name] = Handlebars.compile(data);
      }
    });
  }
  return Handlebars.templates[name];
};

Handlebars.render = function (currentPage, templates, target) {
  $.holdReady(true);

  $('#maincss').on('load', function () {
    alert('Stylesheet loaded');
  });

  $.get('/data', { page: currentPage }).done(function (data) {
    $.each(templates, function (index, item) {
      var compiledTemplate = Handlebars.getTemplate(item.template);
      target.append(compiledTemplate(data[item.data]));
    });
    $.holdReady(false);
  });
};

/**
 * Link Event Listener
 * Creates link event listeners. Handles overlays and smooth scroll.
 */

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
