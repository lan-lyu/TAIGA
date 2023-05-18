function toggleLayout() {
  var checkBox = document.getElementById("switchLayout");
  if (checkBox.checked == true){
    window.location.href = "search-2.html";
  }
}

function toggleLayoutBack() {
  var checkBox = document.getElementById("switchLayout2");
  if (checkBox.checked == false){
    window.location.href = "search.html";
  }
}