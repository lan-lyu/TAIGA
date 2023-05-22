const handleGeneration = async (query, img_num) => {
    let response = await fetch(`http://127.0.0.1:5000/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": query,
            "num": img_num,
        })
    });
    let images = await response.json();
    return images;
};

async function generateFunction (event, inputId, img_num) {
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
    serachInProgressText.style.display = "block";

    const images = await handleGeneration(searchTerm, img_num);

    serachInProgressText.style.display = "none";
    for (let i = 0; i < img_num; i++) {
      const img = document.createElement("img");
      img.src = images[i];
      gallery.appendChild(img);
    }
}