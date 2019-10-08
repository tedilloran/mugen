const Koa = require('koa');
const router = new Koa();

router.use(async ctx => {
  ctx.body = 'Hello World!';
});

module.exports = router;
