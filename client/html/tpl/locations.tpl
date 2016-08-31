<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="locations__container">

      <div class="locations__content">
        <div class="card__title block-title--black block-title--center">{{title}}</div>
        <div class="card__item-text">{{{text}}}</div>
      </div>


      <div class="locations__image">
        <div class="locations__image-device">
          <img src="{{bg-img}}">
        </div>

        {{#items}}
        <div class="locations__image-screen" id="{{id}}">
          <img src="{{bg-img}}">
        </div>
        {{/items}}

        <div class="locations__steps steps__container">
          {{#items}}
          <div class="steps__item" data-target="{{id}}" id="step-{{id}}"></div>
          {{/items}}
        </div>

      </div>

      <div class="locations__cta">

        {{#items}}
        <div class="locations__cta-button" data-target="{{id}}" id="cta-{{id}}">
          <div class="locations__cta-text">{{cta}}</div>
        </div>
        {{/items}}

      </div>

      <div class="locations__description">

        {{#items}}
        <div class="locations__description-item card__item-text" id="desc-{{id}}">{{{text}}}</div>
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
      var cta = $('.locations__cta #cta-' + itemId);

      /* Toggle image */
      $('#' + itemId).toggle();

      /* Toggle button style */
      cta.toggleClass('locations__cta-button--active');
      cta.find('.locations__cta-icon').toggleClass('locations__cta-icon--active');
      cta.find('.locations__cta-chevron').toggleClass('locations__cta-chevron--active');

      /* Toggle active step */
      $('.locations__steps #step-' + itemId).toggleClass('steps__item--active');

      /* Toggle active description */
      $('.locations__description #desc-' + itemId).toggle();
    }

    /* Event handler */
    $('.locations__cta-button, .locations__steps .steps__item').click(function() {
      var itemId = $(this).attr('data-target');

      /* Toggle previous and current item. Update current active item */
      if (itemId !== activeItemId) {
        toggle(activeItemId);
        toggle(itemId);
        activeItemId = itemId;
      }

      /* Scroll to item position */
      var el = $('.locations__image');
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
      activeItemId = $('.locations__cta-button').first().attr('data-target');

      /* Hide all images and descriptions */
      $.each( $('.locations__image-screen, .locations__description-item'), function(key, value) {
        $(value).toggle();
      });

      /* Triger active item */
      toggle(activeItemId);
    })();

  });
</script>
