'use strict';

suite('search in string by: indexOf vs regexp.test', function () {
  let str = `0123456789abc012345678
    target : aaa\n
    target:abc
  `;
  let reg = /target\s*:/;
  bench('indexOf', function () {
    let b = str.indexOf('target:') > -1;
  })

  bench('regexp', function () {
    let b = reg.test(str);
  })
})