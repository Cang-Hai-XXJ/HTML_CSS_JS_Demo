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
  console.log(this.name)
}
function add(x, y) {
  console.log(x + y)
}

getName.myCall(obj) // Starck
add.myCall(null, 1, 2) // 3

//apply, 第二个参数可以是伪数组
Function.prototype.myApply = function (thisArg, args) {
  function isArrayLike(o) {
    if (o && // 不是null， undefiend
      typeof o === 'object' && // o是对象
      isFinite(o.length) && // 有限数
      o.length >= 0 && // 非负值
      o.length === Math.floor(o.length) &&// 整数
      o.length < 4294967296 // 2^32
    ) { return true }
    else return false
  }

  if (thisArg === undefined || thisArg === null) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }

  let res
  const applyFunction = Symbol('apply')
  thisArg[applyFunction] = this

  if (args) {
    console.log(args);
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError("第二个参数不是数组也不是类数组")
    } else {
      args = Array.from(args) // ES6数组扩展 转化为数组
      res = thisArg[applyFunction](...args)
    }
  } else {
    res = thisArg[applyFunction]()
  }

  delete thisArg[applyFunction]
  return res
}
var obj = {
  name: "Starck"
}
function getName() {
  console.log(this.name)
}
function add(x, y) {
  console.log(x + y)
}
getName.myApply(obj) // Starck
add.myApply(null, [1, 2]) // 3

//bind 返回一个回调函数
Function.prototype.myBind = function (thisArg, ...pramas) {
  // 保存调用函数
  const thisFn = this
  // 声明返回的函数，由于是函数，可以默认调用，也可以new调用，并且要考虑到原型对象
  function functionForBind(...secendPramas) {
    const isNew = this instanceof functionForBind
    const thisObj = isNew ? this : Object(thisArg)
    return thisFn.call(thisObj, ...pramas, ...secendPramas)
  }
  // 复制原型，返回拷贝函数
  functionForBind.prototype = Object.create(thisFn.prototype)
  return functionForBind
}

var obj = {
  name: "Tony"
}
function getName(secPrams) {
  console.log(this.name)
  console.log(secPrams)
}
function add(x, y) {
  console.log(x + y)
}
let getNameFromBind = getName.myBind(obj)
// 二次传参
getNameFromBind("Starck") // Tony   // Starck
add.myBind(null, 2, 4) // 6