'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.innerHTML = '';
        var photoItem = document.createElement('img');
        photoItem.src = reader.result;
        photoItem.classList.add('ad-form__photo');
        preview.appendChild(photoItem);
      });

      reader.readAsDataURL(file);
    }
  });
})();
