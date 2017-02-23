
let refreshIntervalInMs = 100;
let interval, started = false, time = 0;

setup();

function setup() {

    let startStopBtn = document.getElementById("startStopBtn"),
        resetBtn = document.getElementById("resetBtn"),
        recordTimeBtn = document.getElementById("recordTimeBtn");

    document.addEventListener('keydown', function (event) {
        let key = event.key && event.key.toUpperCase();
        
        if (key == "S") {
            startStop();
        } else if (key == "R") {
            resetTimer();
        } else if (key == "T") {
            recordTimes();
        }
    });

    startStopBtn.addEventListener('click', function (event) {
        startStop();
    });

    resetBtn.addEventListener('click', function (event) {
        resetTimer();
    });

    recordTimeBtn.addEventListener('click', function (event) {
        recordTimes();
    });
}

function startStop() {
    if (!started) {
        startTimer();
    } else {
        stopTimer();
    }
}

function recordTimes() {
    let recordedTimesList = document.getElementById("recordedTimesList"),
        recordedTime = document.createElement("div");

    recordedTime.innerHTML = time / 10;
    recordedTimesList.appendChild(recordedTime);
}

function startTimer() {
    let stopWatchTime = document.getElementById("stopWatchTime");

    if (started == false) {
        interval = setInterval(function () {
            time++;
            stopWatchTime.innerHTML = time / 10;
        }, refreshIntervalInMs);

        started = true;
    }
}

function stopTimer() {
    started = false;
    clearInterval(interval);
}

function resetTimer() {
    stopTimer();
    time = 0;
    document.getElementById("stopWatchTime").innerHTML = "0";
    document.getElementById("recordedTimesList").innerHTML = "";
}