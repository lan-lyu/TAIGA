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

function toogleGoogle(){
  var checkBox = document.getElementById("switchLayout-google-2");
  if (checkBox.checked == true){
    window.location.href = "search-2-google.html";
  }
}

function toogleSearch2(){
  var checkBox = document.getElementById("switchLayout-google");
  if (checkBox.checked == false){
    window.location.href = "search-2.html";
  }
}