axios({
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
}
//운동 도시 보이기
var weight_btn = document.getElementById("weight_btn");
    weight_btn.onmouseenter = function (e) {
      document.getElementById("weight_gyeonggi").style.display ="block";
    };
    weight_btn.onmouseleave = function (e) {
      document.getElementById("weight_gyeonggi").style.display ="none";
    };

    var weight_gyeonggi = document.getElementById("weight_gyeonggi");
    weight_gyeonggi.onmouseenter = function (e) {
      document.getElementById("weight_gyeonggi").style.display = "block";
    };
    weight_gyeonggi.onmouseleave = function (e) {
      document.getElementById("weight_gyeonggi").style.display = "none";
    };


// 운동 api
        var api_url = "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=";
        var key = "fm9N7sIDGSCECbq5onFQWtwHaojujxkaM4USNuoS%2B%2B4rLfAGEGi%2FTbHj1suhhruCatLIqQFs11D%2FNdkJO6lbDg%3D%3D";
        var keyword = "&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=경기&contentTypeId=28";
        var url = api_url + key + keyword;
        fetch(url)
            .then(response => response.json())
            .then(data => data.response.body.items)
            .then(data => {
                console.log(url)
                console.log(data)
                weight_createList(data)
            })
            .catch(error => console.log(error));g

            function weight_createList(data){
              const mainUL=document.createElement('ol');
              for(let i=0; i<data.length; i++){
                const centertitle=document.createElement('li');
                  centertitle.innerHTML=data[i].addr1;
                  mainUL.appendChild(centertitle);
                  
              }
              document.getElementById("weight_Info").appendChild(mainUL);
            }
