
document.getElementById("typeInputButton").addEventListener('click', function () {
    searchByType(document.getElementById('typeInput').value);
});

document.getElementById("priceInputButton").addEventListener('click', function () {
    searchByPrice(document.getElementById('priceInput').value);
});

document.getElementById("inputButton").addEventListener('click', function () {
    searchById(document.getElementById('input').value);
});

api.searchAllProducts().then(function (value) {
    updateTable('allTable', value);
});

function searchByType(type) {
    api.searchProductsByType(type).then(function (products) {
        updateTable('similarTable', products);
    }).catch(function (ex) {
        alert(ex);
    });
}

function searchByPrice(price) {
    api.searchProductsByPrice(price, 50).then(function (products) {
        updateTable('similarTable', products);
    }).catch(function (ex) {
        alert(ex);
    });
}

function searchById(searchId) {
    api.searchProductById(searchId).then(function (product) {
        return Promise.all([api.searchProductsByPrice(product.price, 50), api.searchProductsByType(product.type), product]);
    }).then(function (res) {
        var similarArray = getIntersection(res[0], res[1], res[2].id);
        updateExaminedText(res[2]);
        updateTable('similarTable', similarArray);
    }).catch(function (ex) {
        alert(ex);
    });
}

function getIntersection(samePriceArray, sameTypeArray, searchedForId) {
    let similarArray = [];

    for (let priceItem of samePriceArray) {
        for (let typeItem of sameTypeArray) {
            if (priceItem.id == typeItem.id && priceItem.id != searchedForId) {
                similarArray.push(priceItem);
            }
        }
    }

    return similarArray;
}

function updateExaminedText(product) {
    let productString = "Product Id: " + product.id + "<br>Price: " + product.price + "<br>Type: " + product.type;
    document.getElementById("productText").innerHTML = productString;
}

function createTableHeader(tableId) {
    var tableHeaderRow = document.createElement('TR');
    var th1 = document.createElement('TH');
    var th2 = document.createElement('TH');
    var th3 = document.createElement('TH');
    var th4 = document.createElement('TH');
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
    var tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (i = 0; i < productArray.length; i++) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('button');

        td4.addEventListener('click', function () {
            searchById(this.parentNode.firstChild.innerHTML);
        });
        td1.appendChild(document.createTextNode(productArray[i].id));
        td2.appendChild(document.createTextNode(productArray[i].type));
        td3.appendChild(document.createTextNode(productArray[i].price));
        td4.appendChild(document.createTextNode("Examine"));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}