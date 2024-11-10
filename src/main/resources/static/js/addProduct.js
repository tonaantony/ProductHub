let btnAdd = document.getElementById("btnAdd");

btnAdd.addEventListener("click",(evt)=>{
    let name = document.getElementById("productName").value;
    let category = document.getElementById("productCategory").value;
    let txtstock = document.getElementById("stock").value;
    let txtprice = document.getElementById("price").value;

    let product = {productName:name, productCategory:category, stock:txtstock, price:txtprice}
    product = JSON.stringify(product);

    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/products");
    xhr.setRequestHeader("content-type","application/json");
    xhr.setRequestHeader("Authorization", "Basic "+btoa("user:user@123"));
    xhr.responseType = "json";
    xhr.onload = ()=>{
        console.log(xhr.response);
        location.reload();
    }
    xhr.send(product);
})