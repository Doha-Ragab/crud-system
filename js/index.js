var nameInput= document.getElementById("productName");
var categoryInput= document.getElementById("productCategory");
var priceInput=document.getElementById("productPrice");
var descInput= document.getElementById("productDescription");
var tbody= document.getElementById("tbody");
var searchInput=document.getElementById("searchInput")
var alertNamevalid=document.getElementById("alertNamevalid")
var addBtn=document.getElementById("addBtn")
var updateBtn =document.getElementById("updateBtn")
var retriveBtn=document.getElementById("retriveBtn")


// var  productList=[]

if(localStorage.getItem("productData")==null)
{
    var procuctList=[];
}
else{
    var procuctList=JSON.parse(localStorage.getItem("productData"));
}


// Add Product function
function addProduct(){
if(validProductName()==true && priceInput.value!="" && categoryInput.value!="" && descInput.value!=""){
    var newprice=Number(priceInput.value)

var singleProduct={
    productName: nameInput.value,
    productCategory: categoryInput.value,
    productPrice:newprice,
    productDes: descInput.value,
}    
procuctList.push(singleProduct);

var product=JSON.stringify(procuctList) // lazm a7wlha l string 3shan LS, hn7wl array l string 3shan LC 
localStorage.setItem("productData", product)

displayProduct();
// console.log(procuctList);
clearForm();
}
else{
    alert("Please try agian")
}
}

$("#addBtn").click(function(){
   let heightdoc= $(document).height()
   $("html,body").scrollTop(heightdoc)
   console.log(heightdoc)
})



displayProduct();

// clear form function
function clearForm(){
    nameInput.value="";
    categoryInput.value="";
    priceInput.value="";
    descInput.value="";
}

// display product function
function displayProduct(){
    var str='';
    for( var i=0; i<procuctList.length;i++){
      
        str +=`  <tr>
        <td >${i}</td>
        <td>${procuctList[i].productName}</td>
        <td>${procuctList[i].productCategory}</td>
        <td>${procuctList[i].productPrice}</td>
        <td>${procuctList[i].productDes}</td>
        <td><button class="btn " id="retriveBtn" onclick="retriveProduct(${i});"><i class="fas fa-edit text-warning"></i></button></td>
        <td><button class="btn " id="del" onclick="deleteProduct(${i})" ><i class="fas fa-trash text-danger"></i></button></td>

        </tr>` 
    }
    tbody.innerHTML=str
    clearForm()
   
    
}

   
    // console.log("dijfdiji")



// delete product function
function deleteProduct(index){
    procuctList.splice(index,1)
    displayProduct()

    var product=JSON.stringify(procuctList) // lazm a7wlha l string 3shan LS
     localStorage.setItem("productData", product)

}

// upadte product function
var indexproduct;
var rom;

function retriveProduct(index){
    indexproduct =index;
    rom=index;
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

    nameInput.value=( procuctList[index].productName)
    categoryInput.value=( procuctList[index].productCategory)
    priceInput.value=( procuctList[index].productPrice)
    descInput.value=( procuctList[index].productDes)
    
    let offsetbody=$("html").offset().top;
    $("body,html").scrollTop(offsetbody)


   
   
}
let offsetBtnRetive;

$(document).on("click","#retriveBtn",function(){
    let r=$(this).offset().top
    console.log(r)
    offsetBtnRetive=r
  
})


function updateProduct(rom){
    ( procuctList[indexproduct].productName)= nameInput.value;
    ( procuctList[indexproduct].productCategory)= categoryInput.value;
    ( procuctList[indexproduct].productPrice)=priceInput.value;
    ( procuctList[indexproduct].productDes)=descInput.value;
    displayProduct()
    localStorage.setItem("productData",JSON.stringify(procuctList) )
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

    $("body,html").scrollTop(offsetBtnRetive);

        x=$("tr")[rom+1]
       x.style.backgroundColor="#dc354521"

    

}







// search product function
function searchProduct(){
    var str=""
    for(var i=0;i<procuctList.length;i++){
        if(procuctList[i].productName.includes(searchInput.value))
        {
            str +=`  <tr>
            <td >${i}</td>
            <td>${procuctList[i].productName}</td>
            <td>${procuctList[i].productCategory}</td>
            <td>${procuctList[i].productPrice}</td>
            <td>${procuctList[i].productDes}</td>
            <td><button class="btn btn-warning" id="up" onclick="updateProduct(${i});"><i class="fas fa-edit"></i></button></td>
            <td><button class="btn btn-danger"  onclick="deleteProduct(${i})" ><i class="fas fa-trash"></i></button></td>

            </tr>` 
        }
        tbody.innerHTML=str
}
}

// validation form
function validProductName(){
    var regexName=/^[A-Z][a-zA-z0-9\s]{1,30}$/;
    
    var isMatch = regexName.test(nameInput.value);
    if(isMatch == true){
        nameInput.classList.remove("is-invalid")
        nameInput.classList.add("is-valid");
        alertNamevalid.classList.add("d-none");
        return true;
    }
    else{
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid");
        alertNamevalid.classList.remove("d-none");
          return false;
    }

}
nameInput.addEventListener("keyup",validProductName);

















