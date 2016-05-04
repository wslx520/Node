'use strict';

suite('regexp /[a-z]/i vs. \\w', function () {
  bench('i', function () {
    /^\s*([a-z0-9\/_-]+)\s*$/i.test('abcAbCdE123456')
  })

  bench('\\w', function () {
    /^\s*([\w\/-]+)\s*$/.test('abcAbCdE123456')
  })
  bench('[a-zA-Z0-9_]', function () {
    /^\s*([a-zA-Z0-9_\/-]+)\s*$/.test('abcAbCdE123456')
  })
})