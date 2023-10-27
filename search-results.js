// search-results.js
document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("query");

    if (searchTerm) {
        const img_num = 10; // Number of images to generate
        // const images = await handleGeneration(searchTerm, img_num);

        const gallery = document.getElementById("search-gallery");
        const url = `https://source.unsplash.com/1600x1600/?${searchTerm}`;
        for (let i = 0; i < img_num; i++) {
            const img = document.createElement("img");
            img.src = `${url}&${i}`;
            gallery.appendChild(img);
        }
    }
});
// const img_num = 10; // Number of images to generate
// const url = `https://source.unsplash.com/1600x1600/?${searchTerm}`;

// for (let i = 0; i < img_num; i++) {
//     const img = document.createElement('img');
//     img.src = `${url}&${i}`;
//     img.alt = searchTerm;
//     // gallery.appendChild(img);
// }
