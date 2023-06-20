# TAIGA

check the demo by accessing: https://lan-lyu.github.io/TAIGA/

To see the comparision search page with a side bar, visit: https://lan-lyu.github.io/TAIGA/search-2-side


## For Google Search

Replace the API key and CX in `js/imageSearch.js` with yours. 


```
    const apiKey = "";
    const cx = "";
```

You can get one by visiting https://developers.google.com/custom-search/v1/introduction.

Then on the page `/search-2-google` the right part search shows google search results.

## For Screen shot
The code for screenshot is
```html
<button onclick="captureScreenshot()">Capture Screenshot</button>

<div id="screenshotContainer"></div>

<script>
    function captureScreenshot() {
        html2canvas(document.body).then(function(canvas) {
            // Convert the canvas to a PNG image data URL
            var screenshotDataUrl = canvas.toDataURL("image/png");

            // Create an image element
            var imageElement = document.createElement("img");
            imageElement.src = screenshotDataUrl;

            // Append the image to the screenshot container div
            var screenshotContainer = document.getElementById("screenshotContainer");
            screenshotContainer.appendChild(imageElement);
        });
    }
</script>
```
If you directly run the html file in the browser, you may meet the error `DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported`. 

To solve this, you can run a local development server by running:


`python -m http.server` 

Then access the website by opening http://localhost:8000/, the screenshot should work now.