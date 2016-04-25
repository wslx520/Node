const Koa = require('koa');
const app = new Koa();

// 此处开始堆叠各种中间件//...

app.use(ctx => {  ctx.body = 'Hello Koa';
});

app.listen(3000);