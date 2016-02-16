var url = require('url');
var htmlTemplate = require('./html');

var routes = {
	'/upload': function () {
		return `<form action="/form_request" method="POST">
		<textarea name="text" id="" cols="30" rows="10"></textarea>
		<input type="submit" value="提交" />
	</form>`;
	},
	'/login': function () {
		
	},
	'/form_request': function (postData) {
		return `提交成功！你提交的数据是：${postData}`;
	}
}

function initRequestEvent (req, res, pathname) {
	var postData = '';
	req.setEncoding('utf8');
	req.addListener('data', function (chunk) {
		postData += chunk;
	});
	req.addListener('end', function () {
		doResponse(res, postData, pathname);
	})
}
function doResponse (res, postData, pathname) {
	
	if(routes[pathname]) {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(htmlTemplate('上传文件',routes[pathname](postData)));
		res.end();
	} else {
		res.writeHead(404, {'Content-Type':'text/html'});
		res.write('404!');
		res.end();
	}
}
function route (req, res) {
	var pathstr = req.url;
	console.log(req.url)
	var parsed = url.parse(pathstr);
	var pathname = parsed.pathname;
	if(pathname.slice(-1) === '/') {
		pathname = pathname.slice(0, -1);
	}
	initRequestEvent(req, res, pathname);
	// return parsed;
	console.log(`route:${url.parse(pathstr).pathname}`);
}

exports.route = route;