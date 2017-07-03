const eventNames = require('utilities/eventNames.js');

let object;

function app() {
  return object;
}

function getEvent(key) {
  return eventNames[key];
}

function trigger(key, data) {
  const event = document.createEvent('UIEvent');
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
