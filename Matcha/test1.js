'use strict'

suite('Remove one element from an array', function () {
  function spliceOne (list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k]
    }
    list.pop()
  }

  function spliceMore (list, index, num) {
    num = num || 1;
    for (var i = index, k = i + num, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k]
    }
    list.length = list.length - num
  }
  
  bench('Array#splice', function () {
    let array = [1, 2, 3,1, 2, 3,1, 2, 3]
    array.splice(1, 3)
  })

  bench('EventEmitter way', function () {
    let array = [1, 2, 3,1, 2, 3,1, 2, 3]
    spliceMore(array, 1, 3)
  })
})