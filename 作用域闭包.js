//JavaScript 基于词法作用域查找变量，执行到foo()时，foo 在全局定义的，所以输出2
function foo() {
  console.log(a); // 2
}
function bar() {
  var a = 3;
  foo();
}
var a = 2;
bar();

//JavaScript 执行到foo()时，foo 在bar()函数的作用域定义的，所以输出3
function bar() {
  var a = 3;
  foo();
  function foo() {
    console.log(a); // 3
  }
}
var a = 2;
bar();