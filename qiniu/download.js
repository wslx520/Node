'use strict';
var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = 'wdRz0u--a8NV2LXF2sl35LTVvIlowMBxYTmX-Bv2';
qiniu.conf.SECRET_KEY = '257_r-uMD0YMj6akS4mU_d3FRIPSDjas8o-fOIgd';

//构建私有空间的链接
var url = 'http://7xrgkx.com1.z0.glb.clouddn.com/test.mp4';

//生成下载链接url
var downloadUrl = qiniu.util.policy.makeRequest(url);
for(let r in qiniu) {
    console.log(r);
}
//打印下载的url
// console.log(downloadUrl)