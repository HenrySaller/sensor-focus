Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
		$.ajax({
			url : 'tpl/' + name + '.tpl',
      async : false,
			success : function(data) {
				if (Handlebars.templates === undefined) {	Handlebars.templates = {}; }
				Handlebars.templates[name] = Handlebars.compile(data);
			}
		});
	}
	return Handlebars.templates[name];
};

Handlebars.render = function(currentPage, templates, target) {
  $.holdReady( true );
  $.get( '/data', { page: currentPage } ).done(function( data ) {
    $.each(templates, function( index, item ) {
      var compiledTemplate = Handlebars.getTemplate(item.template);
      target.append(compiledTemplate(data[item.data]));
    });
    $.holdReady( false );
  });
}
