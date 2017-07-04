const { app, eventName, trigger } = require('utilities/utilities');

module.exports = () => {
  const rename = document.getElementById('rename');
  const cancel = document.getElementById('cancel');

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
