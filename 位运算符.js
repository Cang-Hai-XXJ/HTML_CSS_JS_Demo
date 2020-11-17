let flag = 1 
console.log(102^flag);

console.log(-10.0125 >> 0); //-10
console.log(1 / 0, -1 / 0); //Infinity
console.log(1 << 2); //2^2

var a = 1
var b = 2
// ?
// a ^= b
// b ^= a
// a ^= b
// ES6
var [b,a] = [a,b]
console.log(a,b);

console.log((!(~+[])+{})[--[~+""][+[]]*[~+[]]+~~!+[]]+({}+[])[[~!+[]]*~+[]]);

// 按位非操作的本质：操作数的负值减 1。
var num1 = 25; // 二进制 00000000000000000000000000011001 
var num2 = ~num1; // 二进制 11111111111111111111111111100110 
console.log(num2); // -26 按位非是在数值表示的最底层执行操作，因此速度更快