// 判断IP是否属于同一子网
const MY_IP = '192.168.0.1' //const MY_IP = '192.168.124.24'
const ANOTHER_IP = '192.168.0.254' //const ANOTHER_IP = '192.168.124.25'
const SUBNET_MASK = '255.255.255.0'

function toBinary(str) {
  const arr = str.split('.')
  const arrNew = arr.map((item) => {
    let i = Number(item).toString(2)
    while (i.length < 8) {
      i = 0 + i
    }
    return i
  })
  return arrNew
}

function compare(ip, mask) {
  let ipStr = ip.join('')
  let maskStr = mask.join('')
  let comparedStr = []
  for (let i = 0; i < 32; i++) {
    comparedStr[i] = Number(ipStr[i]) & Number(maskStr[i])
  }
  // console.log(typeof comparedStr.join('')); str
  return comparedStr.join('')

}
function isSubnet(ip1, mask1, ip2, mask2) {
  let subnet1 = compare(toBinary(ip1), toBinary(mask1))
  let subnet2 = compare(toBinary(ip2), toBinary(mask2))
  return subnet1 === subnet2
}

console.log(toBinary(MY_IP));
console.log(toBinary(ANOTHER_IP));
console.log(toBinary(SUBNET_MASK));
console.log(compare(toBinary(MY_IP), toBinary(SUBNET_MASK)))
console.log(compare(toBinary(ANOTHER_IP), toBinary(SUBNET_MASK)))
console.log(isSubnet(MY_IP, SUBNET_MASK, ANOTHER_IP, SUBNET_MASK))