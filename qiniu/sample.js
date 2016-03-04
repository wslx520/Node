'use strict';
var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'wdRz0u--a8NV2LXF2sl35LTVvIlowMBxYTmX-Bv2';
qiniu.conf.SECRET_KEY = '257_r-uMD0YMj6akS4mU_d3FRIPSDjas8o-fOIgd';

//要上传的空间
let bucket = 'priv';

//上传到七牛后保存的文件名
let key = 'test.mp4';

//转码是使用的队列名称。 
let pipeline = 'abc' #设定自己账号下的pipleline

//要进行转码的转码操作。 
let fops = "avthumb/avi/s/640x360/vb/1.25m"
//可以对转码后的文件进行使用saveas参数自定义命名，当然也可以不指定文件会默认命名并保存在当间。
// let saveas_key = qiniu.util.urlsafeBase64Encode(bucket + ':' + key); 
// let fops = fops+'|saveas/'+saveas_key;
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  putPolicy.persistentOps = fops;
  putPolicy.persistentPipeline = pipleline;
  return putPolicy.token();
}

//生成上传 Token
token = uptoken(bucket, key);

//要上传文件的本地路径
filePath = './test.mp4'

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}

//调用uploadFile上传
uploadFile(token, key, filePath);