<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">
  <div class="wrap">
    <div class="app__container">

      <div class="app__content">
        <div class="app__title block-title--black">{{title}}</div>
        <div class="app__text">{{{text}}}</div>
        <div class="app__cta">

          {{#items}}
          <div class="app__cta-button" data-target="{{id}}" id="cta-{{id}}">
            <div class="app__cta-icon">{{inc @index}}</div>
            <div class="app__cta-text">{{{cta}}}</div>
            <div class="app__cta-chevron">chevron_right</div>
          </div>
          {{/items}}

        </div>
      </div>


      <div class="app__image">
        <div class="app__image-device">
          <img src="{{bg-img}}">
        </div>

        {{#items}}
        <div class="app__image-screen" id="{{id}}">
          <img src="{{bg-img}}">
        </div>
        {{/items}}

        <div class="app__steps steps__container">
          {{#items}}
          <div class="steps__item" data-target="{{id}}" id="step-{{id}}"></div>
          {{/items}}
        </div>

      </div>
    </div>
  </div>
</div>

<script>
  $(function() {
    var activeItemId,
        timer;

    /* Select next item */
    function nextItem(itemId) {
      var cta = $('.app__cta #cta-' + itemId);
      var nextItem = cta.next();

      /* Check if item is not last */
      if( nextItem.length == 0 ) {
        /* Set first item as next */
        nextItem = $('.app__cta-button').first();
      }

      return nextItem.attr('data-target');
    }

    /* Toggle active item */
    function toggle(itemId) {
      var cta = $('.app__cta #cta-' + itemId);

      /* Toggle image */
      $('#' + itemId).toggle();

      /* Toggle button style */
      cta.toggleClass('app__cta-button--active');
      cta.find('.app__cta-icon').toggleClass('app__cta-icon--active');
      cta.find('.app__cta-chevron').toggleClass('app__cta-chevron--active');

      /* Toggle active step */
      $('.app__steps #step-' + itemId).toggleClass('steps__item--active');
    }

    /* Event handler */
    $('.app__cta-button, .app__steps .steps__item').click(function() {
      clearInterval(timer);

      var itemId = $(this).attr('data-target');

      /* Toggle previous and current item. Update current active item */
      if (itemId !== activeItemId) {
        toggle(activeItemId);
        toggle(itemId);
        activeItemId = itemId;
      }

      /* Scroll to item position */
      var el = $('.app__image');
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
      activeItemId = $('.app__cta-button').first().attr('data-target');

      /* Hide all images */
      $.each( $('.app__image-screen'), function(key, value) {
        $(value).toggle();
      });

      /* Triger active item */
      toggle(activeItemId);

      /* Switch to next item */
      timer = window.setInterval(function(){
        /* Toggle previous and current item. Update current active item */
        var nextId = nextItem(activeItemId);
        toggle(activeItemId);
        toggle(nextId);
        activeItemId = nextId;
      }, 7000);
    })();

  });
</script>
