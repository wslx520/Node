var http = require('http'),
	route = require('./route'),
	port = 1111;
http.createServer(route.route).listen(port);
	console.log(`server at: ${port}`);