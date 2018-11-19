//Set和Map数据结构
const s = new Set();
[2,3,4,5,6,7].forEach(x => s.add(x));
for(let i of s){
    console.log(i);
}

const set = new Set([1,2,3,4,5]);
console.log(set.size);
set.delete(1);
console.log(set.size);
console.log(set.has(1));
set.clear();
console.log(set.size);

//遍历set
const set_1 = new Set(['red','green','blue']);
for(let item of set_1.keys()){
    console.log(item);
}
for(let item of set_1.values()){
    console.log(item);
}
for(let item of set_1.entries()){
    console.log(item);
}
set_1.forEach(x => console.log(x));
set_1.forEach((x,y) => console.log(x + " : " + y));

//扩展运算符
let set_2 = new Set([12,23,45]);
let arr = [...set_2];
arr.forEach((x) => console.log(x));

set_2 = new Set([...set_2].map(x => x*2));
set_2.forEach(x => console.log(x));

set_2 = new Set([...set_2].filter(x => (x%3) == 0));
set_2.forEach(x => console.log(x));