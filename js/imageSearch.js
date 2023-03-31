//import similarity from "string-cosine-similarity";

const form = document.querySelector("form");
const gallery = document.querySelector(".gallery");

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

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const searchTerm = form.querySelector("input").value;
  const images = await handleSearch(searchTerm);

  gallery.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const img = document.createElement("img");
    img.src = images[i][0];
    img.alt = images[i][1];
    gallery.appendChild(img);
  }
});
