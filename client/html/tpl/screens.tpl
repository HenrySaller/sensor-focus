<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="screens__container">

      <div class="screens__content">
        <div class="card__title block-title--black block-title--center">{{title}}</div>
        <div class="card__item-text">{{{text}}}</div>
      </div>


      <div class="screens__image">

        {{#items}}
        <div class="screens__image-screen" id="{{id}}">
          <div class="screens__image-device">
            <div class="screens__image-device-dot"></div>
            <div class="screens__image-device-dot"></div>
            <div class="screens__image-device-dot"></div>
          </div>
          <img src="{{bg-img}}">
        </div>
        {{/items}}

        <div class="screens__steps steps__container">
          {{#items}}
          <div class="steps__item" data-target="{{id}}" id="step-{{id}}"></div>
          {{/items}}
        </div>

      </div>

      <div class="screens__cta">

        {{#items}}
        <div class="screens__cta-button" data-target="{{id}}" id="cta-{{id}}">
          <div class="screens__cta-text">{{cta}}</div>
        </div>
        {{/items}}

      </div>

      <div class="screens__description">

        {{#items}}
        <div class="screens__description-item card__item-text" id="desc-{{id}}">{{{text}}}</div>
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
      var cta = $('.screens__cta #cta-' + itemId);

      /* Toggle image */
      $('#' + itemId).toggle();

      /* Toggle button style */
      cta.toggleClass('screens__cta-button--active');
      cta.find('.screens__cta-icon').toggleClass('screens__cta-icon--active');
      cta.find('.screens__cta-chevron').toggleClass('screens__cta-chevron--active');

      /* Toggle active step */
      $('.screens__steps #step-' + itemId).toggleClass('steps__item--active');

      /* Toggle active description */
      $('.screens__description #desc-' + itemId).toggle();
    }

    /* Event handler */
    $('.screens__cta-button, .screens__steps .steps__item').click(function() {
      var itemId = $(this).attr('data-target');

      /* Toggle previous and current item. Update current active item */
      if (itemId !== activeItemId) {
        toggle(activeItemId);
        toggle(itemId);
        activeItemId = itemId;
      }

      /* Scroll to item position */
      var el = $('.screens__image');
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
      activeItemId = $('.screens__cta-button').first().attr('data-target');

      /* Hide all images and descriptions */
      $.each( $('.screens__image-screen, .screens__description-item'), function(key, value) {
        $(value).toggle();
      });

      /* Triger active item */
      toggle(activeItemId);
    })();

  });
</script>
