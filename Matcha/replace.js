'use strict';

suite('regexp replace', function () {
    let reg1 = /\s/g;
    let reg2 = /\t/g;
    let reg3 = /\s|\t/g;
  bench('twice replace by two single regexp', function () {
    let str = '123 456 789 0    1'.replace(reg1,'').replace(reg2,'');
  })

  bench('once replace by one regexp', function () {    
    let str = '123 456 789 0    1'.replace(reg3,'');
  })
})