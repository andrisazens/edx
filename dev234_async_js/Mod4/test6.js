function* genFunc(){
    var a = yield 1; // a = 2
	console.log(a);
    var b = yield a * 2; // b = 2 * 2 = 4
	console.log(b); // why there's a 3 in output???
    var c = yield b + a; // c = 3 + 1 = 4
	console.log(c);
    return a + b + c;
}

var genObject = genFunc();

var a = genObject.next(1); // value: 1
var b = genObject.next(2); // value: 2
var c = genObject.next(3); // value: 4
var d = genObject.next(4); // 10

console.log(d.value);