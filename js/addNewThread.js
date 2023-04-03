const popup = document.querySelector("#add-thread-popup");
const popupClose = document.querySelector("#popup-close-button");
const popupButton = document.querySelector("#add-thread-button");

popupButton.addEventListener("click", function() {
    popup.style.display = "block";
});

popupClose.addEventListener("click", function() {
    popup.style.display = "none";
});
