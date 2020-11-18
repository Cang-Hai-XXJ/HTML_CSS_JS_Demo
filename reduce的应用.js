// 1、数组转化为对象（把item的某个属性为key）
const arr = [
  {
    name: 'makai',
    displayname: '馆长',
    email: 'guanzhang@coffe1891.com',
    lastSeen: '2019-05-13T11:07:22+00:00'
  },
  {
    name: 'xiaoer',
    displayname: '小二',
    email: 'xiaoer@coffe1891.com',
    lastSeen: '2019-05-13T11:07:22+88:66'

  },
  {
    name: 'zhanggui',
    displayname: '掌柜',
    email: null,
    lastSeen: '2021-05-13T11:07:22+00:00'

  }
]
const callback = (acc, person) => {
  return { ...acc, [person.name]: person }
}
const obj = arr.reduce(callback, {})

console.log(obj);

// 2、完成对数组的两次计算，但只遍历一次
const arr1 = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
const callback1 = (curr, item) => {
  return {
    max: Math.max(curr.max, item),
    min: Math.min(curr.min, item)
  }
}
const arr1New = arr1.reduce(callback1, {
  max: Number.MIN_VALUE,
  min: Number.MAX_VALUE
})

console.log(arr1New);

//3、在一次调用动作里，同时实现mapping和filter 的功能
function notEmptyEmail(x) {
  return (x.email !== null) && (x.email !== undefined);
}
function greater(a, b) {
  return (a > b) ? a : b;
}
function notEmptyMostRecent(currentRecent, person) {
  return (notEmptyEmail(person))
    ? greater(currentRecent, person.lastSeen)
    : currentRecent;
}
let result = arr.reduce(notEmptyMostRecent, '');

console.log(result);