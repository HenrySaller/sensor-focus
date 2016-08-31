<div class="section--grey-100" id="{{id}}">
  <div class="wrap">

    <div class="features__title">
      {{#if title}}
        <div class="card__title block-title--black">{{title}}</div>
      {{/if}}
    </div>

    <div class="features__container card__container--left-align">

      {{#items}}
      <div class="card__item--dark card__item--left-align">
        <div class="icon-border">{{icon}}</div>
        <div class="card__item-inner-wrap">
          <div class="card__item-inner-title">{{{title}}}</div>
          <div class="card__item-inner-text">{{{text}}}</div>
        </div>
      </div>
      {{/items}}

    </div>

    <div class="features__footer">

      <div class="features__separator"></div>

      <div class="section__footer">
        <div class="section__footer-cta">
          <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
        </div>
        <div class="section__footer-caption">{{caption}}</div>
      </div>

    </div>
  </div>
</div>
