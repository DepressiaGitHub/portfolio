'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var BUNGALO_PRICE_MIN = 0;
  var FLAT_PRICE_MIN = 1000;
  var HOUSE_PRICE_MIN = 5000;
  var PALACE_PRICE_MIN = 10000;
  var userTitleInput = document.querySelector('#title');
  var userPriceInput = document.querySelector('#price');
  var userTypeOption = document.querySelector('#type');

  var showErrorAlert = function (name) {
    name.setAttribute('style', 'border-color: red; background-color: pink; border-width: 2px');
  };

  var closeErrorAlert = function (name) {
    name.removeAttribute('style');
  };

  userTitleInput.addEventListener('invalid', function () {
    if (userTitleInput.validity.tooShort) {
      userTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
    } else if (userTitleInput.validity.tooLong) {
      userTitleInput.setCustomValidity('Заголовок должен состоять максимум из 100 символов.');
    } else if (userTitleInput.validity.valueMissing) {
      userTitleInput.setCustomValidity('Обязательное поле');
      showErrorAlert(userTitleInput);
    } else {
      userTitleInput.setCustomValidity('');
    }
  });

  userTitleInput.addEventListener('input', function () {
    var valueLength = userTitleInput.value.length;

    if (valueLength < TITLE_MIN_LENGTH) {
      userTitleInput.setCustomValidity('Ещё ' + (TITLE_MIN_LENGTH - valueLength) + ' символов.');
      showErrorAlert(userTitleInput);
    } else if (valueLength > TITLE_MAX_LENGTH) {
      userTitleInput.setCustomValidity('Удалите лишние ' + (valueLength - TITLE_MAX_LENGTH) + ' символов.');
      showErrorAlert(userTitleInput);
    } else {
      userTitleInput.setCustomValidity('');
      closeErrorAlert(userTitleInput);
    }
  });

  var setPriceInputAttrs = function (priseMin) {
    userPriceInput.min = priseMin;
    PRICE_MIN = priseMin;
    userPriceInput.placeholder = priseMin;
  };

  userTypeOption.addEventListener('change', function () {
    switch (userTypeOption.value) {
      case 'bungalo':
        setPriceInputAttrs(BUNGALO_PRICE_MIN);
        break;
      case 'flat':
        setPriceInputAttrs(FLAT_PRICE_MIN);
        break;
      case 'house':
        setPriceInputAttrs(HOUSE_PRICE_MIN);
        break;
      case 'palace':
        setPriceInputAttrs(PALACE_PRICE_MIN);
        break;
    }
  });

  userPriceInput.addEventListener('invalid', function () {
    if (userPriceInput.validity.valueMissing) {
      userPriceInput.setCustomValidity('Обязательное поле');
      showErrorAlert(userPriceInput);
    }
  });

  userPriceInput.addEventListener('input', function () {
    if (userPriceInput.value < PRICE_MIN) {
      userPriceInput.setCustomValidity('Давай дороже!');
      showErrorAlert(userPriceInput);
    } else if (userPriceInput.value > PRICE_MAX) {
      userPriceInput.setCustomValidity('Ну это слишком дорого!');
      showErrorAlert(userPriceInput);
    } else {
      userPriceInput.setCustomValidity('');
      closeErrorAlert(userPriceInput);
    }
  });

  var userTimeIn = document.querySelector('#timein');
  var userTimeOut = document.querySelector('#timeout');

  userTimeIn.addEventListener('change', function () {
    userTimeOut.value = userTimeIn.value;
  });

  userTimeOut.addEventListener('change', function () {
    userTimeIn.value = userTimeOut.value;
  });

  var userRooms = document.querySelector('#room_number');
  var userGuests = document.querySelector('#capacity');
  var userGuestsList = userGuests.querySelectorAll('option');

  var userRoomsValues = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setAvailableRooms = function () {
    var userRoomValue = userRooms.value;
    var userGuestValues = userRoomsValues[userRoomValue];
    var isSelected = false;

    userGuestsList.forEach(function (el) {
      el.removeAttribute('selected');
    });

    for (var i = 0; i < userGuestsList.length; i++) {
      var option = userGuestsList[i];

      if (userGuestValues.includes(option.value)) {
        option.removeAttribute('disabled');
        if (!isSelected) {
          option.setAttribute('selected', 'selected');
          isSelected = true;
        }
      } else {
        option.setAttribute('disabled', 'disabled');
      }
    }
  };

  setAvailableRooms();
  userRooms.addEventListener('change', setAvailableRooms);
  var main = document.querySelector('main');

  // Находим форму.
  var form = document.querySelector('.ad-form');

  // Обработка успешной отправки формы.
  var successForm = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var successFormElement = successTemplate.cloneNode(true);

    main.appendChild(successFormElement);

    var removePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('mousedown', onPopupMouseDown);
    };

    var popup = main.querySelector('.success');
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ESC) {
        evt.preventDefault();
        removePopup();
      }
    };

    var onPopupMouseDown = function (evt) {
      if (evt.button === window.util.KEY_CODE.LEFT_MOUSE) {
        evt.preventDefault();
        removePopup();
      }
    };

    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupMouseDown);
    window.map.disableSite();
  };

  // Обработка ошибки при отправке формы.
  var errorForm = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorFormElement = errorTemplate.cloneNode(true);

    main.appendChild(errorFormElement);

    var removePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('mousedown', onPopupMouseDown);
    };

    var popup = main.querySelector('.error');
    var closePopup = main.querySelector('.error__button');
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ESC) {
        evt.preventDefault();
        removePopup();
      }
    };

    var onPopupMouseDown = function (evt) {
      if (evt.button === window.util.KEY_CODE.LEFT_MOUSE) {
        evt.preventDefault();
        removePopup();
      }
    };

    var onPopupButtonClick = function (evt) {
      evt.preventDefault();
      removePopup();
    };

    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupMouseDown);
    closePopup.addEventListener('click', onPopupButtonClick);
  };

  var submitOfferHandler = function (evt) {
    window.backend.save(new FormData(form), successForm, errorForm);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitOfferHandler);
})();
