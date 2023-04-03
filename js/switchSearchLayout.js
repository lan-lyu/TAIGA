// function toggleLayout() {
//     var content = document.querySelector(".content");
//     var hidden = content.querySelector(".hidden");
//     hidden.classList.toggle("hidden");
// }

// function toggleLayout() {
//     var layout1 = document.querySelector(".layout1");
//     var layout2 = document.querySelector(".layout2");

//     if (layout1.style.display === "none") {
//         layout1.style.display = "block";
//         layout2.style.display = "none";
//     } else {
//         layout1.style.display = "none";
//         layout2.style.display = "block";
//     }
// }

function toggleLayout() {
  var checkBox = document.getElementById("switchLayout");
  if (checkBox.checked == true) {
    window.location.href = "search-2.html";
  }
}

function toggleLayoutBack() {
  var checkBox = document.getElementById("switchLayout2");
  if (checkBox.checked == false) {
    window.location.href = "search.html";
  }
}

document.getElementById("search-button-index").addEventListener("click", () => {
  window.location.href = "search.html";
});