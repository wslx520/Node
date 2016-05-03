'use strict';

suite('regexp in loop', function () {
  let reg = /\s/;
  let creg = /\d{1,4}-\d{1,2}-\d{1,2}/;
  bench('simple regexp: new RegExp per time', function () {
    let a = /\s/.test(' ');
  })

  bench('simple regexp: by variable', function () {
    let a = reg.test(' ');
  })
  bench('complex regexp: new RegExp per time', function () {
    let a = /\d{1,4}-\d{1,2}-\d{1,2}/.test('2012-12-12');
  })

  bench('complex regexp: by variable', function () {
    let a = creg.test('2012-12-12');
  })
})