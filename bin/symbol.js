//symbol
let symbol = Symbol('a new symbol');
console.log(symbol.toString());
//symbol作为属性名
let o = {};
o[symbol] = 'hello';
let m = {
    [symbol]:'hello'
};
let n = {};
Object.defineProperty(n,symbol,{value:'hello'});
console.log(o[symbol],m[symbol],n[symbol]);
//Symbol.for('xxxx') 如果存在xxxx  Symbol,则返回，否则新创建一个xxxxSymbol