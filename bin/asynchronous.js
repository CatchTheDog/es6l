// javascript是一个单线程语言（关于javascript为何是单线程语言的解释：因为javascript最初用于页面中操作DOM，如果采用多线程，则会引发复杂性和不确定性。）
// 在ES6前，异步编程有以下四种方式：
// 1.回调函数
// 2.事件监听
// 3.发布/订阅
// 4.Promise对象
// Generator函数将Javascript异步编程带入一个全新的阶段：
//      Javascript语言对异步编程的支持就是通过回调函数。
//      Promise是为了解决“回调地狱“(callback hell)而提出的，最大的问题就是代码冗余。
//异步编程的解决方案，其中有一种叫做协程，其运行流程大致如下：
// 第一步，协程A开始执行。
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// 第三步，（一段时间后）协程B交还执行权。
// 第四步，协程A恢复执行。
// 上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。
//读取文件的协程写法：
// function* asyncJob() {
//     //...其他代码
//     let f = yield readFile(fileA);
//     //...其他代码
// }
// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

function* generateNum() {
    let i = 0;
    console.log(i);
    let result = yield i++;
    if (result == 10) {
        i = 0;
        console.log(i);
        yield i;
    } else {
        console.log("yield前" + i);
        yield i;
    }
}


let gen = generateNum();
console.log(gen.next());
console.log(gen.next(11));
console.log(gen.next());

//真是执行异步任务
let fetch = require('node-fetch');

function* fetchUrl() {
    let url = 'https://api.github.com/users/github';
    let result = yield fetch(url);
    console.log(result);
}

let fu = fetchUrl();
let result = fu.next();
result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    fu.next(data);
});

//Generator简化了异步任务表达，但是对流程管理很不方便。
//Thunk函数：是自动执行Generator函数的一种方法。
//在javascript中，Thunk函数替换的不是表达式，而是将多参函数替换成一个只接受回调函数作为参数的单参数函数。
const fs = require('fs');
let callback = function (err, data) {
    if (err) {
        throw new Error(err);
    } else {
        console.log(data);
    }
}
//正常版本写法
const fileName = "../package.json";
fs.readFile(fileName, callback);

//Thunk版本写法
const Thunk = function (filename) {
    return function (callback) {
        return fs.readFile(filename, callback);
    };
};
let readFileThunk = Thunk(fileName);
readFileThunk(callback);

//Thunk函数转换器
const Thunk_1 = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        };
    };
};

//使用Thunkify模块
const thunkify = require('thunkify');
const read = thunkify(fs.readFile);
read('../package.json')(function (err, str) {
    console.log(str);
});

