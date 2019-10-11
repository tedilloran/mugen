import axios from 'axios';
import qs from 'qs';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const encodedCredentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const headers = { 'Authorization': `Basic ${encodedCredentials}` };
const data = qs.stringify({ 'grant_type': 'client_credentials' });
const SpotifyAPIInit = { method: 'POST', headers };

const Spotify = {
  getTrackAudioAnalysis: (id) => {
  },
  getTrackAudioFeatures: (id) => {
  },
  getTracksAudioFeatures: (idList) => {
  },
  getTracks: (idList) => {
  },
  getTrack: (id) => {
  }
};

async function SpotifyInit() {
  console.log('Getting Spotify access token...');
  let res = await axios.post('https://accounts.spotify.com/api/token', data,  SpotifyAPIInit);
  console.log('Acquired Spotify token');
  console.log(res);
}

SpotifyInit()
  .catch((err) => {
    console.log('Error occured while acquiring access token');
    console.log(err);
  });

export default Spotify;
