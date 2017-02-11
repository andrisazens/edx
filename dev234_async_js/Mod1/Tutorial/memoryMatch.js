//global variables go here:


//execute functions here:
setUp();


//function definitions go here:

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
            if (this.isCompleted) {
                return;
            }

            // find if theres any other match
            var grid = document.getElementsByTagName("td");
            for (var i = 0; i < grid.length; i++) {
                var cell = grid[i], otherClickedCell;
                if (cell.isClicked) {
                    otherClickedCell = cell;
                }
            };

            console.log(otherClickedCell);

            if (!otherClickedCell) { // not other cell clicked
                this.style.background = "red";
                this.innerText = this.value;
                this.clicked = true;
            } else {
                if (otherClickedCell.value == this.value) { // matches the value
                    otherClickedCell.isCompleted = true;
                    otherClickedCell.style.background = "purple";
                    this.isCompleted = true;
                    this.style.background = "purple";
                    this.innerText = this.value;
                } else {
                    otherClickedCell.isClicked = false;
                    otherClickedCell.style.background = "blue";
                }
            }
        });
    }
}


