<div class="section--grey-100" id="{{id}}">
  <div class="wrap">
    <div class="card__container">

      <div class="card__title block-title--black block-title--center">{{title}}</div>

      {{#items}}
      <div class="card__item--dark">
        <div class="areas__item-icon">
          <img alt="{{alt}}" src="{{icon}}">
        </div>
        <div class="card__item-title">{{title}}</div>
        <div class="card__item-text">{{{text}}}</div>
      </div>
      {{/items}}

    </div>
  </div>
</div>
