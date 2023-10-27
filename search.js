// search.js
document.getElementById("query-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const searchTerm = document.getElementById("search-input").value;
    if (searchTerm === "") {
        alert("Please enter a search term!");
        return;
    }

    // const img_num = 10; // Number of images to generate
    // const url = `https://source.unsplash.com/1600x1600/?${searchTerm}`;

    // for (let i = 0; i < img_num; i++) {
    //     const img = document.createElement('img');
    //     img.src = `${url}&${i}`;
    //     img.alt = searchTerm;
    //     // gallery.appendChild(img);
    // }

    // Redirect to search results page with the search term as a parameter
    window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
});