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


//input으로 지역명을 받을시 여행지 리스트 api를 갱신하는 함수, 지도도 갱신
function printname(){
    var x=document.getElementById("myText").value;
    cityname=x;
    var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+pageNo+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+cityname+"&contentTypeId=12";
    axios({
        method:'get',
        url:url,
    }).then((response)=>{
        console.log(link);
        console.log(response.data.response.body.items.item);
        let data=response.data.response.body.items.item;
    
        addrx.splice(0,addrx.length);  //이미 생성된 좌표리스트를 초기화해준다.
        addry.splice(0,addry.length);
        updateList(data);
        // x와 y 좌표 json을 소수점 자리수를 맞추고 형변환을 해주는 로직
        for(let i=0; i<10; i++){
            addrx.push(parseFloat(data[i].mapx));  
            addry.push(parseFloat(data[i].mapy));
            addrx[i]=addrx[i].toFixed(6);
            addrx[i]=parseFloat(addrx[i]);
            addry[i]=addry[i].toFixed(6);
            addry[i]=parseFloat(addry[i]);
        }
        console.log('addrx', addrx);
        var moveLation=new kakao.maps.LatLng(addry[1],addrx[1]);  //카카오맵 위치 갱신
        map.setCenter(moveLation);
    });
  }

//api의 json data를 html에 적용하기 위한 분류 작업
function createList(data){
    const mainUL=document.createElement('ul');
    mainUL.className='ulstyle';
     
    for(let i=0; i<data.length; i++){
        const mainli=document.createElement('li');
        mainli.value=i;
        mainli.className='listyle';
        mainli.id=i;
        const centertitle=document.createElement('span');
        centertitle.className='spanstyle1';
        centertitle.innerHTML=data[i].title;
        mainli.appendChild(centertitle);
        
        const centeraddr=document.createElement('span');
        centeraddr.className='spanstyle2';
        centeraddr.innerHTML=data[i].addr1;
        mainli.appendChild(centeraddr);
    
        mainUL.appendChild(mainli);
    
        mainli.onclick=function(){
            let value=mainli.value;
            displayView(data,value);
            console.log('mainli',value);
        };
    }
    document.getElementById("desc").appendChild(mainUL);
}

//여행지 클릭시 이미지로 자세히 보기
function displayView(data, value){
   const photo=document.getElementById("photo1");
   photo.src=data[value].firstimage;
  
}

//갱신된 api를 바탕으로 createElement에 적용되어있던 태그와 내용을 갱신(replaceChild)하는 함수
function updateList(data){
    for(let i=0; i<data.length; i++){
        const oldnode=document.getElementById(i);
        const parent=oldnode.parentNode;
        const newnode=document.createElement('li');
        newnode.id=i;
        newnode.value=i;
        newnode.className='listyle';
        const centertitle=document.createElement('span');
        centertitle.className='spanstyle1';
        centertitle.innerHTML=data[i].title;
        newnode.appendChild(centertitle);
        
        const centeraddr=document.createElement('span');
        centeraddr.className='spanstyle2';
        centeraddr.innerHTML=data[i].addr1;
        newnode.appendChild(centeraddr);
        newnode.onclick=function(){
            let value=newnode.value;
            displayView(data,value);
        }
        parent.replaceChild(newnode,oldnode);
    }
    
}

