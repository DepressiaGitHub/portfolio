'use strict';

(function () {
  var ANY = 'any';
  var offers = [];

  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');
  var housePrice = filters.querySelector('#housing-price');
  var houseRooms = filters.querySelector('#housing-rooms');
  var houseGuests = filters.querySelector('#housing-guests');
  var houseFeatures = filters.querySelector('#housing-features');
  var checkBoxes = houseFeatures.querySelectorAll('input[name=features]');

  var successOffer = function (Cards) {
    offers = Cards;
  };

  var getFilteredByType = function (el) {
    return el.offer.type === houseType.value;
  };

  var getFilteredByPrice = function (card) {
    var answer;
    switch (housePrice.value) {
      case 'middle':
        answer = card.offer.price >= 10000 && card.offer.price <= 50000;
        break;

      case 'low':
        answer = card.offer.price < 10000;
        break;

      case 'high':
        answer = card.offer.price > 50000;
        break;
    }

    return answer;
  };

  var getFilteredByRooms = function (card) {
    return card.offer.rooms === +houseRooms.value;
  };

  var getFilteredByGuests = function (card) {
    return card.offer.guests === +houseGuests.value;
  };

  var getCheckedFeatures = function () {
    return Array.prototype.slice.call(checkBoxes)
      .filter(function (checkBox) {
        return checkBox.checked;
      })
      .map(function (checkBox) {
        return checkBox.value;
      });
  };

  var getFilteredByFeatures = function (checkedFeatures) {
    return function (card) {
      var isVisible = true;
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (!card.offer.features.includes(checkedFeatures[i])) {
          isVisible = false;
          break;
        }
      }
      return isVisible;
    };
  };

  var updateOffer = function () {
    var filtered = offers.slice();
    var checkedFeatures = getCheckedFeatures();

    if (houseType.value !== ANY) {
      filtered = filtered.filter(getFilteredByType);
    }

    if (housePrice.value !== ANY) {
      filtered = filtered.filter(getFilteredByPrice);
    }

    if (houseRooms.value !== ANY) {
      filtered = filtered.filter(getFilteredByRooms);
    }

    if (houseGuests.value !== ANY) {
      filtered = filtered.filter(getFilteredByGuests);
    }

    if (checkedFeatures.length) {
      filtered = filtered.filter(getFilteredByFeatures(checkedFeatures));
    }

    return filtered;
  };

  window.backend.load(successOffer, window.util.errorMessage);

  window.homeFilter = {
    updateOffer: updateOffer
  };
})();
