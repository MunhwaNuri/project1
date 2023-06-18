
/* 
main화면 관련 js
현재 날씨 현황에 대한 대시보드
*/
var endpoint="https://api.openweathermap.org/data/2.5/weather";  // 현시각 지역 날씨 링크
var pollutionpoint="http://api.openweathermap.org/data/2.5/air_pollution"; // 현시각 지역 대기수준
var apiKey="0a49043ba8f80d748644f6a519298486";

var cityName=document.getElementById("city-name");
var temp=document.getElementById("temp");
var weatherIcon=document.getElementById("weather-icon");
var des=document.getElementById("des");
var feel=document.getElementById("feel");
var humi=document.getElementById("humi");
var cityname="서울";
var lat=37.5518911;
var lon=126.9917937;
var pm25=document.getElementById("pm25");    // 대기질 수치를 반환
var pm10=document.getElementById("pm10");
var o3=document.getElementById("o3");

var con25=document.getElementById("con25");  // 대기질의 좋고 나쁨을 구분
var con10=document.getElementById('con10');
var cono3=document.getElementById('cono3');

var link2=pollutionpoint+"?lat="+lat+"&lon="+lon+"&appid=0a49043ba8f80d748644f6a519298486"; //대기오염정보 api 링크

axios({                      // 대기오염 정보에 대한 api 가져오기 
  method:'get',              // 현재 날씨 api와는 다르게 좌표로만 지역정보를 가져올수 있다.
  url:link2,
}).then((response)=>{
  console.log('pollution',response);
  data=response.data.list[0].components;
  let o3Data=o3cal(data.o3);
  con10.innerHTML=airpm10(data.pm10);
  con25.innerHTML=airpm25(data.pm2_5);
  cono3.innerHTML=airo3(o3Data);
  pm25.innerHTML=data.pm2_5;
  pm10.innerHTML=data.pm10;
  o3.innerHTML=o3Data;
});

function o3cal(o3){
  console.log(o3);
  let n;
  n=(o3*0.0224)/46;
  console.log("n", n);
  n=n.toFixed(4);

  return n;
}
function airpm25(pm){
  if(pm>=0 && pm<=15){
    con25.style.color="blue";
    return('좋음');
  }
  else if(pm>=16 && pm<=35){
    con25.style.color="green";
    return('보통');
  }
  else if(pm>=36 && pm<=75){
    con25.style.color="#FFBB00";
    return('나쁨');
  }
  else{
    con25.style.color="red";
    return('매우나쁨');
  }
}

function airpm10(pm){
  if(pm>=0 && pm<=30){
    con10.style.color="blue";
    return('좋음');
  }
  else if(pm>=31 && pm<=80){
    con10.style.color="green";
    return('보통');
  }
  else if(pm>=81 && pm<=150){
    con10.style.color="#FFBB00";
    return('나쁨');
  }
  else{
    con10.style.color="red";
    return('매우나쁨');
  }
}
function airo3(o3){
  if(o3>=0 && o3<=0.030){
    cono3.style.color="blue";
    return('좋음');
  }
  else if(o3>=0.031 && o3<=0.090){
    cono3.style.color="green";
    return('보통');
  }
  else if(o3>=0.091 && o3<=0.150){
    cono3.style.color="#FFBB00";
    return('나쁨');
  }
  else{
    cono3.style.color="red";
    return('매우나쁨');
  }
}


var url = endpoint + "?lat="+lat+"&lon="+lon+"&units=metric" + "&appid=" + apiKey;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(url);
    console.log(data);
    cityName.innerHTML = cityname;
    temp.innerHTML = Math.round(data.main.temp); //소수점으로 기온을 표기하기엔 너무 시각화가 좋지않아 반올림 실시
    weatherIcon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    des.innerHTML = wDescEngToKor(data.weather[0].id);
    feel.innerHTML=Math.round(data.main.feels_like);
    humi.innerHTML=data.main.humidity;
  })
  .catch(error => console.log(error));

function wDescEngToKor(w_id) {
  var w_id_arr = [201,200,202,210,211,212,221,230,231,232,
  300,301,302,310,311,312,313,314,321,500,
  501,502,503,504,511,520,521,522,531,600,
  601,602,611,612,615,616,620,621,622,701,
  711,721,731,741,751,761,762,771,781,800,
  801,802,803,804,900,901,902,903,904,905,
  906,951,952,953,954,955,956,957,958,959,
  960,961,962];
  var w_kor_arr = ["가벼운 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
  "천둥구름","강한 천둥구름","불규칙적 천둥구름","약한 연무를 동반한 천둥구름","연무를 동반한 천둥구름",
  "강한 안개비를 동반한 천둥구름","가벼운 안개비","안개비","강한 안개비","가벼운 적은비","적은비",
  "강한 적은비","소나기와 안개비","강한 소나기와 안개비","소나기","약한 비","중간 비","강한 비",
  "매우 강한 비","극심한 비","우박","약한 소나기 비","소나기 비","강한 소나기 비","불규칙적 소나기 비",
  "가벼운 눈","눈","강한 눈","진눈깨비","소나기 진눈깨비","약한 비와 눈","비와 눈","약한 소나기 눈",
  "소나기 눈","강한 소나기 눈","박무","연기","연무","모래 먼지","안개","모래","먼지","화산재","돌풍",
  "토네이도","구름 한 점 없는 맑은 하늘","약간의 구름이 낀 하늘","드문드문 구름이 낀 하늘","구름이 거의 없는 하늘",
  "구름으로 뒤덮인 흐린 하늘","토네이도","태풍","허리케인","한랭","고온","바람부는","우박","바람이 거의 없는",
  "약한 바람","부드러운 바람","중간 세기 바람","신선한 바람","센 바람","돌풍에 가까운 센 바람","돌풍",
  "심각한 돌풍","폭풍","강한 폭풍","허리케인"];
  for(var i=0; i<w_id_arr.length; i++) {
    if(w_id_arr[i]==w_id) {
      return w_kor_arr[i];
    }
  }
  return "none";
}



function printname(){
  var x=document.getElementById("myText").value;
  cityname=x;
  axios({
    method:'get',
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+cityname+'&key=AIzaSyAiUkL3c3OHpTAxy5UpFIiDt2nQhB1AGiw',
}).then((response)=>{
  data=response.data.results[0];
  cityname=data.address_components[0].long_name;
  console.log(cityname);
  lat=data.geometry.location.lat;
  lon=data.geometry.location.lng;
  console.log('lat', typeof(lat));
  var url1 = endpoint + "?lat="+lat+"&lon="+lon+"&units=metric" + "&appid=" + apiKey;
  axios({
    method:'get',
    url:url1
  }).then((res)=>{
    console.log('res',res);
    cityName.innerHTML = cityname;
    temp.innerHTML = Math.round(res.data.main.temp);
    weatherIcon.src = "https://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";
    des.innerHTML = wDescEngToKor(res.data.weather[0].id);
    feel.innerHTML=Math.round(res.data.main.feels_like);
    humi.innerHTML=res.data.main.humidity
  })
  var link2_2= pollutionpoint+"?lat="+lat+"&lon="+lon+"&appid=0a49043ba8f80d748644f6a519298486"; 
    console.log(response);
    axios({                      // 대기오염 정보에 대한 api 가져오기 
      method:'get',              // 현재 날씨 api와는 다르게 좌표로만 지역정보를 가져올수 있다.
      url:link2_2,
    }).then((response)=>{
      console.log('pollution',response);
      data=response.data.list[0].components;
      let o3Data=o3cal(data.o3);
      con10.innerHTML=airpm10(data.pm10);
      con25.innerHTML=airpm25(data.pm2_5);
      cono3.innerHTML=airo3(o3Data);
      pm25.innerHTML=data.pm2_5;
      pm10.innerHTML=data.pm10;
      o3.innerHTML=o3Data;
    });
});
}
