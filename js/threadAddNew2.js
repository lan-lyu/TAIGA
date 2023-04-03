// click on "+ new thread" button
const popup = document.querySelector("#add-thread-popup");
const popupClose = document.querySelector("#popup-close-button");
const popupButton = document.querySelector("#add-thread-button");
const overlay = document.querySelector("#overlay");

popupButton.addEventListener("click", function () {
    popup.style.display = "block";
});

popupClose.addEventListener("click", function () {
    popup.style.display = "none";
    overlay.style.display = "none";
});

// make editions on the gallery
function refineGallery(gallery) {
    const images = gallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        // resize the images
        images[i].style.width = "80px";
        images[i].style.height = "80px";
        images[i].style.margin = "3px";
        // make the images selectable
        // images[i].addEventListener("click", function() {
        //     images[i].classList.toggle("selected");
        // });
    }
}

// function to copy the gallery to the thread popup
function copyGallery(src, dst) {
    const gallery1 = document.querySelector(`#${src}`);
    const gallery2 = document.querySelector(`#${dst}`);
    // gallery2.innerHTML = gallery1.innerHTML;

    const newGallery = document.createElement("div");
    newGallery.innerHTML = gallery1.innerHTML;
    // const images = gallery.querySelectorAll('img');
    // images.forEach(img => {
    //     img.style.margin = '2px';
    //     img.style.width = '80px';
    //     img.style.height = '80px';
    // });

    // makeGallerySelectable(newGallery);
    const images = newGallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        // resize the images
        images[i].style.width = "80px";
        images[i].style.height = "80px";
        images[i].style.margin = "3px";
        // make the images selectable # TODO: make it work
        // images[i].addEventListener("click", () => {
        //     // this.classList.toggle("selected");
        //     this.style.border = "5px solid #FFD540";
        //     this.classList.toggle("selected");
        // });
    }

    gallery2.innerHTML = newGallery.innerHTML;
}

// click on "create thread" button
const createButton = document.querySelector("#create-thread");
const threadPopup = document.querySelector("#create-thread-popup-1");

createButton.addEventListener("click", () => {
    popup.style.display = "none";
    threadPopup.style.display = "block";
    overlay.style.display = "block";
    copyGallery("search-gallery-1", "thread-gallery-1");
    copyGallery("search-gallery-2", "thread-gallery-2");
});

// add event listener to the "next" and "back" buttons
document.getElementById("next-button-1").addEventListener("click", () => {
    document.getElementById("create-thread-popup-1").style.display = "none";
    document.getElementById("create-thread-popup-2").style.display = "block";
});

document.getElementById("next-button-2").addEventListener("click", () => {
    document.getElementById("create-thread-popup-2").style.display = "none";
    document.getElementById("create-thread-popup-3").style.display = "block";
});

document.getElementById("thread-popup-back-1").addEventListener("click", () => {
    document.getElementById("create-thread-popup-1").style.display = "none";
    document.getElementById("add-thread-popup").style.display = "block";
});

document.getElementById("thread-popup-back-2").addEventListener("click", () => {
    document.getElementById("create-thread-popup-2").style.display = "none";
    document.getElementById("create-thread-popup-1").style.display = "block";
});

document.getElementById("thread-popup-back-3").addEventListener("click", () => {
    document.getElementById("create-thread-popup-3").style.display = "none";
    document.getElementById("create-thread-popup-2").style.display = "block";
});