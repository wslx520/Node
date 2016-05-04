'use strict';

suite('var/let in loop', function () {
  let a;
  bench('pre-defined variable in loop', function () {
    for(let i = 0;i<10;i++) {
        a = i*3;
    }
  })

  bench('var variable in loop', function () {    
    for(let i = 0;i<10;i++) {
        var b = i*3;
    }
  })
  bench('pre-defined argument replace variable in loop', function (c) {    
    for(let i = 0;i<10;i++) {
        c = i*3;
    }
  })
})