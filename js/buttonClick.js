function handleClick() {
    const content = document.getElementById("searchInterface");
    if (content.classList.contains("displayed")) {
        content.classList.remove("displayed");
        content.classList.add("hidden");
    } else {
        content.classList.remove("hidden");
        content.classList.add("displayed");
    }
}

var button = document.getElementById('comparePrompts');
button.onclick = handleClick;