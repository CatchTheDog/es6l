const map = new Map();
const o = {p:'Hello World!'};
map.set(o,'content');
console.log(map.get(o));

console.log(map.has(o));
map.delete(o);
console.log(map.has(o));

const map_1 = new Map([['name','张三'],['title','Author']]);
console.log(map_1.size);
console.log(map_1.has('name'));
console.log(map_1.get('title'));
for(let item of map_1.keys()){
    console.log(item);
}
for(let item of map_1.values()){
    console.log(item);
}
for(let item of map_1.entries()){
    console.log(item);
}

//使用扩展运算符
const map_3 = new Map([[1,'one'],[2,'two'],[3,'three']]);
let arr = [...map_3.keys()];
arr.forEach(x => console.log(x));
arr = [...map_3.values()];
arr.forEach(x => console.log(x));
arr = [...map_3.entries()];
arr.forEach(x => console.log(x));
arr = [...map_3];
arr.forEach(x => console.log(x));

//对Map进行遍历和过滤
const map_4 = new Map()
    .set(1,'a')
    .set(2,'b')
    .set(3,'c');
// const map_5 = new Map([...map_4].filter(([k,v]) => k<3));
// map_5.forEach(([k,v]) => console.log(k + " : "+v));
// const map_6 = new Map([...map_4].map(([k,v]) => [k*2,'_'+v]));

//Map转换为对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for(let [k,v] of strMap){
        obj[k] = v;
    }
    return obj;
}
const myMap = new Map()
    .set('yes',true)
    .set('no',false);
console.log(strMapToObj(myMap));

//对象转为Map
function objToStrMap(obj) {
    let strMap = new Map();
    for(let k of Object.keys(obj)){
        strMap.set(k,obj[k]);
    }
    return strMap;
}
console.log(objToStrMap({'yes':true,'no':false}));

//Map转为Json
function strMapToJson(strMap){
    return JSON.stringify(strMapToObj(strMap));
}
function strMapToJson_1(map){
    return JSON.stringify([...map]);
}

let myMap_1 = new Map().set('yes',true).set('no',false);
console.log(strMapToJson(myMap_1));

let myMap_2 = new Map().set(true,7).set({foo:3},['abc']);
console.log(strMapToJson_1(myMap_2));

//Json转Map
function jsonToStrMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}
console.log(jsonToStrMap('[[true,7],[{"foo":3},["abc"]]]'));