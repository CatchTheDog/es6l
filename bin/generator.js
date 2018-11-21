//Generator函数是一种异步编程解决方案。可以将Generator看做是一个封装了多个内部状态的状态机。
//Generator函数除了状态机，还是一个遍历器对象生成函数，执行Generator函数会返回一个遍历器对象；返回的遍历器对象，可以依次遍历
//Generator函数内部的每一个状态。
//Generator函数有两个特征：
// 1.function 关键字与函数名之间有一个*；
// 2.函数体内部使用yield表达式，定义不同的内部状态

function* hellowWorldGenerator() {
    let i = 0;
    i += 3;
    yield 'hello' + i;
    i += 4;
    yield 'world' + i;
    i += 5;
    return 'ending' + i;
}

let hw = hellowWorldGenerator();
console.log(typeof hw);
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

//yield表达式本身返回值为undefined，且yield关键字只能在Generator函数中使用
//调用Generator函数next方法时传入参数，则该参数就作为上次调用next时yield表达式的返回值。
function* f() {
    for (let i = 0; true; i++) {
        let reset = yield i;
        if (reset) {
            i = -1;
        }
    }
}

let g = f();
console.log(g.next());
console.log(g.next());
console.log(g.next(true));

//使用for...of自动遍历Generator函数生成的Iterator对象
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}

//加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。
function* objectEntries() {
    let propKeys = Object.keys(this);
    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = {first: 'Jane', last: 'Doe'};
jane[Symbol.iterator] = objectEntries;
for (let [key, value] of jane) {
    console.log(`${key}:${value}`);
}

//此外，扩展运算符，解构赋值和Array.from都可以将Generator函数返回的Iterator对象作为参数
function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

//结果为什么没有包含3,4
console.log([...numbers()]);
console.log(Array.from(numbers()));
let [x, y] = numbers();
console.log(`x:${x},y:${y}`);
for (let n of numbers()) {
    console.log(n);
}

//Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在函数体内捕获。
//Generator函数返回的遍历器对象，都有一个return方法，可以返回给定的值，并且终结遍历Generator函数。

function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

let regen = gen();
console.log(regen.next());
console.log(regen.return('foo'));
console.log(regen.next());
//next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
//next()是将yield表达式替换成一个值。
//throw()是将yield表达式替换成一个throw语句。
//return()是将yield表达式替换成一个return语句。


//yield* 表达式用来在一个Generator函数中执行另一个Generator函数。
//如果一个对象的属性是Generator函数，可以简写:
let obj = {
    * myGeneratorFunc() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    },
    //完整写法
    myGeneratorFunc_1: function* () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        return 5;
    }
};

//Generator与状态机、协程及上下文
// 1.实现状态机
// 2.协程——"协作的线程"或者"协作的函数"，协程既可以用单线程实现（一种特殊的子例程），也可以用多线程实现（一种特殊的线程）。
//javascript是单线程语言，只能保持一个调用栈。引入协程后，每个任务可以保持自己的调用栈，这样在抛出异常时，可以找到原始的调用栈，
// 而不会像异步操作的回调函数一样，抛出异常后，原始的调用栈早已结束。
//Generator函数是ES6对协程的实现，但属于不完全实现，所以被称为半协程——只有Generator函数的调用者才能将程序的执行权还给Generator函数；
//如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。
//可以将多个需要互相协作的任务协程Generator函数，它们之间使用yield表达式交换控制权。
// 3.Generator 与上下文：
// JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。
// 然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。
// 这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。
// Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。
// 等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

// Generator应用：
//1.异步操作的同步化表达
//2.控制流管理
//3.部署Iterator接口
//4.作为数据结构