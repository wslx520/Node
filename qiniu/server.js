'use strict';
var express = require('express');
var qiniu = require('qiniu');
var app = express();

var temp = {
    scope : 'my-bucket:sunflower.jpg',
    deadline : Date.now(),
    returnBody : '{\
          "name": $(fname),\
          "size": $(fsize),\
          "w": $(imageInfo.width),\
          "h": $(imageInfo.height),\
          "hash": $(etag)\
    }'
}
qiniu.conf.ACCESS_KEY = 'wdRz0u--a8NV2LXF2sl35LTVvIlowMBxYTmX-Bv2';
qiniu.conf.SECRET_KEY = '257_r-uMD0YMj6akS4mU_d3FRIPSDjas8o-fOIgd';
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.send('qiniu')
})
app.route('/upload')
    // 获取上传凭证
    .get(function (req, res) {
        res.send('get upload')
    })
    .post(function (req, res) {
        res.send('can upload')
    });
app.get('/startupload', function (req, res) {
    res.send(``);
})
app.listen(1111,function () {
    console.log('qiniu');
});
function uptoken(bucketname, callbackUrl, callbackBody, returnUrl, returnBody,asyncOps, endUser, expires) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname, callbackUrl, callbackBody, returnUrl, returnBody,asyncOps, endUser, expires);
  //putPolicy.callbackUrl = callbackUrl;
  //putPolicy.callbackBody = callbackBody;
  //putPolicy.returnUrl = returnUrl;
  //putPolicy.returnBody = returnBody;
  //putPolicy.asyncOps = asyncOps;
  //putPolicy.expires = expires;

  return putPolicy.token();
}