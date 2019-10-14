const Koa = require('koa');
const Router = require('koa-router');
import SpotifyController from './SpotifyAPIController';

const app = new Koa();
const router = new Router();


router.get('/', (ctx, next) => {
  ctx.body = 'Hello World!';
});

router.use('/Spotify', SpotifyController.routes(), SpotifyController.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
