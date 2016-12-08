

//Declaring the variables
var data;
var duplicateData;
var dataName="";
var dataPrice="";
var department="";
var categoriesData ="";
var cateData ="";

 var html;
//add the button for getting the table
document.getElementById("table").addEventListener("click",getTable);

function getTable () {
  var prodRequest = new XMLHttpRequest();
  prodRequest.addEventListener("load",addProducts);
  prodRequest.open ("GET", "https://products-f8f1b.firebaseio.com/.json");
  prodRequest.send();
}
//function to get the table
function addProducts (e) {
  data = JSON.parse(e.target.responseText);

  console.log("products",data);
  for (var i=0; i < data.products.length;i++) {

    if (data.products[i].category_id===1 ){
    department = "Apparel";
  } else if (data.products[i].category_id === 2){
    department = "Furniture";
  } else {
    department = "Household";
  }

  dataName += `<div>Product :${data.products[i].name}<p>Price : ${data.products[i].price}</p><p>Department : ${department}</p></div>`;

  }

  document.getElementById("list").innerHTML = dataName;


}



//add button for seasonal discount
document.getElementById("seasonDiscount").addEventListener("click", getSeason)
function getSeason () {
  var cateRequest = new XMLHttpRequest();
  cateRequest.addEventListener("load",getCategories);
  cateRequest.open ("GET", "https://categories-ddd00.firebaseio.com/.json");
  cateRequest.send();
}

function getCategories (e) {
  cateData =JSON.parse(e.target.responseText);
  categoriesData = `<option value="Select the season">Select the season</option> `

  for (var i = 0; i<cateData.categories.length; i++) {

    categoriesData+=`<option value="${cateData.categories[i].season_discount}">${cateData.categories[i].season_discount}</option>`;


  }
    document.getElementById("seasonal-dis").innerHTML =  categoriesData;
    document.getElementById("list").innerHTML = dataName;

    html = document.getElementById("seasonal-dis");

   html.addEventListener("change", dis_price);
}
//discount price

function dis_price () {

var disData = "";

var duplicateData = JSON.parse(JSON.stringify(data));

            if (html[html.selectedIndex].value === "Winter") {

                for (var i=0; i < data.products.length; i++) {

                    duplicateData.products[i].price = (duplicateData.products[i].price - (duplicateData.products[i].price * .10)).toFixed(2);
                    disData += `<div>${duplicateData.products[i].name}<p>${duplicateData.products[i].price}</p></div>`
               }

               } else if(html[html.selectedIndex].value === "Autumn") {
                for (var i=0; i < duplicateData.products.length; i++) {

                    duplicateData.products[i].price =  (duplicateData.products[i].price - (duplicateData.products[i].price * .25)).toFixed(2);
                    disData += `<div>${duplicateData.products[i].name}<p>${duplicateData.products[i].price}</p></div>`
               }

               } else if(html[html.selectedIndex].value === "Spring") {
                  for (var i=0; i < duplicateData.products.length; i++) {

                    duplicateData.products[i].price = (duplicateData.products[i].price - (duplicateData.products[i].price * .15)).toFixed(2);
                    disData += `<div>${duplicateData.products[i].name}<p>${duplicateData.products[i].price}</p></div>`
                 }

               }

               document.getElementById("list").innerHTML = disData;

      }
