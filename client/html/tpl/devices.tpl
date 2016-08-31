<div class="section--white" id="{{id}}">
  <div class="wrap">
    <div class="devices__container">

      {{#items}}
      <div class="devices__section">

        <div class="devices__wrap {{#if @first}}devices__wrap--separator{{/if}}">
          <div class="card__title block-title--black block-title--center">{{title}}</div>
          <div class="card__item-text">{{text}}</div>
        </div>

        <div class="devices__image">
          <div class="full-width-img--optimized">
            <img src="{{bg-img}}">
          </div>
          <div class="{{#if caption}}full-width-img__caption--{{caption-type}}{{/if}}">{{{caption}}}</div>
        </div>

      </div>
      {{/items}}

    </div>
  </div>
</div>
