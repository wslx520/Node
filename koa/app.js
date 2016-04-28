const Koa = require('koa');
const etpl = require('etpl');
const views = require('koa-views');
const app = new Koa();

// 此处开始堆叠各种中间件//...
app.use(views(__dirname + '/views', 'html', {
    map:'etpl'
}))

app.use(ctx => {  
    // ctx.body = 'Hello Koa';
    ctx.body = etpl.compile('Hello ${koa}')({koa:'this is Koa2!'})
});

app.listen(3000);