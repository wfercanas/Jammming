const CLIENT_ID = '0cef9e37848941a088a568e8edee8596';
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
};

export default Spotify;