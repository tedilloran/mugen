import Router from './controllers/APIController';
import Spotify from './models/Spotify';

Spotify.test();
console.log('Now listening on port 3000...');
Router.listen(3000);

