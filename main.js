// getting the elements
let title = document.getElementById('title') ;
let price = document.getElementById('price') ;
let taxes = document.getElementById('taxes') ;
let ads = document.getElementById('ads') ;
let discount = document.getElementById('discount') ;
let total = document.getElementById('total') ;
let count = document.getElementById('count') ;
let category = document.getElementById('category') ;
let submit = document.getElementById('submit') ;
let mood = "create" ;
let tmp ;

function getTotal(){
    if(price != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result ;
    }
};
let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product )
}else{
    dataPro=[] ;
}
submit.onclick = function (){
    let newPro = {
        title:title.value,
        ads:ads.value,
        discount:discount.value,
        taxes:taxes.value,
        price:price.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value,


    }
    
      
        if(mood==="create" ){
            if (newPro.count > 1){
                for (let i = 0 ; i < newPro.count;i++ ){
                    dataPro.push(newPro)
                }
            }else {
                dataPro.push(newPro) 
            }
        }else {
            dataPro[tmp] = newPro ;
            mood = "create" ;
            submit.innerHTML="Create" ;
            count.style.display = "block";
        }

     

    localStorage.setItem('product' , JSON.stringify(dataPro))
  
    showData()
    clearData()
}
function clearData() {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    count.value='';
    category.value='';
    discount.value='';
    total.innerHTML='';
}
function showData (){
    let table ='';
    for (i =0; i < dataPro.length ;i++){
        table += `
    <tr>
        <td> ${i+1}</td>
        <td> ${dataPro[i].title} </td>
        <td> ${dataPro[i].price} </td>
        <td> ${dataPro[i].taxes} </td>
        <td> ${dataPro[i].ads} </td>
        <td> ${dataPro[i].discount} </td>
        <td> ${dataPro[i].total} </td>
        <td> ${dataPro[i].category} </td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById ('deleteAll') ;
    if (dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        `
    }else {
        btnDelete.innerHTML='';
    }

    
}
showData ()
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
function updateData(i){
    title.value=dataPro[i].title ;
    price.value=dataPro[i].price ;
    taxes.value=dataPro[i].taxes ;    
    ads.value=dataPro[i].ads ;
    discount.value=dataPro[i].discount ;
    category.value=dataPro[i].category ;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'update'
    mood ="Update"
    tmp = i ;
    scroll({
        top : 0 ,
        behavior: "smooth",
    })
};
let searchMood = 'title';
function getsearchmood(id) {
    let search = document.getElementById('search');
    if(id == "searchTitle"){
         searchMood = 'title';
         search.placeholder = 'search by title';
    }else{
         searchMood = 'category';
         search.placeholder = 'search by category';
    }
    search.focus()
    search.value = '';
    showData()
}
function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0 ; i< dataPro.length ; i++ ){
            if (dataPro[i].title.includes(value)){
                table += `
                <tr>
                    <td> ${i}</td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               </tr>
                    `

            }
        }



    }else{
        for(let i = 0 ; i< dataPro.length ; i++ ){
            if (dataPro[i].category.includes(value)){
                table += `
                <tr>
                    <td> ${i}</td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               </tr>
                    `

            }
        }

    }
    document.getElementById('tbody').innerHTML=table;

}