//Proxy用于修改某些操作的默认行为，属元编程
let obj = new Proxy({},{
    get:function (target,key,receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target,key,receiver);
    },
    set:function (target,key,value,receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target,key,value,receiver);
    }
});

obj.count = 1;
++ obj.count;


//使用Proxy实现链式操作
let pipe = (function () {
   return function (value) {
       let funcStack = [];
       let oproxy = new Proxy({},{
           get:function (pipeObject,fnName) {
               if(fnName === 'get'){
                   return funcStack.reduce(function (val,fn) {
                       return fn(val);
                   },value);
               }
               funcStack.push(window[fnName]);
               return oproxy;
           }
       });
       return oproxy;
   }
}());

let double = n => n *2;
let pow = n => n * n;
let reverseInt = n => n.toString().split("").reverse().join("") | 0;

// pipe(3).double.pow.reverseInt.get();
