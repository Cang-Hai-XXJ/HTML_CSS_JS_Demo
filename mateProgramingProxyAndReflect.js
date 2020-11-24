// let o = {
//   get a() {
//     return 1
//   }
// }
// let obj = new Proxy(o, {
//   get(target, key, receiver) {
//     console.log(`proxy get ${key}`);
//     return Reflect.get(target, key, receiver)
//   },
//   set(target, key, value, receiver){
//     console.log(`proxy set ${key} as ${value}`)
//     return Reflect.set(target, key,value, receiver)
//   }
// })
// obj.aa
// obj.aa = 2
// console.log('aa' in obj);
// console.log(Object.getPrototypeOf(obj))
// // 新创建的代理会尽可能与目标的行为一致。
// o.color = 'pink'
// console.log(obj.color);
// console.log(obj === o)

// 实现一个"自动填充对象",所有中间对象 _branch1_、_branch2_ 和 _branch3_ 都可以自动创建
// function Tree () {
//   return new Proxy({}, handler)
// }
// let handler = {
//   get(target, key, receiver) {
//     if (!(key in target)) {
//       target[key] = Tree()
//     }
//     return Reflect.get(target, key, receiver)
//   }
// }
// let tree = Tree()
// tree.branch1.branch2.twig = 'grenn'
// tree.branch1.branch3.twig = "yellow";
// console.log(tree);

// 实现只读只读视图
let onlyRead = function(){
  throw new Error('can not modify read only view')
}
let handler = {
  set: onlyRead,
  defineProperty: onlyRead,
  deleteProperty: onlyRead,
  preventExtensions: onlyRead,
  setPrototypeOf: onlyRead
}
function setReadOnlyView(target) {
  return new Proxy(target, handler)
}
let obj = setReadOnlyView({a: {}})
// obj.a = 3 // can not modify read only view
obj.a.b = 3 // { a: { b: 3 } }

// 在只读视图中包裹其它结果。
handler.get = function(target, key, receiver) {
  // 从执行默认行为开始。
  var result = Reflect.get(target, key, receiver);
  // 确保返回一个不可变对象！
  if (Object(result) === result) {
    // result 是一个对象。
    return setReadOnlyView(result);
  }
  // result 是一个原始原始类型，所以已经具备不可变的性质。
  return result;
}
obj.a.b = 3 // can not modify read only view