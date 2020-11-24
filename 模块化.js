// ES6模块化
引用的是只读变量，export编译时包装一个对象暴露出去
顶层this指向undefiend
// CommonJS
引用的是复制值（深浅？），运行时加载
顶层this指向当前模块

// 加载顺序
js引擎遇到<script>标签后，渲染引擎挂起，等待<script>加载执行
如果JS文件太大建议给<script>标签加上 defer | async 属性来异步加载，两者区别在于延迟执行与立即执行

// 路径寻找规则
import './foo';
// 依次寻找
//   ./foo.js
//   ./foo/package.json
//   ./foo/index.js
 
import 'baz';
// 依次寻找
//   ./node_modules/baz.js
//   ./node_modules/baz/package.json
//   ./node_modules/baz/index.js
// 寻找上一级目录
//   ../node_modules/baz.js
//   ../node_modules/baz/package.json
//   ../node_modules/baz/index.js
// 再上一级目录
