$(document).ready(function() {
    // Override Bootstrap modal behavior
    $.fn.modal.Constructor.prototype._enforceFocus = function() {};

    // Add event listener to prevent modal content from being moved
    $('.modal').on('hidden.bs.modal', function(e) {
        if ($(e.currentTarget).hasClass('show')) {
        $(e.currentTarget).appendTo(document.body);
        }
    });
});

// called in search-2.html and search.html
function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {

    // click on "+ new thread" button
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

    // document.getElementById(`thread-create-preview-button${suffix}`).addEventListener("click", () => {
        // set the content for the third thread preview page
        // const threadTitle = document.querySelector(`#thread-title-${gallery1Suffix}`).value;
        // const threadTag = document.querySelector(`#thread-tag-${gallery1Suffix}`).value;
        // const threadDescription = document.querySelector(`#thread-description-${gallery1Suffix}`).value;
        // document.querySelector(`#thread-preview-title-${gallery1Suffix}`).textContent = threadTitle;
        // document.querySelector(`#thread-preview-tag-${gallery1Suffix}`).textContent = threadTag;
        // document.querySelector(`#thread-preview-description-${gallery1Suffix}`).textContent = threadDescription;
    //     copyPreviewGallery(gallery1Suffix);
    //     if (oneOrTwo == 2) {
    //         copyPreviewGallery(gallery2Suffix);
    //     }
    // });

}

// check if the gallery is empty
function checkGalleryEmpty(gallerySuffix) {
    const gallery = document.querySelector(`#search-gallery-${gallerySuffix}`);
    if (gallery.innerHTML == "") {
        return true;
    }
    return false;
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