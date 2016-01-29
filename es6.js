/* 测试node.js中对es6语法的支持,2016/1-12,node5.4.0 */
"use strict";
function test(aaa,bbb, arg){
    // 参数默认值， a = 1，不支持
    // rest参数，...arg, 不支持
    console.log(arguments);
    // 扩展运算符 ... 用于把类数组变成一个一个的
    console.log([...arguments]);
    console.log('Node当前使用的v8引擎版本:', process.versions.v8);
    // "use strict";
    // Class and extends
    class Point {
        constructor (a, b) {
            this.name = 'p';
        }
        toString() {
            return {}.toString();
        }
        // 通过对对应key设置set，可以阻止对指定的key设置值,即 obj.xx = 'xxx'就会报错
        set not(n) {
            throw new Error('can not set not');
        }
    }
    class NewPoint extends Point {
        constructor (n) {
            super();
            this.name = n;
        }
    }
    const point = new NewPoint('a point');
    // point.not = 'not';
    console.log(point.name)
    const a = 'const is ok';
    let b = 'let is ok';
    // const [first, ...more] = ['first array element', 'a', 'b',1,2,3,4]; //不支持
    console.log(a, b);
    // const merge = (...sources) => Object.assign({}, ...sources);
    console.log(Date.now());   
    var pm = new Promise(function (res, rej) {
        setImmediate(function () {res('setImmediate can work, Promise is supported')});
    })
    pm.then(function (val) {
        console.log(val)
    }) 
    var foo = 'bar';
    // 只声明key不带value的语法
    var baz = {foo};
    console.log(baz)
    // 对象中的键值为函数的省略写法
    var o = {
        method() {
            return "Hello!";
        },
        baz
    };
    // 对象的新方法
    var o1 = {a:1}, o2 = {b:2, c:3}, o3 = {c:4}, o4 = Object.assign(o1,o2,o3);
    console.log(o, o4)
    // 数组新方法，以及箭头函数
    console.log('Array.from', Array.from(arguments, s => s || ''), 
        // 扩展运算符在合并数组时的运用
        [1,2,...[4,5,6,8]],
        Array.of('a', 1, 'b'), 
        [1,2,4,5,6].copyWithin(0,3), 
        [1,2,4,5,6].keys(), 
        [1,2,3,5,555,55,2].find(n => n>5),
        [1,2,3,5,555,55,2].findIndex(n => n>5),
        new Int32Array([1,2,3,4,666])
    )
    // Set, WeakSet
    console.log('Set is a unique Array :', new Set([1,2,3,3,4,5,4]));
    console.log('WeakSet\'s elements are all Object :', new WeakSet([{1:1,2:'a'}]).add({o:'obj'}));
    // Map
    console.log(new Map([[1,2], [3,4]]));
    // Generator yield
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
        return 'end'
    }
    var g = gen();
    console.log(g.next(), g.next(), g.next(), g.next());
    // for..of循环
    var ta = [1,,3,4,null,undefined,'a'];
    // for(let [i,t] of ta) { //let [i,t] 不支持
    for(let t of ta) {
        console.log(t)
    }
    // 正则
    // var reg = /ab/y; //不支持
    // console.log(reg.sticky)
    // 2进制与8进制表示法
    console.log(0b111110111 === 503, 0o767 === 503)
    // Symbol
    const sym = Symbol('a');
    console.log('Symbol is ok, ', sym)
    // Proxy 不支持
    /*var proxy = new Proxy({}, {
      get: function(target, property) {
        return 35;
      }
    });
    console.log(proxy.time,      proxy.name , proxy.title);*/
    // Number新方法
    // 2**3 //指数运算符，不支持
    console.log(Number.isFinite(123), Number.isNaN('a'), Number.parseInt('10a',10), Number.parseFloat('12.1231a'));
    // 此外Number上还加有：isInteger(是否整数),isSafeInteger
    // Math新方法
    console.log(Math.trunc('1234.1'), Math.sign(-123))
}
test(1,2,3,4,null)
