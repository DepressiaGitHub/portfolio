'use strict';

(function () {

  var siteMap = document.querySelector('.map');
  var pinElement = document.querySelector('.map__pins');
  var fieldsetList = document.querySelectorAll('fieldset');
  var userForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');

  siteMap.classList.add('map--faded');
  userForm.classList.add('ad-form--disabled');

  var clearPins = function () {
    pinElement.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
      el.classList.add('hidden');
    });
  };

  fieldsetList.forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });

  var enableSite = function () {
    siteMap.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    pinElement = document.querySelector('.map__pins');

    fieldsetList.forEach(function (el) {
      el.removeAttribute('disabled');
    });

    window.pin.newPosition();
    window.offer.render();
    window.offer.startFilters();
  };

  var disableSite = function () {
    siteMap.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');

    // Находим и удаляет аватарку и фотографию пользователя.
    userForm.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    userForm.querySelector('.ad-form__photo').innerHTML = '';

    // Сбрасываем все фильтры в исходное состояние в том числе и основной маркер.
    clearPins();
    filters.reset();
    userForm.reset();
    closeCardAll();
    mapPinMain.style.left = window.pin.mapPinMainStartX;
    mapPinMain.style.top = window.pin.mapPinMainStartY;
    window.pin.newPosition();

    fieldsetList.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  };

  var resetButton = userForm.querySelector('.ad-form__reset');
  var onResetClick = function (evt) {
    evt.preventDefault();
    disableSite();
  };

  resetButton.addEventListener('click', onResetClick);

  var openedCard;

  var closeCardsOnEsc = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE.ESC) {
      evt.preventDefault();
      closeCardAll();
    }
  };

  var removeActiveMapPin = function () {
    pinElement.querySelectorAll('.map__pin--active').forEach(function (el) {
      el.classList.remove('map__pin--active');
    });
  };

  var closeCardAll = function () {
    openedCard.forEach(function (el) {
      el.classList.add('hidden');
      removeActiveMapPin();
    });

    document.removeEventListener('keydown', closeCardsOnEsc);
  };

  var startMap = function () {
    var buttonCloseCard = document.querySelectorAll('.popup__close');
    var buttonOpenCard = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    openedCard = document.querySelectorAll('.map__card');

    var showCard = function (card) {
      closeCardAll();
      card.classList.remove('hidden');

      document.addEventListener('keydown', closeCardsOnEsc);
    };

    var addPinClickOpen = function (button, card) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        showCard(card);
        button.classList.add('map__pin--active');
      });
    };

    for (var i = 0; i < buttonOpenCard.length; i++) {
      addPinClickOpen(buttonOpenCard[i], openedCard[i]);
    }

    var addPinClickClose = function (button) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        closeCardAll();
      });
    };

    buttonCloseCard.forEach(function (el) {
      addPinClickClose(el);
    });
  };

  window.map = {
    enableSite: enableSite,
    disableSite: disableSite,
    startMap: startMap
  };
})();
