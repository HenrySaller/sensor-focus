<div class="section--grey-100" id="{{id}}">
  <div class="wrap">
    <div class="card__container--left-align">

      <div class="card__title block-title--black block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--dark card__item--left-align">
        <div class="icon-border">{{icon}}</div>
        <div class="card__item-text--left-align">{{{text}}}</div>
      </div>
      {{/items}}

      <div class="card__cta">
        <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
      </div>

    </div>
  </div>
</div>
