
let starships = {};
document.getElementById("button").addEventListener('click', function () {
    run(compareGen).catch(function (err) {
        alert(err.message);
    });
});
load();

function load() {
    run(loadGen).catch(function (err) {
        alert(err.message);
    });
}

function* compareGen() {
    let name1 = document.getElementById("starshipSelect1").value,
        name2 = document.getElementById("starshipSelect2").value,
        starship1 = starships[name1],
        starship2 = starships[name2];

    let props = ["name", "cost_in_credits", "max_atmosphering_speed", "cargo_capacity", "passengers"];
    for (let prop of props) {
        let elem1 = document.getElementById("ship1_" + prop), elem2 = document.getElementById("ship2_" + prop);
        elem1.innerText = starship1[prop];
        elem2.innerText = starship2[prop];
        
        if (prop != "name") {
            let value1 = parseInt(starship1[prop], 10), value2 = parseInt(starship2[prop], 10);                        
            if (value1 > value2) {
                elem1.style.color = "red";
            } else if (value2 > value1) {
                elem2.style.color = "red";
            }
        }
    }
}

function* loadGen() {
    //check if input is valid
    let starshipIds = [2, 75, 74, 65, 3, 59, 58, 63, 28, 29, 39, 10],
        starships1Select = document.getElementById("starshipSelect1"),
        starships2Select = document.getElementById("starshipSelect2");

    for (let id of starshipIds) {
        // fetch the starships
        var starshipResponse = yield fetch("http://swapi.co/api/starships/" + id);
        var starship = yield starshipResponse.json();
        starships[starship.name] = starship;

        // populate the select's            
        let elem = document.createElement("option");
        elem.value = starship.name;
        elem.innerText = starship.name;
        starships1Select.appendChild(elem);

        let elem2 = document.createElement("option");
        elem2.value = starship.name;
        elem2.innerText = starship.name;
        starships2Select.appendChild(elem2);
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