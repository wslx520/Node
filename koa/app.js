const Koa = require('koa');
const etplWrap = require('etpl-wrap');
const app = new Koa();

// 此处开始堆叠各种中间件//...
var etpl = new etplWrap('./views','.html');
app.use(ctx => {  
    // ctx.body = 'Hello Koa';
    // ctx.body = etpl.compile('Hello ${koa}')({koa:'this is Koa2!'})
    ctx.body = etpl.render('index', {welcome:'koa与etpl-wrap测试', koa:'this is Koa2!', 'engine': 'etpl and etpl-wrap'});
});

app.listen(3000);