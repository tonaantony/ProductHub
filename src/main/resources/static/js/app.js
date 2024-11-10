let btnFetch = document.getElementById("btnFetch");

function createRow(product){
    let tr = document.createElement("tr");

    let td1 = document.createElement("td")
    td1.textContent = product.productId
    let td2 = document.createElement("td")
    td2.textContent = product.productName
    let td3 = document.createElement("td")
    td3.textContent = product.productCategory
    let td4 = document.createElement("td")
    td4.textContent = product.stock
    let td5 = document.createElement("td")
    td5.textContent = product.price
    let td6 = document.createElement("td");
    let btnDelete = document.createElement("button");
    btnDelete.setAttribute("class","btn btn-danger");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", (evt)=>{
        deleteProduct(product.productId);
    })
    td6.appendChild(btnDelete);

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)

    return tr;
}

function createRows(products){
    for(let product of products){
        let tableRow = createRow(product);
        document.getElementsByTagName("tbody")[0].appendChild(tableRow);
    }
}

btnFetch.addEventListener("click", (evt)=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8080/products");
    xhr.setRequestHeader("content-type","application/json");
    xhr.setRequestHeader("Authorization", "Basic "+btoa("user:user@123"));
    xhr.responseType = "json";
    xhr.onload = ()=>{
        let products = xhr.response;
        console.log(products);
        clearTable();
        createRows(products);
    }
    xhr.send();
})

function deleteProduct(id){
    let xhr = new XMLHttpRequest()
    xhr.open("DELETE","http://localhost:8080/products/"+id);
    xhr.setRequestHeader("contenet-type","applcation/json");
    xhr.setRequestHeader("Authorization", "Basic "+btoa("user:user@123"));
    xhr.responseType = "json"
    xhr.onload = ()=>{
        console.log(xhr.response);
        location.reload();
    }
    xhr.send();
}

function clearTable() {
    let tbody = document.getElementsByTagName("tbody")[0];
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}