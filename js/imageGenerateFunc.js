const handleGeneration = async (query, img_num) => {
    // let response = await fetch('https://ezjqmqzpug.execute-api.us-east-1.amazonaws.com/Prod/predict', {
    let response = await fetch('https://vtsuohpeo0.execute-api.us-east-1.amazonaws.com/Prod/predict', {
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

    const searchSpinner = document.querySelector(`#generate-spinner-${inputId}`);
    searchSpinner.style.display = "block";

    const gallery = document.querySelector(`#search-gallery-${inputId}`); 
    gallery.innerHTML = "";

    const images = await handleGeneration(searchTerm, img_num);

    searchSpinner.style.display = "none";

    for (let i = 0; i < img_num; i++) {
      const img = document.createElement("img");
      img.src = images[i];
      gallery.appendChild(img);
    }
}