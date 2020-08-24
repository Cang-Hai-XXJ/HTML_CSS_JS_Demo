
从JS中的数据类型说起
  基本数据类型：Number String Boolean Null Undefined
                在栈内存中存在，值不可更变
                赋值：值赋值，两个变量互不影响
                比较：值比较
  引用数据类型：对象，数组
                变量名以及变量保存的指针在栈中，而对象本身在堆内存中，对象可以更改
                赋值：指针地址赋值，指向同一对象的变量相互影响
                比较：对象比较
  
拷贝：复制一份一模一样的数据。并且克隆与本体是相互独立，互不影响
浅拷贝：
  （只对引用数据类型来说，基本数据类型不涉及）
  在拷贝对象的时候，只能拷贝一层数据，嵌套的引用数据类型（对象）拷贝的是指针，存在同一引用问题
  常见方法：Object.assign()，...运算符，
  对于数组：Array.prototype.concat()，Array.prototype.slice()
深拷贝：
  可以拷贝层层嵌套的引用数据
  常见方法：JSON.parse(JSON.stringify())
            缺陷：不能序列化 undefined，函数，Symbol （直接忽略），
            循环引用（Uncaught TypeError: Converting circular structure to JSON），
            不能正确识别 New Date（）和正则  （涉及JSON实现机制）

            lodash.cloneDeep() //待了解，以后用到补充

  自己实现一个：
    利用浅拷贝和递归实现：

      // 处理typeof null 的BUG
      let isObject = data => {
        typeof data === 'Object' && data !== null
      }
      let Myclone = source => {
        // 参数校验 不是对象，返回原始值
        if (!isObject(source)) return source
        // 对数组的兼容处理
        let result = Array.isArray() ? [] : {}
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            result[key] = isObject(source[key]) ? Myclone(source[key]) : source[key]
          }
        }
        return result
      }

    这个深拷贝还有很多问题：怎么解决递归过深？怎么拷贝Symbol？循环引用怎么解决？（hash）


    TD转职脚本（待优化）
    var button = document.getElementsByClassName("btn-ok sp db")[0]
    let timer = setInterval(() => {
        if (new Date().getMinutes() === 0)
        button.click();
      },1000)
      

    let fangdou = (fn) => {
      if (timer) return
      let timer = setInterval(fn,1000)
    }