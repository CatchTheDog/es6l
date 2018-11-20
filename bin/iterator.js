//模拟Iterator
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
