//import similarity from "string-cosine-similarity";

const handleSearch = async (query) => {
    let response = await fetch(`https://ddb.m4ke.org/search?q=${query}`);
    let data = await response.json();
    let images_1 = data.results.map((result) => [
        `https://diffusiondb.m4ke.org/${result.id}.jpg`,
        result.p,
    ]);
    response = await fetch(`https://lexica.art/api/v1/search?q=${query}`);
    let res = await response.json();
    //remove nudity images
    res.images = res.images.filter((image) => image.nsfw === false);
    let images_2 = res.images.map((result) => [result.src, result.prompt]);
    //put both images together and sort by prompt and remove duplicates
    let images = images_1.concat(images_2);
    /*images.sort((a, b) => {
        return similarity(b[1], query) - similarity(a[1], query);
    });*/
    return images;
};

async function searchFunction (event, inputId, img_num) {
    event.preventDefault();

    const form = document.querySelector(`#query-form-${inputId}`);
    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;
    if(searchTerm == "") {
        alert("Please enter a search term!");
        return;
    }

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
    // serachInProgressText.style.display = "block";

    // show loading animation for images
    for (let i = 0; i < img_num; i++) {
        const loadingBox = document.createElement("div");
        loadingBox.classList.add("image-loading-box");
        gallery.appendChild(loadingBox);
    }

    const images = await handleSearch(searchTerm);
    setTimeout(function() {console.log("to test the loading animation");}, 5000);

    serachInProgressText.style.display = "none";
    gallery.innerHTML = "";
    for (let i = 0; i < img_num; i++) {
      const img = document.createElement("img");
      img.src = images[i][0];
      img.alt = images[i][1];
      gallery.appendChild(img);
    }
}


// test function for search
async function searchUnsplashFunction (event, inputId, img_num) {
    event.preventDefault();

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
    serachInProgressText.style.display = "block";

    const form = document.querySelector(`#query-form-${inputId}`);
    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;
    const url = `https://source.unsplash.com/1600x900/?${searchTerm}`;

    serachInProgressText.style.display = "none";
    for (let i = 0; i < img_num; i++) {
        const img = document.createElement('img');
        img.src = `${url}&${i}`;
        img.alt = searchTerm;
        gallery.appendChild(img);
    }
}

// google search
async function searchGoogleFunction (event, inputId, img_num) {
    event.preventDefault();

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
    serachInProgressText.style.display = "block";

    const form = document.querySelector(`#query-form-${inputId}`);
    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;

    // Replace apiKey and cx with your own
    const apiKey = "";
    const cx = "";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(searchTerm)}`;

    serachInProgressText.style.display = "none";
    for (let i = 0; i < img_num; i++) {
        const img = document.createElement('img');
        img.src = `${url}&${i}`;
        img.alt = searchTerm;
        gallery.appendChild(img);
    }
}


function performImageSearch(event, inputId, img_num) {

    event.preventDefault();

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
    serachInProgressText.style.display = "block";

    const form = document.querySelector(`#query-form-${inputId}`);
    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;

    const apiKey = "AIzaSyDs_FMoDmyUyXCUpKBvj-NN-cm-oxH9Mg4";
    const cx = "126d91af9e97942e8";
    var url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(searchTerm)}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
   
        serachInProgressText.style.display = "none";
        for (let i = 0; i < img_num; i++) {
            var item = data.items[i];
            var imageElement = document.createElement("img");
            imageElement.src = item.link;
            imageElement.alt = item.title;
    
            gallery.appendChild(imageElement);
        }
      })
      .catch(error => console.log(error));
}

function displayImageResults(items) {
    var imageResults = document.getElementById("imageResults");
    imageResults.innerHTML = "";

    items.forEach(function(item) {
        var imageElement = document.createElement("img");
        imageElement.src = item.link;
        imageElement.alt = item.title;

        imageResults.appendChild(imageElement);
    });
}
