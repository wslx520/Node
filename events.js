'use strict';
var events = require('events'),
    EventEmitter = events.EventEmitter;

var ee = new EventEmitter();
ee.on('test', function  (a,b,c) {
    console.log(a,b,c);
})
setTimeout(function () {
    ee.emit('test',1,2,3,4);
},1000)
