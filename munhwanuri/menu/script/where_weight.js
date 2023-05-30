axios({
    method:'get',
    url:'http://api.kcisa.kr/openapi/service/rest/convergence2019/getConver09?serviceKey=41d6be0d-85f2-4ffb-9d3b-347af3dcb546&where=부천시 소사구'
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
