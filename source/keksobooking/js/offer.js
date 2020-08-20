'use strict';

(function () {
  var MAX_PIN_COUNT = 5;

  var removePins = function () {
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
      el.remove();
    });
  };

  var removeCards = function () {
    document.querySelectorAll('.map__card').forEach(function (el) {
      el.remove();
    });
  };

  var render = function () {
    var fragment = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    var siteMap = document.querySelector('.map');
    var pinElement = document.querySelector('.map__pins');
    var cardElement = document.querySelector('.map__filters-container');

    removePins();
    removeCards();
    var data = window.homeFilter.updateOffer();

    var takeNumber = data.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragmentCard.appendChild(window.card.renderCard(data[i]));
      fragment.appendChild(window.pin.renderPin(data[i]));
    }

    pinElement.appendChild(fragment);
    siteMap.insertBefore(fragmentCard, cardElement);
  };

  var filters = document.querySelector('.map__filters');

  var setOnChangeListener = function () {
    var onFilterChange = function () {
      render();
      window.map.startMap();
    };

    filters.addEventListener('change', window.debounce(onFilterChange));
  };

  window.offer = {
    startFilters: setOnChangeListener,
    render: render
  };
})();

