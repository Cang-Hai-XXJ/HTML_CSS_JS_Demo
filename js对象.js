
// var o = { a: 1 };
// Object.defineProperty(o, "b", { value: 2, writable: false, enumerable: false, configurable: true });
// //a和b都是数据属性，但特征值变化了
// Object.getOwnPropertyDescriptor(o, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
// Object.getOwnPropertyDescriptor(o, "b"); // {value: 2, writable: false, enumerable: false, configurable: true}
// o.b = 3;
// console.log(o.b); // 2
// Object.defineProperty(o, 'b', {
//   value: 2,
//   writable: true,
//   enumerable: false,
//   configurable: false
// })
var o = {
  get a() {
    return 1
  }
}
console.log(Object.getOwnPropertyDescriptor(o));

console.log(o.a);