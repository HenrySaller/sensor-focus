<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="download-switch__container">

      {{#items}}
      <div class="download-switch__section">

        <div class="download-switch__wrap {{#if @first}}download-switch__wrap--separator{{/if}}">
          <div class="card__title block-title--black block-title--center">{{title}}</div>
          <div class="card__item-text">{{text}}</div>
          <a class="download-switch__cta button__standard" href="{{cta.url}}">{{cta.title}}</a>
        </div>

      </div>
      {{/items}}

    </div>
  </div>
</div>
