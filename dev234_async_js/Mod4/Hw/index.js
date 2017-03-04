

document.getElementById("button").addEventListener('click', function () {
    // run(gen).catch(function (err) {
    //     alert(err.message);
    // });
});
load();

function load() {
    run(gen).catch(function (err) {
        alert(err.message);
    });
}

function* gen() {
    //check if input is valid

    // fetch the starships
    var starshipsResponse = yield fetch("http://swapi.co/api/starships");
    var starships = yield starshipsResponse.json();
    console.log(starships);

    // populate the select's    
    let starships1Select = document.getElementById("starshipSelect1"), starships2Select = document.getElementById("starshipSelect2");
    for (let starship of starships) {
        let elem = document.createElement("option");
        elem.value = starship.name;
        elem.innerText = starship.name;
        starships1Select.appendChild(elem);
        starships2Select.appendChild(elem);
    }
}

function run(genFunc) {
    const genObject = genFunc(); //creating a generator object

    function iterate(iteration) { //recursive function to iterate through promises
        if (iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}