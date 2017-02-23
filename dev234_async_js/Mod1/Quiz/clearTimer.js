// actual you can clear interval with clearTimeout as it looks (at least for now...)

var count = 0;

function logCount(){
    count++;
    console.log(count);
    if(count > 5)
       clearTimeout(timer);

}

var timer = setInterval(logCount,1000);