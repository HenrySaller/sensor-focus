<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="testimonials__container">

      {{#items}}
      <div class="testimonials__wrap" id="{{id}}">
        <div class="testimonials__item">

          <img class="testimonials__item-avatar" src="{{img}}">
          <div class="testimonials__inner-wrap">
            <div class="testimonials__item-text">{{text}}</div>
            <div class="testimonials__item-user">
              <div class="testimonials__item-separator"></div>
              <div class="testimonials__item-name">{{name}}</div>
              <div class="testimonials__item-position">, {{position}}</div>
            </div>
          </div>

        </div>
      </div>
      {{/items}}

      <div class="testimonials__steps steps__container">
        {{#items}}
        <div class="steps__item" data-target="{{id}}" id="step-{{id}}"></div>
        {{/items}}
      </div>

    </div>
  </div>
</div>

<script>
  $(function() {
    var activeItemId;

    /* Toggle active item */
    function toggle(itemId) {

      /* Toggle testimonial item */
      $('#' + itemId).toggleClass('testimonials__wrap--active');

      /* Toggle active step */
      $('.testimonials__steps #step-' + itemId).toggleClass('steps__item--active');
    }

    /* Event handler */
    $('.testimonials__steps .steps__item').click(function() {
      var itemId = $(this).attr('data-target');

      /* Toggle previous and current item. Update current active item */
      if (itemId !== activeItemId) {
        toggle(activeItemId);
        toggle(itemId);
        activeItemId = itemId;
      }

      /* Scroll to item position */
      var el = $('.testimonials__container');
      var elOffset = el.offset().top;
      var elHeight = el.height();
      var windowHeight = window.innerHeight;
      var offset = elOffset - (windowHeight - elHeight)/2;

      $('html, body').animate({
        scrollTop: offset
      }, 300);
    });

    ;(function init() {

      /* Set first item as active */
      activeItemId = $('.testimonials__wrap').first().attr('id');

      /* Triger active item */
      toggle(activeItemId);
    })();

  });
</script>
