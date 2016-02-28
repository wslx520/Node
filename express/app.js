var express = require('express');
var app = express();


// 静态文件服务器
app.use(express.static('statics'));

app.get('/', function (request, response) {
	response.send('根目录')
})
app.post('/', function (request, response) {
	response.send('post到根目录')
})

app.get('/user', function (request, response) {
	response.send('用户')
})

var server = app.listen('1111', function () {
	var address = server.address();
	var host = address.address;
	var port = address.port;

	console.log('server start at http://%s:%s', host, port);
})