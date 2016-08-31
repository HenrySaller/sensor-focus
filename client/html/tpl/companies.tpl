<div class="section--grey-100" id="{{id}}">
  <div class="wrap">
    <div class="companies__container">

      <div class="companies__logo">

        {{#items}}
        <div class="companies__logo-item">
          <img alt="{{alt}}" src="{{img}}">
        </div>
        {{/items}}

      </div>

      <div class="section__footer">
        <div class="section__footer-cta">
          <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
        </div>
        <div class="section__footer-caption">{{caption}}</div>
      </div>

    </div>
  </div>
</div>