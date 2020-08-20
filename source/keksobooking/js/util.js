'use strict';

(function () {
  window.util = {
    errorMessage: function (message) {
      var alert = document.getElementById('error-block');

      if (alert) {
        node.textContent = message;
      } else {
        var node = document.createElement('div');
        node.style = 'display: block; z-index: 9999; margin: 0 auto; text-align: center; color: white; background-color: gray;';
        node.style.position = 'fixed';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '40px';
        node.id = 'error-block';

        node.textContent = message;
        document.body.insertAdjacentElement('afterbegin', node);
      }
    },

    KEY_CODE: {
      ESC: 27,
      LEFT_MOUSE: 0
    }
  };
})();
