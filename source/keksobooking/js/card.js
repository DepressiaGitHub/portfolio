'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var HOUSE_TYPES_MAP = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var getHouseType = function (type) {
    return HOUSE_TYPES_MAP[type];
  };

  var getTextAboutRooms = function (rooms, guests) {
    var text = '';
    if (rooms === 1 || rooms % 10 === 1 && rooms % 100 !== 11) {
      text += rooms + ' комната для ';
    } else if (rooms % 10 < 5 && rooms % 10 > 0 && rooms % 100 > 21 || rooms % 10 < 5 && rooms % 100 < 5 && rooms % 10 > 0) {
      text += rooms + ' комнаты для ';
    } else {
      text += rooms + ' комнат для ';
    }
    switch (guests) {
      case 1:
        text += guests + ' гостя';
        break;
      default:
        text += guests + ' гостей';
    }

    return text;
  };

  var createFeature = function (featureList) {
    var fragmentFeature = document.createDocumentFragment();
    featureList.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList = 'popup__feature popup__feature--' + feature;
      fragmentFeature.appendChild(featureItem);
    });
    return fragmentFeature;
  };

  var mapCardElement = cardTemplate.cloneNode(true);
  var photoElement = mapCardElement.querySelector('.popup__photos')
    .querySelector('.popup__photo');

  var photoElementTemplate = photoElement.cloneNode(true);

  var createPhoto = function (photoList) {
    var fragmentPhoto = document.createDocumentFragment();
    photoList.forEach(function (photo) {
      var photoItem = photoElementTemplate.cloneNode(true);
      photoItem.src = photo;
      fragmentPhoto.appendChild(photoItem);
    });
    return fragmentPhoto;
  };

  var renderCard = function (data) {
    mapCardElement = cardTemplate.cloneNode(true);

    // Чистим в шаблоне список features и photos.
    mapCardElement.querySelector('.popup__features').innerHTML = '';
    mapCardElement.querySelector('.popup__photos').innerHTML = '';

    // Запполняем карточки данными.
    mapCardElement.classList.add('hidden');
    mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getHouseType(data.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = getTextAboutRooms(data.offer.rooms, data.offer.guests);
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    mapCardElement.querySelector('.popup__features').appendChild(createFeature(data.offer.features));
    mapCardElement.querySelector('.popup__description').textContent = data.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = data.author.avatar;
    mapCardElement.querySelector('.popup__photos').appendChild(createPhoto(data.offer.photos));

    return mapCardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
