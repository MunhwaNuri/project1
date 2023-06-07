var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

var map = new kakao.maps.Map(container, options);

//지역에 따른 여행정보 가져오기
var link="https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
var serviceKey="nfGyrhix1PGJ1x6F%2BZ2%2Frqm0BLUzXIXxcN1sCy2dmW0SfkEgRbq3y1yqJYChKcvhuC6Yi9yDLlZuXzrbc8OkqA%3D%3D";
var pageNo="2";
var keyword="서울";
var addrx=new Array();
var addry=new Array();

var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+pageNo+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+keyword+"&contentTypeId=12";
console.log(url);
axios({
    method:'get',
    url:url,
}).then((response)=>{
    console.log(link);
    console.log(response.data.response.body.items.item);
    let data=response.data.response.body.items.item;

    createList(data);
    // x와 y 좌표 json을 소수점 자리수를 맞추고 형변환을 해주는 로직
    for(let i=0; i<10; i++){
        addrx.push(parseFloat(data[i].mapx));  
        addry.push(parseFloat(data[i].mapy));
        addrx[i]=addrx[i].toFixed(6);
        addrx[i]=parseFloat(addrx[i]);
        addry[i]=addry[i].toFixed(6);
        addry[i]=parseFloat(addry[i]);
    }

    var moveLation=new kakao.maps.LatLng(addry[1],addrx[1]);  //카카오맵 위치 갱신
    map.setCenter(moveLation);
});

//api의 json data를 html에 적용하기 위한 분류 작업
function createList(data){
    const mainUL=document.createElement('ul');
    mainUL.className='ulstyle'; 
    for(let i=0; i<data.length; i++){
        const mainli=document.createElement('li');
        mainli.className='listyle';
        const centertitle=document.createElement('span');
        centertitle.className='spanstyle1';
        centertitle.innerHTML=data[i].title;
        mainli.appendChild(centertitle);

        const centeraddr=document.createElement('span');
        centeraddr.className='spanstyle2';
        centeraddr.innerHTML=data[i].addr1;
        mainli.appendChild(centeraddr);
        mainUL.appendChild(mainli);
    }
    document.getElementById("desc").appendChild(mainUL);
}