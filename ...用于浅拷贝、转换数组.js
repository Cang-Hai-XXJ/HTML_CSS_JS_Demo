// 伪数组转化为数组可以不用Array.from()
function foo(params) {
  const argArray = [...arguments]
  console.log(arguments);
  console.log(Array.isArray(argArray));
  console.log(argArray);
}
// 引用类型的浅拷贝
const arr = [1,2,3]
const copyArr = [0, ...arr]

const obj = {a: 1, b: 2, c: 3}
const copyObj = {...obj, d: 4}

// arrayLike
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
// const arrAble = {...arrLike} // { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }
// const arrAble = [...arrLike] // TypeError: arrLike is not iterable  
// 补充: Iterator  是作为统一集合的遍历接口, 二是 ES6 创造了一种新的遍历命令for...of循环,原生部署了Iterator的数据类型如下:
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象
// const arrAble = Array.prototype.slice.call(arrLike)
const arrAble = Array.from(arrLike);

foo('param1','param2')
console.log(copyObj);
console.log(copyArr);
console.log(arrAble);

// 解构用于遍历Map的key,value
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}