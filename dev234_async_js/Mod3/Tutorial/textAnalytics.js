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
        document.getElementById("output").innerHTML = "Total Key Phrases: " + response.documents[0].keyPhrases.length + "</br>" + response.documents[0].keyPhrases;
    }).catch(function (err) {
        alert(err);
        document.getElementById("output").innerHTML = "";
    });
}

function createRequest() {
    var myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '53174b3196c34e9c829a13098d5978ca'
    });
    var reqBody = {
        "documents": [
            {
                "language": "en",
                "id": 1,
                "text": document.getElementById("input").value
            }
        ]
    };
    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    return new Request('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);
}