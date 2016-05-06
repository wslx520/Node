'use strict';

suite('excute a function, apply, call', function () {
  let fn = function (a,b,c) {
      return a*b+c;
  }
  bench('fn', function () {
    fn(1,2,3)
  })

  bench('fn call', function () {    
    fn.call(null,1,2,3)
  })
  bench('fn apply', function () {    
    fn.apply(null,[1,2,3])
  })
})