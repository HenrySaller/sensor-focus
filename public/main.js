Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
		$.ajax({
			url : '/tpl',
      data: { 'tpl': name },
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
;$(function() {

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 72
      }, 300, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

});
