// call 实现
// "use strict"
Function.prototype.myCall = function (thisArg, ...arg) {
  // 判断是否为严格模式
  // const isStrict =
  //   (function () {
  //     return !this
  //   })()
  // 如果传入的thisArg为null、undefined。在非严格模式下默认指向window
  if (thisArg === null || thisArg === undefined) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }
  // 创建一个唯一的临时变量
  const callMethod = Symbol('anything')
  // 将要借用的方法赋值给thisArg对象，thisArg调用方法时隐式绑定this到thisArg对象，至此借用函数的功能实现
  thisArg[callMethod] = this
  // 保存调用结果、删除临时变量
  let result = thisArg[callMethod](...arg)
  delete thisArg[callMethod]
  return result
}

var obj = {
  name: "Starck"
}

function getName() {
  return console.log(this.name)
}
function add(x, y) {
  console.log(x + y)
}

getName.myCall(obj) // Starck
add.myCall(null, 1, 2) // 3