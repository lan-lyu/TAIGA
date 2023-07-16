// var gallery1HTML = null;
// var gallery2HTML = null;

// called in search-2.html and search.html
function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {

    // click on "create thread" button
    const createButton = document.querySelector(`#thread-create-btn${suffix}`);
    createButton.addEventListener("click", () => {
        // if(!checkThreadContentValid(gallery1Suffix)) {
            // return;
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

// function to copy the gallery to the thread popup
function copyGallery(src, dst) {
    const gallery1 = document.querySelector(`#${src}`);
    const gallery2 = document.querySelector(`#${dst}`);

    const newGallery = document.createElement("div");
    const images = gallery1.getElementsByTagName("img");
    const imgLength = images.length;
    // make each image clickable
    for (let i = 0; i < imgLength; i++) {
        const galleryItemClass = document.createElement("div");
        galleryItemClass.className = "gallery-item";
        galleryItemClass.appendChild(images[0]);
        newGallery.appendChild(galleryItemClass);
    }
    gallery2.innerHTML = newGallery.innerHTML;
}

// check if the thread content is valid
function checkThreadContentValid() {
    const threadTitle = document.querySelector(`#thread-input-title`).value;
    const threadTag = document.querySelector(`#thread-input-tag`).value;
    const threadDescription = document.querySelector(`#thread-input-desc`).value;
    if ((!checkThreadTitleValid(threadTitle)) || 
        (!checkThreadTagValid(threadTag)) ||
        (!checkThreadDescriptionValid(threadDescription))) {
        return false;
    }
    return true;
}
function checkThreadTitleValid(title) {
    if (title === "") {
        alert("Please enter a title for the thread!");
        return false;
    }
    return true;
}
function checkThreadTagValid(tag) {
    if (tag === "0") {
        alert("Please enter a tag for the thread!");
        return false;
    }
    return true;
}
function checkThreadDescriptionValid(description) {
    if (description === "") {
        alert("Please enter a description for the thread!");
        return false;
    }
    return true;
}