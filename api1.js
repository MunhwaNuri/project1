
/* 
main화면 관련 js
현재 날씨 현황에 대한 대시보드
*/
var endpoint = "https://api.openweathermap.org/data/2.5/weather";
var apiKey = "0a49043ba8f80d748644f6a519298486";

var cityName = document.getElementById("city-name");
var temp = document.getElementById("temp");
var weatherIcon = document.getElementById("weather-icon");
var des = document.getElementById("des");
var feel=document.getElementById("feel");
var humi=document.getElementById("humi");

navigator.geolocation.getCurrentPosition(function(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var url = endpoint + "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + apiKey;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(url);
      console.log(data);
      cityName.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp);
      weatherIcon.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      des.innerHTML = data.weather[0].description;
      feel.innerHTML=Math.round(data.main.feels_like);
      humi.innerHTML=data.main.humidity;
    })
    .catch(error => console.log(error));
});