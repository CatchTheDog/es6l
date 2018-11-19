//let const
//let [a,b,c] = [1,2,3];
//console.log(c);
// let [a,b,c] = {};
// console.log(a);

//数组解构
function finit() {
    return 0;
}
function* fibs() {
    let a = 0;
    let b = 1;
    while(true){
        yield a;
        console.log('after yield exe');
        [a,b] = [b,a+b];
    }
}
//     0      1     1      2     3    5
// let [first=finit(),second=1,third,fourth,fifth,sixth] = fibs();
// console.log(first);
// console.log(second);
// console.log(third);
// console.log(fourth);
// console.log(fifth);
// console.log(sixth);

//对象解构
let{bar,foo} = {foo:{x:'aaa'},bar:'bbb'};
console.log(foo);
console.log(bar);

let obj = {first:'hello',last:'world'};
let {first:f,last:l} = obj;
console.log(f)

//字符串解构
const [a,b,c,d,e] = 'hello';
console.log(e);

let{length:len} = 'hello';
console.log(len);

//数值和布尔值的解构赋值
let {toString:s}=123;
console.log(s === Number.prototype.toString);

let{toString:x} = true;
console.log(x === Boolean.prototype.toString);

//函数解构赋值
function add([x=0,y=0]) {
    return x + y;
}
console.log(add([1,3]));

[[1,2],[3,4]].map(([a,b]) => console.log(a + b));

//解构用途：
//交换变量值，从函数返回多个值，函数参数定义，提取JSON数据，函数参数设定默认值，遍历map结构，输入模块的指定方法