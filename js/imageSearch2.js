//import similarity from "string-cosine-similarity";

const form1 = document.querySelector("#query-form-1");
const form2 = document.querySelector("#query-form-2");
const gallery1 = document.querySelector("#seach-gallery-1");
const gallery2 = document.querySelector("#seach-gallery-2");

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

async function searchFunction (event, inputId) {
    event.preventDefault();

    const form = document.querySelector(`#query-form-${inputId}`);
    const gallery = document.querySelector(`#search-gallery-${inputId}`);

    const searchTerm = form.querySelector(`#search-input-${inputId}`).value;
    const images = await handleSearch(searchTerm);
  
    gallery.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const img = document.createElement("img");
      img.src = images[i][0];
      img.alt = images[i][1];
      gallery.appendChild(img);
    }
}

form1.addEventListener("submit", (event) => {
    searchFunction(event, "1");
});

form2.addEventListener("submit", (event) => {
    searchFunction(event, "2");
});
