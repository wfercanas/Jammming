import CLIENT_ID from '../config';

const REDIRECT_URI = 'http://localhost:3000/';
let USER_ACCESS_TOKEN;

const Spotify = {
  getAccessToken() {
    if (USER_ACCESS_TOKEN) {
      return USER_ACCESS_TOKEN;
    }
    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expireInMatch) {
      USER_ACCESS_TOKEN = accessTokenMatch[1];
      const expiresIn = Number(expireInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => (USER_ACCESS_TOKEN = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return USER_ACCESS_TOKEN;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = accessURL;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        }
      });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userID;

    return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  },
};

export default Spotify;
