//global variables go here:
var clickedArray = [];
var matchingPairCount = 0;
var interval;
var started = false;
var time = 0;

//execute functions here:
setUp();

var restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", function () {
    location.reload();
});

//function definitions go here:

function reveal(cell) {
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function complete(cell) {
    cell.style.backgroundColor = "purple";
    cell.completed = true;
}

function checkIfCompleted(cell) {
    reveal(cell);

    if (clickedArray[0].value == cell.value) {
        complete(clickedArray[0]);
        complete(cell);
        clickedArray = [];

        matchingPairCount++;
        if (matchingPairCount >= 4) {
            endGame();
        }
    } else {
        let table = document.getElementById("gridTable");
        console.log(table);
        table.style.borderColor = "red";

        setTimeout(function () {
            hideCell(clickedArray[0]);
            hideCell(cell);
            clickedArray = [];

            table.style.borderColor = "black";
        }, 500);
    }
}

function endGame() {
    alert("You won in " + time + " seconds")
    restartGame();
}

function restartGame() {
    started = false;
    time = 0;
    clearInterval(interval);
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

    document.addEventListener('keydown', function (event) {
        if (event.key > 0 && event.key < 10) {
            grid[event.key - 1].click();
        }
    });

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


