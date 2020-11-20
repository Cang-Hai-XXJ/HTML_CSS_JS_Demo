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