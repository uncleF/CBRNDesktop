const utilities = require('utilities/utilities');

module.exports = () => {
  const clear = document.getElementById('clear');

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
