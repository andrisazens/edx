//global variables go here:
var clickedArray = [];
var interval;
var started = false;
var time = 0;

//execute functions here:
setUp();


//function definitions go here:

function reveal(cell) {
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function checkIfCompleted(cell) {
    if (clickedArray[0].value == cell.value) {
        clickedArray[0].style.background = "purple";
        cell.style.background = "purple";
        console.log(cell);
    } else {
        setTimeout(function () {
            hideCell(clickedArray[0]);
            hideCell(cell);
            clickedArray = [];
        }, 500);
    }
}

function hideCell(cell) {
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function startTimer() {
    if (started == false) {
        document.getElementById("timer").innerHTML = "Time Elapsed: " + time;

        interval = setInterval(function () {
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
        }, 1000);
        started = true;
    }
}

function randomAnswers() {
    var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    answers.sort(function (item) {
        return .5 - Math.random();
    })
    return answers;
}

function setUp() {
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener("mouseenter", function () {
            if (this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        cell.addEventListener("mouseleave", function () {
            if (this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener("click", function () {
            startTimer();

            if (this.completed == false && this.clicked == false) {
                if (clickedArray.length > 0) {
                    checkIfCompleted(this);
                } else {
                    clickedArray.push(this);
                    reveal(this);
                }                
            }
        });
    }
}


