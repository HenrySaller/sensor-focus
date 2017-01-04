<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">
  <div class="wrap">
    <div class="separator__content">

      {{#if cta}}
      <div class="section__footer">
        <div class="section__footer-cta">
          <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
        </div>
        <div class="section__footer-caption">{{caption}}</div>
      </div>
      {{else if hr}}
      <div class="separator__hr"></div>
      {{/if}}

    </div>
  </div>
</div>
