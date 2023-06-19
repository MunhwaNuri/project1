// 지도 api 초기변수 설정
var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

var map = new kakao.maps.Map(container, options);
var query_params1=new URLSearchParams(location.search);
console.log('query', query_params1);


//지역에 따른 여행정보 가져오기
var link="https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
var serviceKey="TZxNCZ%2F4gzQHrtkE4iv6EWVg18PaxLxU8542IUs9I6J9xxQf8U78oqcNlU2vUiYeZW1wvVS2ynPNLNnbXICyUw%3D%3D";
var localName=query_params1.get("keyword");
var pageNo=query_params1.get("page");
console.log('query', pageNo);
if (!pageNo) {
    pageNo = 1;

}
if(!localName){
    localName='서울';
}
var addrx=new Array();
var addry=new Array();
var globaltotal=0;

var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+pageNo+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+localName+"&contentTypeId=12";
console.log(url);
axios({
    method:'get',
    url:url,
}).then((response)=>{
    console.log(link);
    console.log(response);
    console.log(response.data.response.body.items.item);
    let data=response.data.response.body.items.item;
    let totalCount=response.data.response.body.totalCount;
    console.log('total', totalCount);

    createList(data, totalCount);
    // x와 y 좌표 json을 소수점 자리수를 맞추고 형변환을 해주는 로직 (문서 기준 소수점 6자리라 반올림을 진행하였음, json은 7자리)
    for(let i=0; i<10; i++){
        addrx.push(parseFloat(data[i].mapx));  
        addry.push(parseFloat(data[i].mapy));
        addrx[i]=addrx[i].toFixed(6);
        addrx[i]=parseFloat(addrx[i]);
        addry[i]=addry[i].toFixed(6);
        addry[i]=parseFloat(addry[i]);
    }

    var moveLation=new kakao.maps.LatLng(addry[0],addrx[0]);  //카카오맵 위치 갱신
    map.setCenter(moveLation);

    //마커 생성 관련 변수들 (좌표 생성)
    var markerPosition  = new kakao.maps.LatLng(addry[0],addrx[0]);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

    //마커위에 표시할 element를 생성하는 변수
    var iwContent = '<div>'+data[0].title+'</div>';
    
    //마우스오버 이벤트 발생시 태그 생성
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent
    });
    
    //마우스 오버: 마우스를 갖다대면 마크위 이벤트 생성
    kakao.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.open(map, marker);
    });

    //마우스 아웃: 마우스를 떼면 마크위 이벤트 소멸
    kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
    });
});


//input으로 지역명을 받을시 여행지 리스트 api를 갱신하는 함수, 지도도 갱신
function printname(){
    var x=document.getElementById("myText").value;
    localName=x;
    var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+pageNo+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+localName+"&contentTypeId=12";
    axios({
        method:'get',
        url:url,
    }).then((response)=>{
        console.log(link);
        console.log(response);
        let data=response.data.response.body.items.item;
        let totalCount=response.data.response.body.totalCount;
        let total;
        if(totalCount%10==0){
            total=totalCount/10;
        }
        else{
            total=Math.ceil(totalCount/10);
        }
        addrx.splice(0,addrx.length);  //이미 생성된 좌표리스트를 초기화해준다.
        addry.splice(0,addry.length);
        updateList(data,total);
        console.log('printtotal',total);
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
        var moveLation=new kakao.maps.LatLng(addry[0],addrx[0]);  //카카오맵 위치 갱신
        map.setCenter(moveLation);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    });
}

/*query parameter의 사용으로 사라져도 되는 코드(검토 필요)*/
//다음 페이지로 넘어갔을때 api로 다음 페이지 받아오고 갱신
function pagenext(index){
    console.log('next index', index);
    var url=link+"?serviceKey="+serviceKey+"&numOfRows=10&pageNo="+index+"&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword="+keyword+"&contentTypeId=12";
    
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
        console.log('success', addrx);
        var moveLation=new kakao.maps.LatLng(addry[0],addrx[0]);  //카카오맵 위치 갱신
        map.setCenter(moveLation);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    });
}

//api의 json data를 html에 적용하기 위한 분류 작업(사이트 로드 초기)
function createList(data, totalCount){
    const pageUL=document.createElement('div');
    pageUL.className='pagination';
    const mainUL=document.createElement('ul');
    mainUL.className='ulstyle';
    let total;

    //pagination 생성 elemet
    if(totalCount%10==0){
        total=totalCount/10;
    }
    else{
        total=Math.ceil(totalCount/10);
    }
    globaltotal=total;
    console.log('first', globaltotal);
    for(let i=1; i<=total; i++){
        pageUL.value=i;
        
        const pagea=document.createElement('a');
        pagea.href='../menu/trip.html?page='+i+'&keyword='+localName;
        pagea.id=i+10;
        pagea.onclick=function(){
            console.log('keyword', pageNo.vlaue);
            pagenext(pageUL.value);
        }
        pagea.innerHTML=i;
        pageUL.appendChild(pagea);
    }
     
    //여행지 명 리스트 Element 생성
    for(let i=0; i<data.length; i++){
        const maindiv=document.createElement('div');
        maindiv.id=i;
        const mainli=document.createElement('li');
        mainli.value=i;
        mainli.className='listyle';
        const centertitle=document.createElement('span');
        centertitle.className='spanstyle1';
        centertitle.innerHTML=data[i].title;
        mainli.appendChild(centertitle);
        const atag=document.createElement('a');
        atag.href="https://map.kakao.com/link/search/"+data[i].addr1+data[i].addr2;
        atag.target='_blank';
        atag.className='atag';
        const centeraddr=document.createElement('span');
        centeraddr.className='spanstyle2';
        centeraddr.innerHTML="자세히보기";
        atag.appendChild(centeraddr);
        mainli.appendChild(atag);
        const photoZone=document.createElement('div');
        photoZone.id="mydiv"+i;
        photoZone.style.display="none";
        const centerphoto1=document.createElement('img');
        const centerphoto2=document.createElement('img');
        centerphoto1.src=data[i].firstimage;
        centerphoto1.style.width="300px";
        centerphoto1.style.height="250px";
        centerphoto2.src=data[i].firstimage2;
        centerphoto2.style.width="300px";
        centerphoto2.style.height="250px";
        photoZone.appendChild(centerphoto1);
        photoZone.appendChild(centerphoto2);
        maindiv.appendChild(mainli);
        maindiv.appendChild(photoZone);
        mainUL.appendChild(maindiv);
        mainli.onclick=function(){
            let value=mainli.value;
            displayView(data,value);
            console.log('mainli',value);
            
        };
    }
    document.getElementById("desc").appendChild(mainUL);
    document.getElementById("paginator").appendChild(pageUL);

}

//여행지 클릭시 이미지로 자세히 보기
function displayView(data, value){
   //const photo=document.getElementById("photo1");
   //photo.src=data[value].firstimage;
   var moveLation=new kakao.maps.LatLng(data[value].mapy,data[value].mapx);  //카카오맵 위치 갱신
   map.setCenter(moveLation);
   var content=document.getElementById("mydiv"+value);
   if(content.style.display=='none'){
    content.style.display='block';
   }
   else{
    content.style.display='none';
   }

   //사진이 변경될때마다 지도 위 마커 갱신
   var markerPosition  = new kakao.maps.LatLng(addry[value],addrx[value]);
   var marker = new kakao.maps.Marker({
       position: markerPosition
   });
   marker.setMap(map);

   var iwContent = '<div>'+data[value].title+'</div>';
   
   var infowindow = new kakao.maps.InfoWindow({
       content : iwContent
   });
   
   kakao.maps.event.addListener(marker, 'mouseover', function() {
         infowindow.open(map, marker);
   });

   kakao.maps.event.addListener(marker, 'mouseout', function() {
       infowindow.close();
   });
}

/*query parameter의 사용으로 사라져도 되는 코드(검토 필요)*/
//갱신된 api를 바탕으로 createElement에 적용되어있던 태그와 내용을 갱신(replaceChild)하는 함수
function updateList(data, totalCount){
    let total=totalCount;
    console.log('totalcount',totalCount);
    for(let i=1; i<=total; i++){
        const oldnode=document.getElementById(i+10);
        const parent=oldnode.parentNode;
        const newnode=document.createElement('a');
        newnode.id=i+10;
        newnode.href='../menu/trip.html?page='+i+"&keyword="+localName;
        newnode.onclick=function(){
            pagenext(parent.value);
        }
        newnode.innerHTML=i;
        console.log('newnode', newnode);
        parent.replaceChild(newnode,oldnode);
    }
    console.log('global2',globaltotal);
    if(globaltotal>total){
        for(let i=total+1; i<=globaltotal; i++){
            const oldnode=document.getElementById(i+10);
            console.log('oldnode',oldnode.parentNode);
            const parent=oldnode.parentNode;
            const newnode=document.createElement('a');
            newnode.id=i+10;
            parent.replaceChild(newnode,oldnode);
        }
        globaltotal=total;
    }
    else{
        globaltotal=total;
    }

    for(let i=0; i<data.length; i++){
        const oldnode=document.getElementById(i);
        const parent=oldnode.parentNode;
        
        const newnode=document.createElement('div');
        console.log(data.length);
        newnode.id=i;
        const mainli=document.createElement('li');
        mainli.value=i;
        mainli.className='listyle';
        
        const centertitle=document.createElement('span');
        centertitle.className='spanstyle1';
        centertitle.innerHTML=data[i].title;
        mainli.appendChild(centertitle);
        const atag=document.createElement('a');
        atag.href="https://map.kakao.com/link/search/"+data[i].addr1+data[i].addr2;
        atag.target='_blank';
        atag.className='atag';
        const centeraddr=document.createElement('span');
        centeraddr.className='spanstyle2';
        centeraddr.innerHTML="자세히보기";
        atag.appendChild(centeraddr);
        mainli.appendChild(atag);
        const photoZone=document.createElement('div');
        photoZone.id="mydiv"+i;
        photoZone.style.display="none";
        const centerphoto1=document.createElement('img');
        const centerphoto2=document.createElement('img');
        centerphoto1.src=data[i].firstimage;
        centerphoto1.style.width="300px";
        centerphoto1.style.height="250px";
        centerphoto2.src=data[i].firstimage2;
        centerphoto2.style.width="300px";
        centerphoto2.style.height="250px";
        photoZone.appendChild(centerphoto1);
        photoZone.appendChild(centerphoto2);
        newnode.appendChild(mainli);
        newnode.appendChild(photoZone);
        mainli.onclick=function(){
            let value=mainli.value;
            displayView(data,value);
        }
        parent.replaceChild(newnode,oldnode);
    }
    // 새로 들어오는 data가 10개 미만시 나머지 카드를 빈 div로 처리
    if(data.length<10){
        for(let i=data.length; i<10; i++){
            const oldnode=document.getElementById(i);
            const parent=oldnode.parentNode;
            const newnode=document.createElement('div');
            newnode.id=i;
            parent.replaceChild(newnode,oldnode);
        }
    }
}



