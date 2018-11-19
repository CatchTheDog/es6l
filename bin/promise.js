//Promise是异步编程的一种解决方案，比回调函数和事件更合理、强大
// Promise 是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果——Promise是一个对象，从它可以获取异步操作ode消息。
// Promise 对象有以下两个特点：
// 1.对象的状态不受外界影响
// Promise 对象代表一个异步操作，有三种状态：
//     pending(进行中)，fulfilled(已成功)和rejected(已失败)。只有异步操作的结果，可以决定当前是何种状态，任何其他操作都无法改变此状态。
// 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果
//         Promise对象的状态改变，只有两种可能，从pending到fulfiled和我pending到rejected。只要这两种情况发生，则状态凝固，会一直保持此结果，
// 这时就成为resolved(已定型)。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
//     缺点：第一，无法取消Promise,一旦新建就会立即执行，无法中途取消。
//          其次，如果不设置回调函数，Promise内部抛出的异常，不会反映到外部。
//          第三，当处于pending状态时，无法得知目前到那一阶段。
// 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。
var fs = require('fs');

const promise = new Promise(function (resolve, reject) {
    fs.unlink('/tmp/test.txt', function (err) {
        if (err) {
            reject(err);
        } else {
            resolve('success');
        }
    });
});

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then((value) => {
    console.log(value);
}, (err) => {
    console.error(err);
});

//实现Ajax
const getJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application//json');
        client.send();
    });
    return promise;
};

getJSON("/posts.json").then((json) => {
    console.log(`Contents : ${json}`);
}, (error) => {
    console.error(`出错啦，${error}`);
});


//建议使用catch代替使用第二个参数——reject回调函数。
//如果没有使用catch，Promise发生的异常不会传递到外层代码。
const promises = [2, 3, 4, 5, 6].map(function (id) {
    return getJSON(`/post/${id}.json`);
});
Promise.all(promises).then(function (posts) {

}).catch(function (reason) {
    console.error('some error: ' + reason);
}).finally(function () {
    console.log("finally excute!")
});

//加载图片
const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    })
};