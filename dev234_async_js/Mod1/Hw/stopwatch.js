
var refreshIntervalInMs = 100;
var interval, started = false, time = 0;

setup();

function setup() {

    let startStopBtn = document.getElementById("startStopBtn"),
        resetBtn = document.getElementById("resetBtn"),
        recordTimeBtn = document.getElementById("recordTimeBtn");

    document.addEventListener('keydown', function (event) {
    });

    startStopBtn.addEventListener('click', function (event) {
        if (!started) {
            startTimer();
        } else {
            stopTimer();
        }
    });

    resetBtn.addEventListener('click', function (event) {
        resetTimer();
    });

    recordTimeBtn.addEventListener('click', function (event) {
        
    });
}

function startTimer() {
    var stopWatchTime = document.getElementById("stopWatchTime");

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
}