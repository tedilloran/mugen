const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.use(async ctx => {
  ctx.body = 'Hello World!';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
