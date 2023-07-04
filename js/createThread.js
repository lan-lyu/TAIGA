// called in search-2.html and search.html
function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {

    const threadBeginButton = document.querySelector(`#thread-begin-button${suffix}`);
    threadBeginButton.addEventListener("click", function() {             
        // check if the gallery is empty, if empty then show error message
        if (oneOrTwo == 1 && checkGalleryEmpty(gallery1Suffix)) {
            alert("Please search images before creating a new thread!");
            return;
        } else if (oneOrTwo == 2 && (checkGalleryEmpty(gallery1Suffix) && checkGalleryEmpty(gallery2Suffix))) {
            alert("Please search images before creating a new thread!");
            return;
        }

        setSearchTitle(oneOrTwo, gallery1Suffix, gallery2Suffix);
        // createCanvas(oneOrTwo, gallery1Suffix, gallery2Suffix);
        popup.style.display = "block";
    });

    // click on "create thread" button
    const createButton = document.querySelector(`#thread-create-btn${suffix}`);
    createButton.addEventListener("click", () => {
        // if(!checkThreadContentValid(gallery1Suffix)) {
        //     return;
        // }
        if (oneOrTwo == 1) {
            copyGallery(`search-gallery-${gallery1Suffix}`, `thread-gallery-${gallery1Suffix}`);
        } else if (oneOrTwo == 2) {
            copyGallery(`search-gallery-${gallery1Suffix}`, `thread-gallery-${gallery1Suffix}`);
            copyGallery(`search-gallery-${gallery2Suffix}`, `thread-gallery-${gallery2Suffix}`);
        } else {
            throw new Error("oneOrTwo must be 1 or 2");
        }
    });
}

// check if the gallery is empty
function checkGalleryEmpty(gallerySuffix) {
    const gallery = document.querySelector(`#search-gallery-${gallerySuffix}`);
    if (gallery.innerHTML == "") {
        return true;
    }
    return false;
}

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