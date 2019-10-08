const Koa = require('koa');
const Router = new Koa();

Router.use(async ctx => {
  ctx.body = 'Hello World!';
});

export default Router;
