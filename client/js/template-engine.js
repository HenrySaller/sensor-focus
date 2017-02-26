/**
 * Template Engine
 * Generates content based on template configuration.
 */

Handlebars.registerHelper('inc', function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.getTemplate = function(name) {
	if (
    Handlebars.templates === undefined ||
    Handlebars.templates[name] === undefined
  ) {
		$.ajax({
			url: '/tpl',
      data: {'tpl': name},
      async: false,
			success: function(data) {
				if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        };
				Handlebars.templates[name] = Handlebars.compile(data);
			},
		});
	}
	return Handlebars.templates[name];
};

Handlebars.render = function(currentPage, templates, target) {
  $.holdReady( true );

  $('#maincss').on('load', function() {
    alert('Stylesheet loaded');
  });

  $.get( '/data', {page: currentPage} ).done(function( data ) {
    $.each(templates, function( index, item ) {
      const compiledTemplate = Handlebars.getTemplate(item.template);
      target.append(compiledTemplate(data[item.data]));
    });
    $.holdReady( false );
  });
};
