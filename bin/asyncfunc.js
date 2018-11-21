//async函数时Generator函数的语法糖
//async函数就是将Generator函数的*替换成async,将yield替换成await
//async函数对 Generator 函数的改进，体现在以下四点:
// 1.内置执行器，不需要手动执行
// 2.语义清晰，适用性更广泛
// 3.返回值是Promise
// 当async函数执行的时候，一旦遇到await就会先返回，等到异步操作完成后，再接着执行函数体内后面的语句。
// async 函数返回的是Promise对象，可以作为await命令的参数。正常情况下，await命令后是一个Promise对象，若不是，则返回对应的值。
