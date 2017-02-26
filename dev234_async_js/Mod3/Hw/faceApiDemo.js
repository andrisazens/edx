document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
    fetch(createRequest()).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function (response) {
        console.log(response);
        document.getElementById("output").innerHTML = "";
    }).catch(function (err) {
        alert(err);
        document.getElementById("output").innerHTML = "";
    });
}

function createRequest() {
    var myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '13aa41f54e8c429d8cd6b0befebbe5b9'
    });
    var reqBody = {
        "url": document.getElementById("input").value
    };
    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    return new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender', initObject);    
}