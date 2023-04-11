// make editions on the gallery
function refineGallery(gallery) {
    const images = gallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        // resize the images
        images[i].style.width = "80px";
        images[i].style.height = "80px";
        images[i].style.margin = "3px";
    }
}

// function to copy the gallery to the thread popup
function copyGallery(src, dst) {
    const gallery1 = document.querySelector(`#${src}`);
    const gallery2 = document.querySelector(`#${dst}`);

    const newGallery = document.createElement("div");
    newGallery.innerHTML = gallery1.innerHTML;

    const images = newGallery.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        // resize the images
        images[i].style.width = "80px";
        images[i].style.height = "80px";
        images[i].style.margin = "3px";
    }

    gallery2.innerHTML = newGallery.innerHTML;
}

function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {
    // click on "+ new thread" button
    const popup = document.querySelector(`#add-thread-popup${suffix}`);
    const popupClose = document.querySelector(`#popup-close-button${suffix}`);
    const popupButton = document.querySelector(`#add-thread-button${suffix}`);
    const overlay = document.querySelector(`#overlay${suffix}`);

    popupButton.addEventListener("click", function() {
        popup.style.display = "block";
    });

    popupClose.addEventListener("click", function() {
        popup.style.display = "none";
        overlay.style.display = "none";
    });

    // click on "create thread" button
    const createButton = document.querySelector(`#create-thread${suffix}`);
    const threadPopup = document.querySelector(`#create-thread-popup-1${suffix}`);
    createButton.addEventListener("click", () => {
        popup.style.display = "none";
        threadPopup.style.display = "block";
        overlay.style.display = "block";
        if (oneOrTwo == 1) {
            copyGallery(`search-gallery-${gallery1Suffix}`, `thread-gallery-${gallery1Suffix}`);
        } else if (oneOrTwo == 2) {
            copyGallery(`search-gallery-${gallery1Suffix}`, `thread-gallery-${gallery1Suffix}`);
            copyGallery(`search-gallery-${gallery2Suffix}`, `thread-gallery-${gallery2Suffix}`);
        } else {
            throw new Error("oneOrTwo must be 1 or 2");
        }
    });
    
    // add event listener to the "next" and "back" buttons
    document.getElementById(`next-button-1${suffix}`).addEventListener("click", () => {
        document.getElementById(`create-thread-popup-1${suffix}`).style.display = "none";
        document.getElementById(`create-thread-popup-2${suffix}`).style.display = "block";
    });

    document.getElementById(`next-button-2${suffix}`).addEventListener("click", () => {
        document.getElementById(`create-thread-popup-2${suffix}`).style.display = "none";
        document.getElementById(`create-thread-popup-3${suffix}`).style.display = "block";
    });

    document.getElementById(`thread-popup-back-1${suffix}`).addEventListener("click", () => {
        document.getElementById(`create-thread-popup-1${suffix}`).style.display = "none";
        document.getElementById(`add-thread-popup${suffix}`).style.display = "block";
    });

    document.getElementById(`thread-popup-back-2${suffix}`).addEventListener("click", () => {
        document.getElementById(`create-thread-popup-2${suffix}`).style.display = "none";
        document.getElementById(`create-thread-popup-1${suffix}`).style.display = "block";
    });

    document.getElementById(`thread-popup-back-3${suffix}`).addEventListener("click", () => {
        document.getElementById(`create-thread-popup-3${suffix}`).style.display = "none";
        document.getElementById(`create-thread-popup-2${suffix}`).style.display = "block";
    });
}
