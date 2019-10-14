import axios from 'axios';
import qs from 'qs';

'use strict';

class Spotify {

  constructor() {
    if (!Spotify.instance) {
      const client_id = process.env.SPOTIFY_CLIENT_ID;
      const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
      const encodedCredentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
      const grantType = qs.stringify('client_credentials');
      this.expirationDate = null;
      this.accessToken = null;
      this.tokenType = null;
      (async () => {
        console.log('Getting Spotify access token...');
        let res = await axios.request({
          url: 'https://accounts.spotify.com/api/token',
          method: 'POST',
          headers: {
            'Authorization': `Basic ${encodedCredentials}`
          },
          data: qs.stringify({
            'grant_type': 'client_credentials'
          })
        });
        console.log('Acquired Spotify token');
        const { data } = res;
        this.init(data.expires_in, data.access_token, data.token_type);
      })().catch((err) => {
        console.log(err);
      });
    }
  }

  init (tokenDuration, accessToken, tokenType) {
    this.setExpirationDate(tokenDuration);
    this.setAccessToken(accessToken);
    this.setTokenType(tokenType);
  }

  setExpirationDate (tokenDuration) {
    if (!this.expirationDate) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + tokenDuration);
      this.expirationDate = expirationDate;
    }
  }

  setAccessToken (accessToken) {
    if (!this.accessToken) {
      this.accessToken = accessToken;
    }
  }

  setTokenType (tokenType) {
    if (!this.TokenType) {
      this.tokenType = tokenType;
    }
  }

  getTracks (idList) {
    return `Spotify Model: Tracks for ${idList}`;
  }

  async getTrack (id) {
    try {
      console.log(`Getting track information for ID: ${id}`);
      let res = await axios.request({
        url: `https://api.spotify.com/v1/tracks/${id}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });
      console.log(`Displaying track information for ID: ${id}`);
      const { data } = res;
      console.log(data);
    } catch(err) {
      console.log(`Unable to get track information for ID: ${id}`);
      console.log(err.response);
    }
    return `Spotify Model: track for ${id}`;
  }
  
  getTrackAudioAnalysis (id) {
    return `Spotify Model: Track audio analysis for ${id}`;
  }

  getTrackAudioFeatures (id) {
    return `Spotify Model: Track audio features for ${id}`;
  }

  getTracksAudioFeatures (idList) {
    return `Spotify Model: Tracks audio features for ${idList}`;
  }

  getArtist (id) {
    return `Spotify Model: Artist for ${id}`;
  }

  getAlbum (id) {
    return `Spotify Model: Album for ${id}`;
  }

  getCategory (id) {
    return `Spotify Model: Category for ${id}`;
  }

  getPlaylist (id) {
    return `Spotify Model: Playlist for ${id}`;
  }
};

const instance = new Spotify();

export default instance;
