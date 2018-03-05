## Overview

Commercial project with a purely modular approach and CMS like editing capabilities. A conceptual selling point of a project is a solution. Project owner should be able to create landing pages based on shared modules and at the same time deeply customize them in case of need.

## Components

#### Server

* [Node.js](https://nodejs.org/) - As an easiest and fastest way to simulate server activity.
* [Express](https://expressjs.com/)

#### Package Managers

* [npm](https://www.npmjs.com/)
* [Bower](https://bower.io/) - Separates front-end dependencies.

#### Automation Tools

* [Grunt](https://gruntjs.com/) - JavaScript task runner.
* [ESLint](http://eslint.org/) - Linting utility for JavaScript with ES6 support.
* [Babel](https://babeljs.io/) - Compiler for JavaScript that allows to adapt ES6 features for older browsers.
* [PostCSS](http://postcss.org/) - CSS postprocessor.

#### JavaScript

* [Handlebars.js](http://handlebarsjs.com/) - Main templating engine.
* ~~jQuery~~ - Dependency removed. *Reason:* the only two methods from jQuery that project relies on are `readyState` and `scrollAnimation`. Both have been replaced with native ES6 implementations.
* [Polyfill](https://polyfill.io/v2/docs/) - Polyfill service that adapts to browser version at runtime.

#### CSS

Code follows [BEM](https://en.bem.info/methodology/css/) methodology.

* ~~Compass~~ - Dependency removed. *Reason:* Compass is a Ruby-based CSS compiler with a bunch of predefined mixins. During project development, it became clear, that Compass was only used for its autoprefixers. So Compass was replaced with C++ alternative [LibSass](http://sass-lang.com/libsass/). This decreased compilation time and removed Ruby dependency. Browser compatibility is being ensured using [Autoprefixer](https://github.com/postcss/autoprefixer/) from the [PostCSS](http://postcss.org/) bundle.
* [LibSass](http://sass-lang.com/libsass/) - C++ port of Sass engine.
* [Autoprefixer](https://github.com/postcss/autoprefixer/) - Adds vendor prefixes to CSS rules.

## Installation

The only external requirement is an up to date [Node.js](https://nodejs.org/) installation. Please follow the official guidelines to install or update it on your system.

Use the following commands to launch the project:

* `$ npm install` - Installs all project dependencies. `bower install` is launched automatically using npm *postinstall* method.
* `$ npm start` - Launches JS and CSS automations. Starts the project on default port - `localhost:5000`.

Additional scripts:

* `$ npm run js` - Concats all JS files, compiles them using [Babel](https://babeljs.io/) and Uglifies the output.
* `$ npm run sass` - Compiles CSS using [LibSass](http://sass-lang.com/libsass/) and launches [PostCSS](http://postcss.org/) processes.
* `$ npm run watch` - Runs watch tasks for both JS and SCSS.

## Javascript Linter

The project uses ESLint as the main JavaScript linter. ESLint is configured using [`eslint-config-google`](https://github.com/google/eslint-config-google/) and follows [Google JavaScript Guidelines](https://google.github.io/styleguide/jsguide.html/) as closely as possible. A Git hook is used to reject commits that haven't passed guideline requirements.

## Browser Support

The last two versions of the following browsers are officially supported:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 10+

The project can still be used in older browser versions, but comprehensive testing will be performed only in versions mentioned above.

## License

Copyright 2016 Sensor Focus Inc
