document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
    let outputElem = document.getElementById("output");

    fetch(createRequest()).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function (response) {
        console.log(response);

        let attrResult = "";
        if (response && response[0]) {
            let faceAttributes = response[0] && response[0].faceAttributes;
            attrResult = "Age: " + (faceAttributes.age || 0) + "</br>Gender: " + (faceAttributes.gender || 0);
        } else {
            attrResult = "No Faces Detected";
        }
        document.getElementById("attributesOutput").innerHTML = attrResult;        

        let img = document.createElement('IMG');
        img.src = document.getElementById("input").value;        
        if (outputElem.hasChildNodes()) {
            outputElem.removeChild(outputElem.firstChild);
        }
        outputElem.appendChild(img);
    }).catch(function (err) {
        alert(err);
        outputElem.innerHTML = "";
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