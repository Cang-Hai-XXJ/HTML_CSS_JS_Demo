// var obj = {   
//   a: 10,
//   b: this.a + 10, //这里的this指向window(全局)，a为undefined  ==>  undefined + 10 = NaN
//   fn: function () {
//       return this.a;
//     }
// }
// console.log(obj.b);        //NaN
// console.log(
//  obj.fn(),         //10
//  obj.fn            //fn
// ); 

/*-------------题目二 ----------------*/
// var a = 20
// var fn = function() {
//   return this.a
// }
// var obj = {
//     a: 10,
//     getA: function () {
//         return this.a;
//       },
//     timer: function () {
//       setTimeout(() => {
//         return this.a
//       },0)
//     }
// }
// console.log(obj.getA());    //10
// var test = obj.getA;

// console.log(test())        //20   独立调用test
// // console.log(obj.timer())   //20  定时器里的this一定指向window
// console.log("end----------")        //20   独立调用test

/*-----------题目三-------------------*/
// var a = 5;
// function fn1(){
//     var a = 6;
//     console.log(a);        //6
//     console.log(this.a);   //5
// }  
// function fn2(fn) {
//     var a = 7;
//     fn();
// } 



// var obj = {
//     a: 8,
//     getA: fn1
// }  
// fn2(obj.getA); 
/*-----------题目四-------------------*/
//   (function (){

//   var a = 2
//   function fn( ) {
//     // 'use strict';           // 非严格模式下，a指向window，22
//      var a = 1;
//      var obj = {
//          a: 10,
//          c: this.a + 20        // 严格模式下，a指向undefined嘛，undefined.a报错
//      }
//      return obj.c;
//    }
//   console.log(this.setInterval)           // 输出报错 => Cannot read property 'a' of undefined
// })()
// ------------------题目五-------------------
// var name = "stark"
// var obj = {
//   name: "tony",
//   getName: function() {
//     var name = 'hello'
//     return function() {
//       return this.name
//     }
//   }
// }
// var fn = obj.getName()
// console.log(fn());   //stark      fn作为函数调用，它的 this在调用的时候绑定到window
//-----------------------6------------------------
function fn() {
  this.a = 'a'
  this.b = function () {
    console.log(this.a)
  }
}
fn.prototype.c = function () {
  this.a = 'c'
  console.log(this.a)
}
var f = new fn()
f.b() //a
f.c() //c