'use strict';

(function () {
  let page = document.querySelector('.page');
  let themeButton = document.querySelector('.page-header__theme-button');

  themeButton.onclick = function () {
    page.classList.toggle('dark-theme');
  };
})();
