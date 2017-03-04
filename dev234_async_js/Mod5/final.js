function timedReject(val,time){
    var promise = new Promise(function(resolve,reject){
        setTimeout(function(){
            reject(val)
        },time);
    });
    return promise;

}

function timedResolve(val,time){
    var promise = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(val)
        },time);
    });
    return promise;

}  
var myPromise1 = timedReject(1,200)
var myPromise2 = timedResolve(2,400)
var myPromise3 = timedResolve(3,300)

var myPromise4 = Promise.all([myPromise1,myPromise2]).then(function(){
    return 4;
});

Promise.race([myPromise3,myPromise4]).then(function(val){
    console.log(val);
}).catch(function(err){
    console.log("Error: " + err)
});

// expected: 3, actual; Error: 1
// because Promise.all returns when all is resolved or first is rejected!!!
// in case: var myPromise1 = timedResolve(1,200) var myPromise2 = timedReject(2,400) this will be true!!!