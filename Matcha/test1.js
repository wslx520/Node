'use strict'

suite('Remove one element from an array', function () {
  function spliceOne (list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k]
    }
    list.pop()
  }

  bench('Array#splice', function () {
    let array = [1, 2, 3]
    array.splice(1, 1)
  })

  bench('EventEmitter way', function () {
    let array = [1, 2, 3]
    spliceOne(array, 1)
  })
})