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
      this.axiosInstance = null;
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
    this.setAxiosInstance();
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

  setAxiosInstance () {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });
    }
  }

  search (query, type) {
    return this.axiosInstance.get('search', {
      params: {
        'query': query,
        'type': type
      }
    });
  }

  getTracks (idList) {
    return `Spotify Model: Tracks for ${idList}`;
  }

  async getTrack (id) {
    console.log(`Getting track information for ID: ${id}`);
    return await this.axiosInstance.get(`tracks/${id}`);
  }
  
  async getTrackAudioAnalysis (id) {
    console.log(`Getting track audio analysis for ID: ${id}`);
    return await this.axiosInstance.get(`audio-analysis/${id}`);
  }

  async getTrackAudioFeatures (id) {
    console.log(`Getting track audio features for ID: ${id}`);
    return await this.axiosInstance.get(`audio-features/${id}`);
  }

  getTracksAudioFeatures (idList) {
    return `Spotify Model: Tracks audio features for ${idList}`;
  }

  async getArtist (id) {
    console.log(`Getting artist for ID: ${id}`);
    return await this.axiosInstance.get(`artists/${id}`);
  }

  async getAlbum (id) {
    console.log(`Getting album for ID: ${id}`);
    return await this.axiosInstance.get(`albums/${id}`);
  }

  async getCategory (id) {
    console.log(`Getting category for ID: ${id}`);
    return await this.axiosInstance.get(`browse/categories/${id}`);
  }

  getPlaylist (id) {
    return `Spotify Model: Playlist for ${id}`;
  }
};

const instance = new Spotify();

export default instance;
