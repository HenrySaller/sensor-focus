<footer class="cards">
  <div class="wrap">
    <div class="cards__container">

      <div class="cards__title block-title--black block-title--center">{{title}}</div>

      {{#items}}
      <div class="cards__item">
        <div class="cards__item-icon">
          <img alt="{{alt}}" src="{{icon}}">
        </div>
        <div class="cards__item-title">{{title}}</div>
        <div class="cards__item-text">{{{text}}}</div>
      </div>
      {{/items}}

    </div>
  </div>
</footer>
