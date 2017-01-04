<div class="{{#if bg}}section--{{bg}}{{else}}section{{/if}}" id="{{id}}">
  <div class="wrap">
    <div class="download__container">

      <div class="download__content">
        <div class="download__title block-title--black">{{title}}</div>
        <div class="download__text">{{{text}}}</div>
        <div class="download__cta">

          {{#items}}
          <div class="download__cta-button{{#if disabled}} download__cta-button--disabled{{/if}}" data-target="{{url}}">
            <div class="download__cta-icon">
              <img src="{{icon}}">
            </div>
            <div class="download__cta-text">{{{cta}}}</div>
            <div class="download__cta-chevron">{{#unless disabled}}file_download{{/unless}}</div>
          </div>
          {{/items}}

        </div>
      </div>

      <div class="download__image">

        <div class="download__image-device">
          <img src="{{bg-img}}">
        </div>
        <div class="download__image-screen" id="{{id}}">
          <img src="{{screen-img}}">
        </div>

      </div>
    </div>
  </div>
</div>

<div class="section--white">
  <div class="wrap">

    <div class="download__footer section__footer">
      <div class="section__footer-cta">
        <a class="button__standard" href="{{cta.url}}">{{cta.name}}</a>
      </div>
      <div class="section__footer-caption">{{caption}}</div>
    </div>

  </div>
</div>

<script>
  $(function() {

    // Button click event handler
    $('.download__cta-button:not(.download__cta-button--disabled)').click(function(e) {
      location.href = $(e.target).closest('.download__cta-button').data('target');
    });

  });
</script>
