// click on "+ new thread" button
const popup = document.querySelector("#add-thread-popup-one");
const popupClose = document.querySelector("#popup-close-button-one");
const popupButton = document.querySelector("#add-thread-button-one");
const overlay = document.querySelector("#overlay-one");

popupButton.addEventListener("click", function () {
    popup.style.display = "block";
});

popupClose.addEventListener("click", function () {
    popup.style.display = "none";
    overlay.style.display = "none";
});

// function to copy the gallery to the thread popup
function copyGallery(src, dst) {
    const gallery1 = document.querySelector(`#${src}`);
    const gallery2 = document.querySelector(`#${dst}`);
    // gallery2.innerHTML = gallery1.innerHTML;

    const newGallery = document.createElement("div");
    newGallery.innerHTML = gallery1.innerHTML;

    // makeGallerySelectable(newGallery);
    const images = newGallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        // resize the images
        images[i].style.width = "80px";
        images[i].style.height = "80px";
        images[i].style.margin = "3px";
    }

    gallery2.innerHTML = newGallery.innerHTML;
}

// click on "create thread" button
const createButton = document.querySelector("#create-thread-one");
const threadPopup = document.querySelector("#create-thread-popup-1-one");

createButton.addEventListener("click", () => {
    popup.style.display = "none";
    threadPopup.style.display = "block";
    overlay.style.display = "block";
    copyGallery("search-gallery-one", "thread-gallery-one");
});

// add event listener to the "next" and "back" buttons
document.getElementById("next-button-1-one").addEventListener("click", () => {
    document.getElementById("create-thread-popup-1-one").style.display = "none";
    document.getElementById("create-thread-popup-2-one").style.display = "block";
});

document.getElementById("next-button-2-one").addEventListener("click", () => {
    document.getElementById("create-thread-popup-2-one").style.display = "none";
    document.getElementById("create-thread-popup-3-one").style.display = "block";
});

document.getElementById("thread-popup-back-1-one").addEventListener("click", () => {
    document.getElementById("create-thread-popup-1-one").style.display = "none";
    document.getElementById("add-thread-popup-one").style.display = "block";
});

document.getElementById("thread-popup-back-2-one").addEventListener("click", () => {
    document.getElementById("create-thread-popup-2-one").style.display = "none";
    document.getElementById("create-thread-popup-1-one").style.display = "block";
});

document.getElementById("thread-popup-back-3-one").addEventListener("click", () => {
    document.getElementById("create-thread-popup-3-one").style.display = "none";
    document.getElementById("create-thread-popup-2-one").style.display = "block";
});