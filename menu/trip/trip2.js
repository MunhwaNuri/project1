var rightNow = new Date();
console.log('rightnow',rightNow);
var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
res++;
console.log(res);