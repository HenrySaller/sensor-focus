<div class="section--grey-100" id="{{id}}">
  <div class="wrap">
    <div class="card__container">

      <div class="card__title block-title--black block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--dark">
        <div class="icon-fill--counter">{{inc @index}}</div>
        <div class="card__item-subtitle">{{title}}</div>
        <div class="card__item-text">{{{text}}}</div>
      </div>
      {{/items}}

      <div class="card__cta">
        <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
      </div>

    </div>
  </div>
</div>
