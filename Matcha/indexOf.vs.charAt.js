'use strict';

suite('indexOf vs charAt', function () {
  let str = '0123456789abc012345678'
  bench('indexOf on position 0', function () {
    str.indexOf(0) === 0;
  })

  bench('charAt on position 0', function () {
    str.charAt(0) === '0';
  })
  bench('lastIndexOf on last position', function () {
    str.lastIndexOf('8') === 0;
  })

  bench('charAt on last position', function () {
    str.charAt(str.length - 1) === '8';
  })
})