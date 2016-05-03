'use strict';

suite('function', function () {
    let a = 1,b =2;
  function ab(a, b) {
      return a + b;
  }
  bench('direct code', function () {
    a + b;
  })

  bench('function in parent scope', function () {
    ab(a,b);
  })
  bench('new function in current scope', function () {
    (function (a, b) {
          a + b;
    }(a, b));
  })

})