//  Add object attribute
const user = { id: 100, name: 'Howard Moon' }
const userWithPass = { ...user, password: 'Password!' }

user //>> { id: 100, name: 'Howard Moon' }
userWithPass //>> { id: 100, name: 'Howard Moon', password: 'Password!' }

//  Exclude object attributes
const noPassword = ({ password, ...rest }) => rest
const user = {
  id: 100,
  name: 'coffe1891',
  password: 'Password!'
}
noPassword(user) //>> { id: 100, name: 'coffe1891' }

//  Dynamic Exclude object attributes
const user1 = {
  id: 100,
  name: 'coffe1891',
  password: 'Password!'
}
const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
//                     ----       ------
//                          \   /
//                dynamic destructuring

const removePassword = removeProperty('password')
const removeId = removeProperty('id')

removePassword(user1) //>> { id: 100, name: 'coffe1891' }
removeId(user1) //>> { name: 'coffe1891', password: 'Password!' }

//  move id to the first property
const user3 = {
  password: 'Password!',
  name: 'Naboo',
  id: 300
}
// const organize = object => ({ id: undefined, ...object })
const organize = object => {
  return { id: '', ...object }
}
// 为什么必须要括号: 因为 没有return 操作符 ‘{}’ 被认为是代码块的大括号 而‘,’分割了两条语句                     -------------
console.log(organize(user3));
//>> { id: 300, password: 'Password!', name: 'Naboo' }

const organize = object => {
  let { password, object } = { ...object }
  return { ...object, password }
}

// add if else 
const user = { id: 100, name: 'Howard Moon' }
const password = 'Password!'
const userWithPassword = {
  ...user,
  id: 100,
  ...(password && { password })
}
userWithPassword //>> { id: 100, name: 'Howard Moon', password: 'Password!' }