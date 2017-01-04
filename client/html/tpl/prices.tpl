<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">

  <div class="full-width-img--bg">
    <img src="{{bg-img}}">
  </div>

  <div class="wrap">
    <div class="card__container">

      <div class="card__title block-title--white block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--light card__item--flex-column">

        <div class="card__price">
          <div class="card__price-title">
            <span class="card__price-subtitle">{{before}}</span>{{price}}<span class="card__price-subtitle">{{after}}</span>
          </div>
          <div class="card__price-caption">{{caption}}</div>
        </div>

        <div class="card__item-wrap">

          <div class="card__item-title">{{title}}</div>
          <div class="card__item-text">{{{text}}}</div>
          <div class="card__item-cta">
            <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
          </div>

        </div>

      </div>
      {{/items}}

    </div>
  </div>
</div>
