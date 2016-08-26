<footer class="footer section--white" id="{{id}}">
  <div class="wrap">
    <div class="footer__container">

      <div class="footer__logo">
        <a href="/"><img alt="Sensor Focus Logo" src="{{logo}}"></a>
      </div>

      {{#groups}}
      <div class="footer__group">
        <div class="footer__group-title">{{name}}</div>

        {{#links}}
        <a class="footer__group-link" href="{{url}}">{{name}}</a>
        {{/links}}

      </div>
      {{/groups}}

    </div>
  </div>
</footer>

<div class="copyright">{{copyright}}</div>
