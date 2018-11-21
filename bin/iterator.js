//模拟Iterator
// 原生具备 Iterator 接口的数据结构如下。
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象
function makeIterator(array){
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ? {value:array[nextIndex++],done:false}:
                {value:undefined,done:true};
        }
    };
}

const it = makeIterator(['a','b']);
 console.log(it.next());
 console.log(it.next());
 console.log(it.next());

 //
const obj = {
    [Symbol.iterator] : function () {
        return {
            next :function () {
                return {
                    value:1,
                    done:true
                };
            }
        };
    }
};
for(let prop of obj){
    console.log(obj);
}

class RangeIterator{
    constructor(start,stop){
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator](){ return this; }

    next(){
        let value = this.value;
        if(value < this.stop){
            this.value ++;
            return {done:false,value:value};
        }
        return {done:true,value:undefined};
    }
}
function range(start,stop) {
    return new RangeIterator(start,stop);
}

for(let value of range(0,3)){
    console.log(value);
}

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
//or
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')]

//调用Iterator接口的场景
// 1.解构赋值
// 2.扩展运算符
// 3.yield*
// 4.接受数组作为参数的场合