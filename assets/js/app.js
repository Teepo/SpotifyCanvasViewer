const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const playlistId = "5E1Mgv2x2WdPqiOvhfMZo1";

console.log(import.meta);;

(async () => {

    const { access_token } = await (await fetch(`https://accounts.spotify.com/api/token`, {
        method  : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': "Basic " + btoa(client_id + ":" + client_secret)
        },
        body: "grant_type=client_credentials",
    })).json();

    const data = await (await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).json();

    const uris = data.items.map(item => {
        return item.track.uri;
    });

    console.log(uris.join("\n"));

    const recent = await (await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=1`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).json();

    console.log(recent);
})();