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

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
    serachInProgressText.style.display = "block";

    const form = document.querySelector(`#query-form-${inputId}`);
    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;
    const images = await handleSearch(searchTerm);

    serachInProgressText.style.display = "none";
    for (let i = 0; i < img_num; i++) {
      const img = document.createElement("img");
      img.src = images[i][0];
      img.alt = images[i][1];
      gallery.appendChild(img);
    }
}


// // test function for search
// async function searchFunction (event, inputId, img_num) {
//     event.preventDefault();

//     const gallery = document.querySelector(`#search-gallery-${inputId}`); 
//     gallery.innerHTML = "";

//     const serachInProgressText = document.querySelector(`#search-in-progress-text-${inputId}`);
//     serachInProgressText.style.display = "block";

//     const form = document.querySelector(`#query-form-${inputId}`);
//     const searchTerm = form.querySelector(`#search-input-${inputId}`).value;
//     const url = `https://source.unsplash.com/1600x900/?${searchTerm}`;

//     serachInProgressText.style.display = "none";
//     for (let i = 0; i < img_num; i++) {
//         const img = document.createElement('img');
//         img.src = `${url}&${i}`;
//         img.alt = searchTerm;
//         gallery.appendChild(img);
//     }
// }