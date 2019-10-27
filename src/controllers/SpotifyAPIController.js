import Spotify from '../models/Spotify';
const Router = require('koa-router');

const SpotifyController = new Router();
const SpotifySearchController = new Router();

SpotifyController.get('/browse/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = `/browse/${id}`;
});

SpotifyController.get('/track/:id', async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const res = await Spotify.getTrack(id);
    const { data } = res;
    console.log(data);
    ctx.body = data;
  } catch(err) {
    console.log(err);
    ctx.body = `Unable to get track information for track ID: ${id}`;
  };
});

SpotifySearchController.get('/', (ctx, next) => {
  const { query } = ctx;
  ctx.body = Spotify.search(query, null);
});

SpotifySearchController.get('/album', (ctx, next) => {
  const { query } = ctx;
  ctx.body = Spotify.search(query, 'album');
});

SpotifySearchController.get('/artist', (ctx, next) => {
  const { query } = ctx;
  ctx.body = Spotify.search(query, 'artist');
});

SpotifySearchController.get('/track', (ctx, next) => {
  const { query } = ctx;
  ctx.body = Spotify.search(query, 'track');
});

SpotifyController.get('/tracks/:idList', (ctx, next) => {
  const { idList } = ctx.params;
  ctx.body = Spotify.getTracks(idList);
});

SpotifyController.get('/track/audio-analysis/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = Spotify.getTrackAudioAnalysis(id);
});

SpotifyController.get('/track/audio-features/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = Spotify.getTrackAudioFeatures(id);
});

SpotifyController.get('/artists/:idList', (ctx, next) => {
  const { idList } = ctx.params;
  ctx.body = Spotify.getArtists(idList);
});

SpotifyController.get('/album/:id', (ctx, next) => {
  const { id} = ctx.params;
  ctx.body = Spotify.getAlbum(id);
});

SpotifyController.get('/albums/:idList', (ctx, next) => {
  const { idList } = ctx.params;
  ctx.body = Spotify.getAlbums(idList);
});

SpotifyController.use(
  '/search',
  SpotifySearchController.routes(),
  SpotifySearchController.allowedMethods()
);

export default SpotifyController;
