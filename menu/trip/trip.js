var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

var map = new kakao.maps.Map(container, options);

var link="https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
var serviceKey="nfGyrhix1PGJ1x6F%2BZ2%2Frqm0BLUzXIXxcN1sCy2dmW0SfkEgRbq3y1yqJYChKcvhuC6Yi9yDLlZuXzrbc8OkqA%3D%3D";
var pageNo="2";
var keyword="서울";
var addr=new Array();

var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+pageNo+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+keyword+"&contentTypeId=12";
console.log(url);
axios({
    method:'get',
    url:url,
}).then((response)=>{
    console.log(link);
    console.log(response.data.response.body.items.item);
    let data=response.data.response.body.items.item;
    for(let i=0; i<10; i++){
        addr.push(data[i].addr1);
    }
    console.log(addr);
});