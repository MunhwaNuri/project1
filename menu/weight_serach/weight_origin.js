/*axios({
    method:'get',
    url:'http://api.kcisa.kr/openapi/service/rest/convergence2019/getConver09?serviceKey=41d6be0d-85f2-4ffb-9d3b-347af3dcb546&where=경기도'
}).then((response)=>{
    console.log(response.data.response.body.items.item);
    let data=response.data.response.body.items.item;
    createList(data);
});


function createList(data){
    const mainUL=document.createElement('ol');
    for(let i=0; i<data.length; i++){
        const centertitle=document.createElement('li');
        centertitle.innerHTML=data[i].title;
        mainUL.appendChild(centertitle);

        const centermedium=document.createElement('ul');
        const centermedium2=document.createElement('li');
        centermedium2.innerHTML=data[i].medium;
        centermedium.appendChild(centermedium2);
        centertitle.appendChild(centermedium);
    }
    document.getElementById("desc").appendChild(mainUL);
}*/
//운동 도시 보이기


var query = new URLSearchParams(location.search);
var loc = query.get("location");
if (!loc) {
  location.href="/menu/weight_serach/weight_value_fail.html";
  location.replace(link);
}

// 운동 api
  var weight_middlemenu = document.getElementsByClassName("weight_middlemenu"); 
  var api_url = "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=";
  var key = "fm9N7sIDGSCECbq5onFQWtwHaojujxkaM4USNuoS%2B%2B4rLfAGEGi%2FTbHj1suhhruCatLIqQFs11D%2FNdkJO6lbDg%3D%3D";
  keyword = "&numOfRows=15&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+loc+"&contentTypeId=28";
  var url = api_url + key + keyword;
  fetch(url)
      .then(response => response.json())
      .then(data => data.response.body)
      .then(data => {
          console.log(url)
          console.log(data)

          weight_createList(data)
          KaKaomap(data.items.item[0].addr1)
          weight_img(data.items)
          change_selected()

          })
      .catch(error => console.log(error));

      function change_selected() {
        document.querySelector("option[value='"+loc+"']").setAttribute("selected", true);
      }

      function weight_img(data){
        var Img = document.createElement('img');
        Img.setAttribute("src", data.item[0].firstimage);
        Img.setAttribute("alt", "이미지가 없습니다");
        Img.setAttribute("id", "weight_img");
        Img.setAttribute("style", "width:40%; height:100%");
        document.getElementById("top_desc").appendChild(Img);
      }

      function change_img(item){
        item = JSON.parse(item);
        var Img = document.getElementById("weight_img");
        Img.setAttribute("src", item.firstimage);
        KaKaomap(item.addr1);
      }

      function weight_createList(data){
        //예외 처리
        console.log(data.totalCount);
        if(data.totalCount == 0){
          location.href="/menu/weight_serach/weight_location_fail.html";
          location.replace(link);
        };

        const mainUL=document.createElement('ol');
        for(let i=0; i<data.items.item.length; i++){
          
          var centerlist=document.createElement('li');
          var title=document.createElement('a');
          var addr=document.createElement('a');
          var br = document.createElement('br');
          
          
          title.innerHTML=data.items.item[i].title;
          addr.innerHTML=data.items.item[i].addr1;


          centerlist.setAttribute("style", "margin:10px;");
          title.setAttribute("class", "weight_title");
          title.setAttribute("onclick", "change_img('"+ JSON.stringify(data.items.item[i]) +"')");
          title.setAttribute("style", "cursor: pointer;");

          addr.setAttribute("class", "weight_addr");
          addr.setAttribute("style", "font-size:15px; cursor: pointer; .");
          addr.setAttribute("onclick", "window.open('https://map.naver.com/v5/search/"+data.items.item[i].addr1+"?c=15,0,0,0,dh')");
          addr.setAttribute("target", "_blank");
          
          mainUL.setAttribute("style", "font-size:25px");
          

        
          centerlist.appendChild(title);
          centerlist.appendChild(br);
          centerlist.appendChild(addr);
          mainUL.appendChild(centerlist);

          
          }
        document.getElementById("weight_Info").appendChild(mainUL);
      }
      
      
      // 카카오맵api
  function KaKaomap(map_data) {kakao.maps.load(function() {
  var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(34.450701, 126.570667),
          level: 3,
          };

  var map = new kakao.maps.Map(container, options);
  var geocoder = new kakao.maps.services.Geocoder();
  
    geocoder.addressSearch(map_data, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
          map: map,
          position: coords
                });
         }
         map.setCenter(coords);
        });
  });
}



