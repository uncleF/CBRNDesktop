(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var utilities = require('utilities/utilities');

module.exports = function () {
  var clear = document.getElementById('clear');

  function onClearClick(event) {
    event.preventDefault();
    utilities.trigger('clearlist');
  }

  function initInteractions() {
    clear.addEventListener('click', onClearClick);
  }

  function init() {
    initInteractions();
  }

  init();
};

},{"utilities/utilities":3}],2:[function(require,module,exports){
'use strict';

module.exports = {
  clearList: 'app:clearlist'
};

},{}],3:[function(require,module,exports){
'use strict';

var eventNames = require('utilities/eventNames.js');

var object = void 0;

function app() {
  return object;
}

function getEvent(key) {
  return eventNames[key];
}

function trigger(key, data) {
  var event = document.createEvent('UIEvent');
  event.data = data;
  event.initEvent(getEvent(key), false, false);
  object.dispatchEvent(event);
}

function init(id) {
  object = document.getElementById(id);
}

exports.init = init;
exports.app = app;
exports.trigger = trigger;

},{"utilities/eventNames.js":2}],4:[function(require,module,exports){
'use strict';

/* Utilities */

var utilities = require('utilities/utilities');

utilities.init('app');

/* Components */

var panel = require('panel');

panel();

},{"panel":1,"utilities/utilities":3}]},{},[4]);
