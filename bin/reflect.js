//Reflect对象与Proxy对象一样，器设计目的有以下几个：
// 1.将Object对象的一些明显属于语言内部的方法，放到Reflect方法上
// 2.修改某些Object方法的返回结果，使其更合理
// 3.让Object操作变为函数行为
// 4.Reflect对象的方法与Proxy对象的方法一一对应，可以让Proxy对象调用对应的Reflect方法完成默认行为，作为修改的基础。
let proxy = new Proxy({},{
    set:function (target,key,value,receiver) {
        //执行set默认行为
        let success = Reflect.set(target,key,value,receiver);
        if(success)
            console.log(`property: ${key} on ${target} set to ${value}!`);
    },
    deleteProperty:function (target,name) {
        console.log(`delete ${name} on ${target}`);
        return Reflect.deleteProperty(target,name);
    },
    has:function (target,name) {
        console.log(`${target} has property ${name}`);
        return Reflect.has(target,name);
    }
});
proxy.x1 = 1;
for(let key in proxy){
    console.log(`${key} : ` + proxy[key]);
}
delete proxy['x1'];