const { app, eventName, trigger } = require('utilities/utilities');

const DUMMY_DATA = ['Avengers v2 #001', 'East of West #34', 'Spider-man #156', 'Amazing Spider-man v4 #501', 'All-star Superman #001', 'Avengers v2 #001', 'East of West #34', 'Spider-man #156', 'Amazing Spider-man v4 #501', 'All-star Superman #001'];

module.exports = () => {
  const drop = document.getElementById('drop');

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
