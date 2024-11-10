let btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", (evt)=>{
  let txtid = document.getElementById("productId").value;
  let xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:8080/products/"+txtid);
  xhr.setRequestHeader("content-type","application/json");
  xhr.setRequestHeader("Authorization", "Basic "+btoa("user:user@123"));
  xhr.responseType = "json";
  xhr.onload = ()=>{
    console.log(xhr.response);
    if(xhr.status == 404){
      document.getElementById("notFound").style.visibility = "visible";
    }
    else{
      document.getElementById("editForm").style.visibility = "visible";
      document.getElementById("productId").value = xhr.response.productId;
      document.getElementById("productName").value = xhr.response.productName;
      document.getElementById("productCategory").value = xhr.response.productCategory;
      document.getElementById("stock").value = xhr.response.stock;
      document.getElementById("price").value = xhr.response.price;
    }
  }
  xhr.send();
})

let btnSave = document.getElementById("btnSave");

btnSave.addEventListener("click",(evt)=>{
  let id = document.getElementById("productId").value;
  let name = document.getElementById("productName").value;
  let category = document.getElementById("productCategory").value;
  let txtstock = document.getElementById("stock").value;
  let txtprice = document.getElementById("price").value;

  let product = {productName:name, productCategory:category, stock:txtstock, price:txtprice}
  product = JSON.stringify(product);

  let xhr = new XMLHttpRequest();
  xhr.open("PUT","http://localhost:8080/products/"+id);
  xhr.setRequestHeader("content-type","application/json");
  const username = "user";
  const password = "user@123";
  const basicAuth = "Basic " + btoa(username + ":" + password);
  xhr.setRequestHeader("Authorization", basicAuth);
  xhr.responseType = "json";
  xhr.onload = ()=>{
      console.log(xhr.response);
      location.reload();
  }
  xhr.send(product); 
})