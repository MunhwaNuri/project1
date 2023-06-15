function menow(){
    var rightNow = new Date();
    console.log('rightnow',rightNow);
    var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    res++;
    console.log(res);
}
axios({
    method:'get',
    url:'https://maps.googleapis.com/maps/api/geocode/json?address=서울&key=AIzaSyAiUkL3c3OHpTAxy5UpFIiDt2nQhB1AGiw',
}).then((response)=>{
    console.log(response);
})
