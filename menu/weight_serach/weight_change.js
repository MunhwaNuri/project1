var weight_middlemenu = document.getElementsByClassName("weight_middlemenu");
for(var i = 0; i < weight_middlemenu.length; i++){
  weight_middlemenu[i].change = function (e){
    var select = document.getElementsByClassName("weight_middlemenu")[i];
    var keyword_region = (select.options[select.selectedIndex].value);
    return keyword_region;
  }
}