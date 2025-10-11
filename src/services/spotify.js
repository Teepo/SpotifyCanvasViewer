const client_id     = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri  = process.env.SPOTIFY_REDIRECT_URI;

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'spotify_access_token';

export async function login(force = false) {

    if (force) {
        localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    }

    if (isLogged() && !force) {
        return;
    }

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const auth_url =
        'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: 'user-read-email user-read-private streaming user-read-currently-playing user-read-playback-state user-modify-playback-state',
            redirect_uri: redirect_uri,
            code_challenge_method: 'S256',
            code_challenge: challenge
        }).toString();

    window.location = auth_url;
};

export async function requestAccessToken() {

    if (getAccessToken()) {
        return getAccessToken();
    }

    const { access_token } = await (await fetch(`https://accounts.spotify.com/api/token`, {
        method  : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body : new URLSearchParams({
            client_id: client_id,
            grant_type: 'authorization_code',
            code : getCode(),
            redirect_uri: redirect_uri,
            code_verifier: getVerifier()
        }).toString()
    })).json();

    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, access_token);

    return access_token;
};

export function setAuthorizeCode() {

    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    localStorage.setItem('code', code);
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getCurrentlyPlaying() {
    
    const access_token = await requestAccessToken();

    let recent;
    
    recent = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    if (recent.status === 401) {
        return login(true);
    }

    recent = await recent.json();

    if (recent.status === 204 // no content
        || !recent.is_playing) {
        return false;
    }

    const { item } = recent;

    return item;
}

export function getCode() {
    return localStorage.getItem('code');
}

export function getVerifier() {
    return localStorage.getItem('verifier');
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function isLogged() {
    return getCode() && getVerifier() && getAccessToken();
}