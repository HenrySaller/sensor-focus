<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="device__container">

      <div class="device__content">
        <div class="device__title block-title--black">{{title}}</div>
        <div class="device__text">{{{text}}}</div>

        <ul class="device__features">

          {{#features}}
          <li class="device__feature">{{text}}</li>
          {{/features}}

        </ul>

        <a class="device__button button__standard" href="{{cta.url}}">{{{cta.name}}}</a>
        <div class="device__cta">

          {{#items}}
          <div class="device__cta-button" data-target="{{id}}" id="cta-{{id}}">
            <div class="device__cta-icon">
              <img class="device__cta-image" src="{{thumbnail}}">
            </div>
          </div>
          {{/items}}

        </div>
      </div>

      {{#items}}
      <div class="device__image" id="{{id}}">
        <div class="full-width-img--optimized">
          <img src="{{bg-img}}">
        </div>
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
      var cta = $('.device__cta #cta-' + itemId);
      var nextItem = cta.next();

      /* Check if item is not last */
      if( nextItem.length == 0 ) {
        /* Set first item as next */
        nextItem = $('.device__cta-button').first();
      }

      return nextItem.attr('data-target');
    }

    /* Toggle active item */
    function toggle(itemId) {
      var cta = $('.device__cta #cta-' + itemId);

      /* Toggle image */
      $('#' + itemId).toggle();

      /* Toggle button style */
      cta.toggleClass('device__cta-button--active');
    }

    /* Event handler */
    $('.device__cta-button').click(function() {
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
      activeItemId = $('.device__cta-button').first().attr('data-target');

      /* Hide all images */
      $.each( $('.device__image'), function(key, value) {
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
