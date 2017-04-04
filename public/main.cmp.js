'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Template Engine
 * Generates content based on template configuration.
 */

{
  // Create document ready event
  var readyEvent = new Event('docReady');

  // Create global ready state promise
  document.ready = new Promise(function (resolve, reject) {
    document.addEventListener('docReady', function () {
      return resolve();
    });
  });

  // Check if page depends on Handlebars
  if (window.Handlebars) {
    Handlebars.render = function (template, target) {
      // Gather all promises to check for completion
      var allPomises = [];

      // Construct url to get data for page
      var url = '/data?page=' + template.page;

      // Fetch page content
      fetch(url, { method: 'get' }).then(function (data) {
        // Check for errors
        if (data.ok) {
          // Convert response to json
          return data.json();
        } else {
          throw new Error('Page data not found');
        }
      }).then(function (data) {
        // Iterate page templates
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var _step$value = _step.value,
                tpl = _step$value.tpl,
                content = _step$value.content;

            // Create placeholder for template
            var placeholder = document.createElement('div');
            target.append(placeholder);

            // Request template from Handlebars
            var tplPromise = Handlebars.getTemplate(tpl);

            // Push promise to array of all promises
            allPomises.push(tplPromise);

            // Request template from Handlebars
            tplPromise.then(function (rawTemplate) {
              // Compile HTML from template with data
              var cmpTemplate = rawTemplate(data[content]);

              // Append compiled HTML to page
              placeholder.insertAdjacentHTML('beforebegin', cmpTemplate);
              placeholder.remove();
            }).catch(function (err) {
              // Append error to page
              placeholder.classList.add('section-error');
              placeholder.textContent = 'Template \'' + tpl + '\' not found';
            });
          };

          for (var _iterator = template.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        ;
        // Check when all promises have been resolved
        Promise.all(allPomises).then(function () {
          // Triger document ready event
          document.dispatchEvent(readyEvent);
        });
      }).catch(function (err) {
        console.error('Could not fetch page data from \'' + url + '\'');
        console.error(err);
      });
    };

    Handlebars.getTemplate = function (name) {
      return new Promise(function (resolve, reject) {
        var tpls = Handlebars.templates;

        // Create template holder if it does not exist
        tpls = tpls || {};

        // Check if template has been cached
        if (tpls[name]) {
          // Resolve template from cache
          resolve(tpls[name]);
        } else {
          // Construct url to get template by name
          var url = '/tpl?tpl=' + name;

          // Fetch template
          fetch(url, { method: 'get' }).then(function (data) {
            // Check for errors
            if (data.ok) {
              // Convert response to text
              return data.text();
            } else {
              throw new Error('Template not found');
            }
          }).then(function (data) {
            // Create and cache template
            tpls[name] = Handlebars.compile(data);

            // Resolve template
            resolve(tpls[name]);
          }).catch(function (err) {
            console.error('Could not fetch template from \'' + url + '\'');
            console.error(err);
            reject();
          });
        };
      });
    };

    // Create incremental helper
    Handlebars.registerHelper('inc', function (value) {
      return parseInt(value) + 1;
    });
  } else {
    // Triger document ready event
    document.dispatchEvent(readyEvent);
  }
};

/**
 * Smooth Scroll
 * Smoothly scroll element to the given target for the given duration.
 * Thanks to 'Hasen el Judy / @hasenj' for concept.
 */

document.smoothScroll = function (element, target, duration) {
  target = Math.round(target);
  duration = Math.round(duration);

  // Reject if duration is below zero
  if (duration < 0) {
    return Promise.reject('Duration should be above zero');
  }

  // Immediately execute if duration is set to zero
  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  // Set timing
  var startTime = Date.now();
  var endTime = startTime + duration;

  // Set distance
  var startTop = element.scrollTop;
  var distance = target - startTop;

  // Based on //wikipedia.org/wiki/smoothstep
  var smoothStep = function smoothStep(start, end, point) {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    var x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  };

  return new Promise(function (resolve, reject) {
    // Keep track of where the element's scrollTop should be.
    var previousTop = element.scrollTop;

    // This is like a think function from a game loop
    var scrollFrame = function scrollFrame() {
      // Reject if scroll has been interrupted
      if (element.scrollTop != previousTop) {
        reject('Scroll was interrupted');
        return;
      }

      // Set scrollTop for this frame
      var now = Date.now();
      var point = smoothStep(startTime, endTime, now);
      var frameTop = Math.round(startTop + distance * point);
      element.scrollTop = frameTop;

      // Check if we are done
      if (now >= endTime) {
        resolve();
        return;
      }

      // Resolve if we hit a limit
      if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
        resolve();
        return;
      }
      previousTop = element.scrollTop;

      // Schedule next frame execution
      setTimeout(scrollFrame, 0);
    };

    // Boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
};

/**
 * Carousel Class
 * Initializes carousel instance and handles events.
 */

var Carousel = function () {
  /**
   * @param {HTMLElement} element - carousel container
   */
  function Carousel(element) {
    var _this = this;

    _classCallCheck(this, Carousel);

    this.container = element;
    this.slides = new Map();

    // Keep track of first, current active slide and timer
    this.first;
    this.current;
    this.timer;

    // Set timer step
    var timerStep = 5000;

    // Set queries
    var textQuery = '[data-carousel=text]';
    var imageQuery = '[data-carousel=slide]';
    var triggerQuery = '[data-carousel=trigger]';

    // Gather all images, trigger and texts
    var texts = Array.from(element.querySelectorAll(textQuery));
    var images = Array.from(element.querySelectorAll(imageQuery));
    var triggers = Array.from(element.querySelectorAll(triggerQuery));

    // Populate slides map
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop2 = function _loop2() {
        var image = _step2.value;

        // Create slide object with default state
        var slide = {
          active: false
        };

        // Get slide id
        var id = image.dataset.slide;

        // Set slide image
        slide.image = image;

        // Set slide triggers
        slide.triggers = triggers.filter(function (item) {
          return item.dataset.slide === id;
        });

        // Set slide texts
        slide.texts = texts.filter(function (item) {
          return item.dataset.slide === id;
        });

        // Iterate slide triggers
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = slide.triggers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            // Add click event listeners to triggers
            item.addEventListener('click', function (event) {
              _this.switch(id);

              // Set offset based on target position
              var elHeight = slide.image.offsetHeight;
              var winHeight = window.innerHeight;
              var offset = slide.image.getBoundingClientRect().top + document.body.scrollTop - (winHeight - elHeight) / 2;

              // Scroll to element location
              document.smoothScroll(document.body, offset, 300).catch(function (err) {
                // console.error(err);
              });

              // Disable timer
              clearInterval(_this.timer);
            });
          }

          // Add slide to map
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        _this.slides.set(id, slide);
      };

      for (var _iterator2 = images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
      }

      // Get first slide
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.first = this.slides.keys().next().value;

    // Check if first item exists
    if (this.first) {
      // Init first slide
      this.toggle(this.first);
      this.current = this.first;

      // Create timer
      this.timer = window.setInterval(function () {
        _this.next();
      }, timerStep);
    }
  }
  /**
   * Toggle specific slide
   * @param {string} id - slide id
   */


  _createClass(Carousel, [{
    key: 'toggle',
    value: function toggle(id) {
      // Get slide
      var slide = this.slides.get(id);

      // Check slide status
      if (slide.active) {
        // Disable slide
        var _arr = [slide.image].concat(_toConsumableArray(slide.triggers), _toConsumableArray(slide.texts));

        for (var _i = 0; _i < _arr.length; _i++) {
          var item = _arr[_i];
          item.classList.remove('active');
        }
      } else {
        // Activate slide
        var _arr2 = [slide.image].concat(_toConsumableArray(slide.triggers), _toConsumableArray(slide.texts));

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var _item = _arr2[_i2];
          _item.classList.add('active');
        }
      }

      // Update status
      slide.active = !slide.active;
    }
    /**
     * Switch to specified slide
     * @param {string} id - slide id
     */

  }, {
    key: 'switch',
    value: function _switch(id) {
      // Deactivate current slide
      this.toggle(this.current);

      // Activate new slide
      this.toggle(id);

      // Update current slide
      this.current = id;
    }
    /**
     * Switch to next slide
     */

  }, {
    key: 'next',
    value: function next() {
      // Get slides iterator
      var slides = this.slides.entries();

      // Iterate slides
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = slides[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              _id = _step4$value[0];

          _objectDestructuringEmpty(_step4$value[1]);

          // Check if slide matches current
          if (this.current === _id) {
            // Get next slide
            var next = slides.next().value;

            // Check if next slide exists
            if (next) {
              // Get slide id
              var _next = _slicedToArray(next, 2),
                  _id2 = _next[0];

              _objectDestructuringEmpty(_next[1]);

              // Switch to next slide


              this.switch(_id2);
            } else {
              // Else switch to first slide
              this.switch(this.first);
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Carousel;
}();

// Initialize all carousel elements


document.ready.then(function () {
  // Set carousel querie
  var query = '[data-carousel=container]';

  // Gather carousel elements
  var elements = document.querySelectorAll(query);

  // Iterate carousel elements
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = elements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var element = _step5.value;

      new Carousel(element);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
});

/**
 * Overlay Class
 * Creates overlay instance and handles show/hide events.
 */

var Overlay = function () {
  /**
   * @param {HTMLElement} element - overlay element
   * @param {Object} scroll - parent scroll object
   */
  function Overlay(element, scroll) {
    _classCallCheck(this, Overlay);

    this.container = element;
    this.parentScroll = scroll;
    this.active = false;
  }
  /**
   * Shows overlay and hijacks scroll
   */


  _createClass(Overlay, [{
    key: 'show',
    value: function show() {
      if (!this.active) {
        this.container.classList.add('active');
        this.parentScroll.stop();
        this.active = true;
      }
    }
    /**
     * Hides overlay and resumes scroll
     */

  }, {
    key: 'hide',
    value: function hide() {
      if (this.active) {
        this.container.classList.remove('active');
        this.parentScroll.start();
        this.active = false;
      }
    }
  }]);

  return Overlay;
}();

// Create singleton to control body scroll


document.bodyScroll = {
  active: true,
  stop: function stop() {
    if (this.active) {
      document.body.classList.add('no-scroll');
      this.active = false;
    }
  },
  start: function start() {
    if (!this.active) {
      document.body.classList.remove('no-scroll');
      this.active = true;
    }
  }
};

// Create global map of overlays
document.overlays = new Map();

// Init overlays and add hide event listeners
document.ready.then(function () {
  // Define query to find overlay and close button
  var query = '[data-overlay=container]';

  // Gather all overlays
  var overlays = Array.from(document.querySelectorAll(query));

  // Iterate overlays
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    var _loop3 = function _loop3() {
      var item = _step6.value;

      // Get overlay ID
      var id = item.id;

      // Create Overlay instance
      var overlay = new Overlay(item, document.bodyScroll);

      // Add Overlay to global map
      document.overlays.set(id, overlay);

      // Get Overlay close button
      var close = item.querySelector('[data-overlay=close]');

      // Add click event listener
      item.addEventListener('click', function (event) {
        // Get event target
        var target = event.target;

        // Check if target matches close button or container background
        if (target == item || target == close) {
          // Hide Overlay
          overlay.hide();
        }
      });
    };

    for (var _iterator6 = overlays[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
});

/**
 * Event Listeners
 * Creates event listeners. Handles overlays and smooth scroll.
 */

// Add link event listeners
document.ready.then(function () {
  // Gather all links on page
  var links = Array.from(document.querySelectorAll('a'));

  // Filter links with valid hash
  var hashLinks = links.filter(function (link) {
    return link.href.includes('#') && !link.href.endsWith('#');
  });

  // Create document overlay event
  var overlayEvent = new Event('overlayOpen');

  // Iterate hash links
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    var _loop4 = function _loop4() {
      var link = _step7.value;

      // Get hash value
      var hash = link.href.split('#')[1];

      // Get target element
      var target = document.getElementById(hash);

      // Continue if target does not exist
      if (!target) {
        console.error('Could not find element with id \'' + hash + '\'');
        console.error(link);
        return 'continue';
      }

      // Check if hash targets an overlay
      // Reason:
      // CMS nature of the project requires ability to use simple hash links to
      // triger overlays by ID without usage of datasets or other distinguishing
      // techniques.
      if (hash.includes('overlay')) {
        // Add click event listener
        link.addEventListener('click', function (event) {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Get targeted overlay
          var overlay = document.overlays.get(hash);

          // Show overlay
          overlay.show();

          // Dispatch event
          document.dispatchEvent(overlayEvent);
        });
      } else {
        // Add click event listener
        link.addEventListener('click', function (event) {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Set offset based on target and header height
          var offset = target.getBoundingClientRect().top + document.body.scrollTop - 72;

          // Scroll to hash location
          document.smoothScroll(document.body, offset, 300).catch(function (err) {
            // console.error(err);
          });
        });
      }
    };

    for (var _iterator7 = hashLinks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _ret4 = _loop4();

      if (_ret4 === 'continue') continue;
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  ;
});

// Add event listeners based on link attribute
// Reason:
// Allows to use any element as a link while ignoring explicit child links.
// e.g. Project contains card based elements that require to be clickable.
document.ready.then(function () {
  // Gather all elements with link attribute
  var links = Array.from(document.querySelectorAll('[data-link]'));

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    var _loop5 = function _loop5() {
      var item = _step8.value;

      // Add click event listener
      item.addEventListener('click', function (event) {
        // Skip if event target is a native link
        if (!event.target.href) {
          // Get target URL
          var url = item.dataset['link'];

          // Change location to desired URL
          window.location = url;
        }
      });
    };

    for (var _iterator8 = links[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      _loop5();
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }
});

/**
 * Header Element
 * Initialises page header and handles mobile navigation.
 */

document.ready.then(function () {
  // Get header element
  var header = document.getElementById('header');

  // Stop if there is no header on the page
  if (!header) return;

  // Get header navigation and toggle
  var nav = header.querySelector('[data-header=nav]');
  var toggle = header.querySelector('[data-header=toggle]');

  // Gather all navigation items
  var navItems = Array.from(nav.getElementsByClassName('nav-button'));

  // Set mobile navigation state
  var mobile = false;

  // Iterate navigation items
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = navItems[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _item2 = _step9.value;

      // Check if item url matches current page
      if (_item2.href === window.location.href) {
        // Make navigation item active
        _item2.classList.add('active');
      }
    }

    // Add click event listener to navigation toggle
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  toggle.addEventListener('click', function (event) {
    if (mobile) {
      nav.classList.remove('active');
      mobile = false;
    } else {
      nav.classList.add('active');
      mobile = true;
    }
  });
});
