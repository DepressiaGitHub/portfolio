var callbackLink = document.querySelector(".write-us-button");
			
var callbackPopup = document.querySelector(".modal-callback");
var callbackClose = callbackPopup.querySelector(".modal-close");

var callbackForm = callbackPopup.querySelector("form");
var userName = callbackPopup.querySelector("[name=name]");
var userEmail = callbackPopup.querySelector("[name=email]");
var userMessage = callbackPopup.querySelector("[name=message]");

var isStorageSupport = true;
var storage = "";

try {
	storage = localStorage.getItem("userName");
}	catch (err) {
	isStorageSupport = false;
}

callbackLink.addEventListener("click", function (evt){
	evt.preventDefault();
	callbackPopup.classList.add("modal-show");

	if (storage) {
		userName.value = storage;
		userEmail.focus();
	} else {
		userName.focus();
	}
});

callbackClose.addEventListener("click", function (evt){
	evt.preventDefault();
	callbackPopup.classList.remove("modal-show");
	callbackPopup.classList.remove("modal-error");
});

callbackForm.addEventListener("submit", function (evt) {
	if (!userName.value || !userEmail.value || !userMessage.value) {
	evt.preventDefault();
	callbackPopup.classList.remove("modal-error");
	callbackPopup.offsetWidth = callbackPopup.offsetWidth;
	callbackPopup.classList.add("modal-error")
	console.log("Нужжно ввести имя, почту и сообщение.");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("userName", userName.value);
		}
	}
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (callbackPopup.classList.contains("modal-show")){
			evt.preventDefault();
			callbackPopup.classList.remove("modal-show");
			callbackPopup.classList.remove("modal-error");
		}
	}
});