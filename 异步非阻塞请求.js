//用来执行远程JS代码的函数，名字需要与服务器端约定一致
function jsonpProcess(data) {
  console.log(data)
}

function jsonp_Script() {
  var _script = document.createElement("script");
  _script.type = "text/javascript";
  //服务器端API地址，注意callback传的值，该值要和第2行的函数名字一致
  _script.src = "http://www.xxx.com/api.php?callback=jsonpProcess";
  document.head.appendChild(_script)
}

jsonp_Script();

//AJAX
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onload = function () {
  console.log(xhr.response);
};
xhr.onerror = function () {
  console.log("Oops, error");
};

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.txt", true);
xhr.send(null);

// Fetch+Promise ES6的Promise本身并不是异步的，它只是实现了对异步回调的统一封装。
new Promise( resolve =>{
  // 下面这行代码是立即、同步执行的代码！！Promise本身并不是异步的！！
  console.log(1);
  // 在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
  setTimeout(()=>{
    resolve(2)
  }, 200)
}).then(data => { // then(..)异步回调的统一封装
  console.log(data);
})
// Fetch会返回一个Promise对象。Fetch的基本用法(ES6 语法)如下：
fetch(url,option).then((response) => {
  // 做点什么事
});

// Generator & async/await
var fs = require('fs')
function readFile(fileName) {
  return new Promise((resolve, reject)=>{
    fs.readFile(fileName, (error, data)=>{
      if (error) reject(error)
      resolve(resolve(data))
    })
  })
}
function* generator() {
  var f1 = yield readFile('./HTML_CSS_JS_Demo/居中.html')
  var f2 = yield console.log(2);
  console.log(f1.toString());
  console.log(f2.toString());
}
var read = generator()
// read.next()
// read.next()

async function asyncReadFile() {
  console.log('await start----------');
  var f1 = await readFile('./HTML_CSS_JS_Demo/居中.html')
  var f2 = await readFile('./HTML_CSS_JS_Demo/位运算符.js')
  console.log('await end------------');
  console.log(f1.toString());
  console.log(f2.toString());
}
asyncReadFile()