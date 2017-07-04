const { app, eventName } = require('utilities/utilities');

const ITEM_TEMPLATE = '<li class="listItem">{{ TITLE }}</li>';

module.exports = () => {
  const list = document.getElementById('list');

  let items = [];

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
    const { index, status } = event.data;
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
