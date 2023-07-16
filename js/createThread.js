// var gallery1HTML = null;
// var gallery2HTML = null;

// called in search-2.html and search.html
function addButtonListener(suffix, oneOrTwo, gallery1Suffix, gallery2Suffix) {

    // click on "create thread" button
    const createButton = document.querySelector(`#thread-create-btn${suffix}`);
    createButton.addEventListener("click", () => {
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

// fucntion to create post to discourse forum
function createThread(gallery1Suffix, comparison) {
    const searchTerm1 = document.querySelector(`#search-input-${gallery1Suffix}`).value.trim();
    var searchTerm2 = "";
    const threadTitle = document.querySelector(`#thread-title-${gallery1Suffix}`).value.trim();
    const threadTag = document.querySelector(`#thread-tag-${gallery1Suffix}`).value;
    const threadDescription = document.querySelector(`#thread-description-${gallery1Suffix}`).value;
    var checkboxes_selected = []
    var image_urls = []
    var image_name = "TAIGA_Single"
    var compare = false
    const gallery1 = document.querySelector(`#thread-gallery-${gallery1Suffix}`);
    checkboxes = gallery1.querySelectorAll(".checkbox-input");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkboxes_selected.push(true)
        } else {
            checkboxes_selected.push(false)
        }
    });
    images = gallery1.querySelectorAll("img");
    images.forEach(function(image) {
        image_urls.push(image.src)
    });
    if(comparison){
        const gallery2 = document.querySelector(`#thread-gallery-2`);
        searchTerm2 = document.querySelector(`#search-input-2`).value.trim();
        checkboxes = gallery2.querySelectorAll(".checkbox-input");
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkboxes_selected.push(true)
            } else {
                checkboxes_selected.push(false)
            }
        });
        images = gallery2.querySelectorAll("img");
        images.forEach(function(image) {
            image_urls.push(image.src)
        });
        image_name = "TAIGA_Compare"
        compare = true
    }
    console.log(checkboxes_selected)
    console.log(image_urls)
    postToDiscourse(searchTerm1, searchTerm2, threadTitle, threadTag, "", threadDescription, image_urls, checkboxes_selected, image_name, compare)
}

function generateTopicURL(title) {
    const BASE_URL = "https://forum.weaudit.org/t/"
    var wordsArray = title.split("]vs[");
    var resultString = wordsArray.map(word => word.replace(/\[|\]/g, "").toLowerCase()).join("-vs-");
    wordsArray = resultString.split(" ");
    resultString = wordsArray.map(word => word.replace(/\[|\]/g, "").toLowerCase()).join("-");
    return BASE_URL + resultString + "/";
}

async function postToDiscourse(search1, search2, title, tag, category, content, image_urls, checkbox, image_name, compare) {
    const categoryNum = 46; // Category for stable-diffusion
    await fetch(`https://fmduzu5ad1.execute-api.us-east-1.amazonaws.com/Prod/taigacreatepost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            headers: {
                "Api-Key": "faa52080e7da71c54395adbaafa82d33590b26cb3426d0060ea0088ba0f26091",
                "Api-Username": "CMUweaudit-admin",
            },
            params: {
                title: title,
                raw: "<b>" + tag + "</b>" + "<hr>" + content + "<br>",
                category: categoryNum,
                tags: [tag]
            },
            searchTerm1: search1,
            searchTerm2: search2,
            urls: image_urls,
            checkbox: checkbox,
            compare: compare,
            image_name: image_name
        })
    });
    const URL = generateTopicURL(title);
    window.location.href = URL;
}