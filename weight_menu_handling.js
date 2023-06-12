
var weight_btn = document.getElementById("weight_btn");
var gyeonggi_select = document.getElementById("gyeonggi_select");
var weight_topmenu = document.getElementsByClassName("weight_topmenu");
var weight_middlemenu = document.getElementsByClassName("weight_middlemenu");
var weight_menulist = document.getElementById("weight_menulist");
   

function show_weight_topmenu(){
  for(var i = 0; i < weight_topmenu.length; i++) {
    weight_topmenu[i].style.display = "block";
  }
}
function hide_weight_topmenu(){
  for(var i = 0; i < weight_topmenu.length; i++) {
    weight_topmenu[i].style.display = "none";
  }
}


function show_weight_middlemenu(){
  for(var i = 0; i < weight_middlemenu.length; i++) {
    weight_middlemenu[i].style.display = "block";
  }
}
function hide_weight_middlemenu(){ 
  for(var i = 0; i < weight_middlemenu.length; i++) {
    weight_middlemenu[i].style.display = "none";
  }
}


weight_btn.onmouseenter = function (e) {
  for(var i = 0; i < weight_topmenu.length; i++) {
    weight_topmenu[i].style.display = "block";
  }
};
weight_btn.onmouseleave = function (e) {
  for(var i = 0; i < weight_topmenu.length; i++) {
    weight_topmenu[i].style.display = "none";
  }
};



// 상위메뉴 코드

  for(var i = 0; i < weight_topmenu.length; i++) {
    weight_topmenu[i].addEventListener('mouseover', show_weight_topmenu)
    weight_topmenu[i].addEventListener('mouseout', hide_weight_topmenu)
  };

  
  for(var i = 0; i< weight_topmenu.length; i++) {
       weight_topmenu[i].onmouseenter = function (e) {
        let parent = this.parentElement;
        let middle = parent.querySelector(".weight_middlemenu");
        middle.style.display = "block";
        };  

        weight_topmenu[i].onmouseleave = function (e) {
        let parent = this.parentElement;
        let middle = parent.querySelector(".weight_middlemenu");
        middle.style.display = "none";
        };
    };

    
  for(var i = 0; i< weight_middlemenu.length; i++) {
      weight_middlemenu[i].onmouseenter = function (e) {
        let parent = this.parentElement;
        let top = weight_menulist.querySelectorAll(".weight_topmenu");
        let middle = parent.querySelector(".weight_middlemenu");
        middle.style.display = "block";
        for(let i = 0; i < top.length; i++) {
          top[i].style.display = "block";
        };
      };
       weight_middlemenu[i].onmouseleave = function (e) {
        let parent = this.parentElement;
        let top = weight_menulist.querySelectorAll(".weight_topmenu");
        let middle = parent.querySelector(".weight_middlemenu");
        middle.style.display = "none";
        for(let i = 0; i < top.length; i++) {
          top[i].style.display = "block";
        };    
      };   
    };