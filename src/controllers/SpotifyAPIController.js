import Spotify from '../models/Spotify';
const Router = require('koa-router');

const SpotifyController = new Router();

SpotifyController.get('/browse/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = `/browse/${id}`;
});

SpotifyController.get('/track/:id', (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = Spotify.getTrack(id);
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


export default SpotifyController;
