<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">
  <div class="wrap model__wrap">

    {{#groups}}
    <div class="card__title block-title--black block-title--center">{{title}}</div>

    <div class="model__container card__container--left-align">

      {{#items}}
      <div class="model__item card__item--light card__item--flex">
        <div class="model__item-inner-wrap">
          <div class="icon-fill--small">{{icon}}</div>
          <div class="model__item-title">{{{title}}}</div>
        </div>
        <div class="model__item-text">{{{text}}}</div>
      </div>
      {{/items}}

    </div>

    {{#unless @last}}
    <div class="model__separator"></div>
    {{/unless}}

    {{/groups}}

  </div>
</div>
