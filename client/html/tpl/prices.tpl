<div class="prices section" id="{{id}}">

  <div class="full-width-img--bg">
    <img src="{{bg-img}}">
  </div>

  <div class="wrap">
    <div class="card__container">

      <div class="card__title block-title--white block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--light card__item--flex">

        <div class="card__price">
          <div class="card__price-title {{#unless price}}card__price-title--free{{/unless}}">{{#unless price}}Free{{/unless}}{{price}}</div>
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
