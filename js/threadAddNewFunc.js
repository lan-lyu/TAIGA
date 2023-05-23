// make the images multi-selectable
function addCheckbox(gallery) {
    const images = gallery.getElementsByTagName("img");
    const newGallery = document.createElement("div");
    const imgLength = images.length;
    // add checkbox to each image
    for (let i = 0; i < imgLength; i++) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox-input";
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(images[0]);
        newGallery.appendChild(checkboxContainer);
    }
    gallery.innerHTML = newGallery.innerHTML;
}

// add event listener to the checkbox
function addCheckboxListener(gallerySuffix) {
    const checkboxes = document.querySelectorAll(`#${gallerySuffix} .checkbox-input`);
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            const imageContainer = this.parentNode;
            if (this.checked) {
                imageContainer.classList.add("selected");
            } else {
                imageContainer.classList.remove("selected");
            }
        });
    });
}

// function to copy the gallery to the thread popup
function copyGallery(src, dst) {
    const gallery1 = document.querySelector(`#${src}`);
    const gallery2 = document.querySelector(`#${dst}`);

    const newGallery = document.createElement("div");
    newGallery.innerHTML = gallery1.innerHTML;

    addCheckbox(newGallery);

    gallery2.innerHTML = newGallery.innerHTML;

    addCheckboxListener(dst);
}


function checkGalleryEmpty(gallerySuffix) {
    const gallery = document.querySelector(`#search-gallery-${gallerySuffix}`);
    if (gallery.innerHTML == "") {
        return true;
    }
    return false;
}

function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {
    // click on "+ new thread" button
    const popup = document.querySelector(`#add-thread-popup${suffix}`);
    const popupClose = document.querySelector(`#popup-close-button${suffix}`);
    const popupButton = document.querySelector(`#add-thread-button${suffix}`);
    const overlay = document.querySelector(`#overlay${suffix}`);

    popupButton.addEventListener("click", function() {             
        // check if the gallery is empty, if empty then show error message
        if (oneOrTwo == 1 && checkGalleryEmpty(gallery1Suffix)) {
            alert("Please search images before adding a new thread!");
            return;
        } else if (oneOrTwo == 2 && (checkGalleryEmpty(gallery1Suffix) && checkGalleryEmpty(gallery2Suffix))) {
            alert("Please search images before adding a new thread!");
            return;
        }

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
