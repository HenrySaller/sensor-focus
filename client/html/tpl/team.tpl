<footer class="cards">
  <div class="wrap">
    <div class="cards__container">

      <div class="cards__title block-title--black block-title--center">{{title}}</div>

      {{#items}}
      <div class="cards__item--flex">
        <div class="cards__item-icon icon-border">{{icon}}</div>
        <div class="cards__item-text--left">{{{text}}}</div>
      </div>
      {{/items}}

      <div class="cards__cta">
        <a class="button__standard" href="">{{cta}}</a>
      </div>

    </div>
  </div>
</footer>
