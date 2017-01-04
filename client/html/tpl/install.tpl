<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">
  <div class="wrap">
    <div class="install__container">

      <div class="install__content">
        <div class="install__title block-title--black">{{title}}</div>
        <div class="install__text">{{{text}}}</div>
        <div class="install__cta">

          {{#items}}
          <div class="install__cta-button" data-target="{{id}}" id="cta-{{id}}">
            <div class="install__cta-icon">
              <img src="{{icon}}">
            </div>
            <div class="install__cta-text">{{{cta}}}</div>
            <div class="install__cta-chevron">chevron_right</div>
          </div>
          {{/items}}

        </div>
      </div>

      {{#items}}
      <div class="install__image" id="{{id}}">
        <div class="full-width-img--optimized">
          <img src="{{bg-img}}">
        </div>
        <div class="{{#if caption}}full-width-img__caption--{{caption-type}}{{/if}}">{{{caption}}}</div>
      </div>
      {{/items}}

    </div>
  </div>
</div>

<script>
  $(function() {
    var activeItemId,
        timer;

    /* Select next item */
    function nextItem(itemId) {
      var cta = $('.install__cta #cta-' + itemId);
      var nextItem = cta.next();

      /* Check if item is not last */
      if( nextItem.length == 0 ) {
        /* Set first item as next */
        nextItem = $('.install__cta-button').first();
      }

      return nextItem.attr('data-target');
    }

    /* Toggle active item */
    function toggle(itemId) {
      var cta = $('.install__cta #cta-' + itemId);

      /* Toggle image */
      $('#' + itemId).toggle();

      /* Toggle button style */
      cta.toggleClass('install__cta-button--active');
      cta.find('.install__cta-icon').toggleClass('install__cta-icon--active');
      cta.find('.install__cta-chevron').toggleClass('install__cta-chevron--active');
    }

    /* Event handler */
    $('.install__cta-button').click(function() {
      clearInterval(timer);

      var itemId = $(this).attr('data-target');

      /* Toggle previous and current item. Update current active item */
      if (itemId !== activeItemId) {
        toggle(activeItemId);
        toggle(itemId);
        activeItemId = itemId;
      }

      /* Scroll to item position */
      var el = $('#' + activeItemId);
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
      activeItemId = $('.install__cta-button').first().attr('data-target');

      /* Hide all images */
      $.each( $('.install__image'), function(key, value) {
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
