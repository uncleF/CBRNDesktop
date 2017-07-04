(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _require = require('utilities/utilities'),
    app = _require.app,
    eventName = _require.eventName,
    trigger = _require.trigger;

module.exports = function () {
  var rename = document.getElementById('rename');
  var cancel = document.getElementById('cancel');

  function enable(button) {
    button.classList.remove('button-is-disabled');
  }

  function disable(button) {
    button.classList.add('button-is-disabled');
  }

  function activateButtons() {
    enable(rename);
    enable(cancel);
  }

  function deactivateButtons() {
    disable(rename);
    disable(cancel);
  }

  function onRenameClick(event) {
    event.preventDefault();
  }

  function onCancelClick(event) {
    event.preventDefault();
    trigger('clearList');
  }

  function initInteractions() {
    rename.addEventListener('click', onRenameClick);
    cancel.addEventListener('click', onCancelClick);
  }

  function onListFill() {
    activateButtons();
  }

  function onListClear() {
    deactivateButtons();
  }

  function initEvents() {
    app().addEventListener(eventName('fillList'), onListFill);
    app().addEventListener(eventName('clearList'), onListClear);
  }

  function init() {
    initInteractions();
    initEvents();
  }

  init();
};

},{"utilities/utilities":5}],2:[function(require,module,exports){
'use strict';

var _require = require('utilities/utilities'),
    app = _require.app,
    eventName = _require.eventName,
    trigger = _require.trigger;

var DUMMY_DATA = ['Avengers v2 #001', 'East of West #34', 'Spider-man #156', 'Amazing Spider-man v4 #501', 'All-star Superman #001', 'Avengers v2 #001', 'East of West #34', 'Spider-man #156', 'Amazing Spider-man v4 #501', 'All-star Superman #001'];

module.exports = function () {
  var drop = document.getElementById('drop');

  function activateDrop() {
    drop.classList.add('drop-is-active');
  }

  function deactivateDrop() {
    drop.classList.remove('drop-is-active');
  }

  function dropDirs() {
    deactivateDrop();
    trigger('fillList', DUMMY_DATA);
  }

  function onDrop(event) {
    event.preventDefault();
    dropDirs();
  }

  function onDragOver(event) {
    event.preventDefault();
    activateDrop();
  }

  function onDragLeave(event) {
    event.preventDefault();
    deactivateDrop();
  }

  function initLeaveInteractions() {
    document.addEventListener('dragleave', onDragLeave, false);
  }

  function removeLeaveInteractions() {
    document.removeEventListener('dragleave', onDragLeave, false);
  }

  function initInteractions() {
    document.addEventListener('drop', onDrop, false);
    document.addEventListener('dragover', onDragOver, false);
  }

  function onListFill() {
    deactivateDrop();
    initLeaveInteractions();
  }

  function onListClear() {
    activateDrop();
    removeLeaveInteractions();
  }

  function initEvents() {
    app().addEventListener(eventName('fillList'), onListFill);
    app().addEventListener(eventName('clearList'), onListClear);
  }

  function init() {
    initInteractions();
    initEvents();
  }

  init();
};

},{"utilities/utilities":5}],3:[function(require,module,exports){
'use strict';

var _require = require('utilities/utilities'),
    app = _require.app,
    eventName = _require.eventName;

var ITEM_TEMPLATE = '<li class="listItem">{{ TITLE }}</li>';

module.exports = function () {
  var list = document.getElementById('list');

  var items = [];

  function updateItem(index, status) {
    items[index].update(status);
  }

  function createItem(data) {
    return ITEM_TEMPLATE.replace('{{ TITLE }}', data);
  }

  function appendItems() {
    list.innerHTML = items.join('');
  }

  function fillList(data) {
    items = data.map(createItem);
    appendItems();
  }

  function clearItem(item) {
    console.log('item destroyed', item);
  }

  function clearList() {
    items.forEach(clearItem);
    items.length = 0;
    list.innerHTML = '';
  }

  function onItemUpdate(event) {
    var _event$data = event.data,
        index = _event$data.index,
        status = _event$data.status;

    updateItem(index, status);
  }

  function onListFill(event) {
    clearList();
    fillList(event.data);
  }

  function onListClear() {
    clearList();
  }

  function initEvents() {
    app().addEventListener(eventName('updateItem'), onItemUpdate);
    app().addEventListener(eventName('fillList'), onListFill);
    app().addEventListener(eventName('clearList'), onListClear);
  }

  function init() {
    initEvents();
  }

  init();
};

},{"utilities/utilities":5}],4:[function(require,module,exports){
'use strict';

module.exports = {
  clearList: 'app:clearlist',
  fillList: 'app:filllist',
  updateItem: 'app:updateitem'
};

},{}],5:[function(require,module,exports){
'use strict';

var eventNames = require('utilities/eventNames.js');

var object = void 0;

function app() {
  return object;
}

function eventName(key) {
  return eventNames[key];
}

function trigger(key, data) {
  var event = document.createEvent('UIEvent');
  event.data = data;
  event.initEvent(eventName(key), false, false);
  object.dispatchEvent(event);
}

function init(id) {
  object = document.getElementById(id);
}

exports.init = init;
exports.app = app;
exports.eventName = eventName;
exports.trigger = trigger;

},{"utilities/eventNames.js":4}],6:[function(require,module,exports){
'use strict';

/* Utilities */

var utilities = require('utilities/utilities');

utilities.init('app');

/* Components */

var buttons = require('buttons');
var drop = require('drop');
var list = require('list');

buttons();
drop();
list();

},{"buttons":1,"drop":2,"list":3,"utilities/utilities":5}]},{},[6]);
