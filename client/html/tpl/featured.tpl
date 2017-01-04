<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">

  <div class="full-width-img--bg">
    <img src="{{bg-img}}">
  </div>

  <div class="wrap">
    <div class="card__container">

      <div class="card__title block-title--white block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--light card__item--flex card__item--target" data-target="{{cta.url}}">

        <div class="card__item-img">
          <div class="full-width-img">
            <img alt="{{alt}}" src="{{img}}">
          </div>
        </div>

        <div class="card__item-wrap">

          <div class="card__item-title">{{title}}</div>
          <div class="card__item-text">{{{text}}}</div>
          <div class="card__tags">
            {{#tags}}
            <div class="card__tags-item">{{this}}</div>
            {{/tags}}
          </div>
          <div class="card__item-cta">
            <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
          </div>

        </div>
      </div>
      {{/items}}

    </div>
  </div>

  <div class="section--white">
    <div class="wrap">

      <div class="featured__footer section__footer">
        <div class="section__footer-cta">
          <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
        </div>
        <div class="section__footer-caption">{{caption}}</div>
      </div>

    </div>
  </div>

</div>

<script>
  $(function() {

    // Card click event handler
    $('.card__item--target').click(function(e) {
      location.href = $(e.target).closest('.card__item--target').data('target');
    });

  });
</script>
