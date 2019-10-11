import { Spotify } from '../models/Spotify';
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const SpotifyRouter = new Router();

SpotifyRouter.get('/browse/:id', (ctx, next) => {
  ctx.body = `/browse/${ctx.params.id}`;
});

SpotifyRouter.get('/track/:id', (ctx, next) => {
  ctx.body = `/track/${ctx.params.id}`;
});

SpotifyRouter.get('/tracks/:id', (ctx, next) => {
  ctx.body = `/track/${ctx.params.id}`;
});

SpotifyRouter.get('/artists/:id', (ctx, next) => {
  ctx.body = `/artists/${ctx.params.id}`;
});

SpotifyRouter.get('/albums/:id', (ctx, next) => {
  ctx.body = `/albums/${ctx.params.id}`;
});

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World!';
});

router.use('/Spotify', SpotifyRouter.routes(), SpotifyRouter.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
