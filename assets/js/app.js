const client_id = 'bea258c573cd464cbbc7310c407febd0';
const client_secret = '0afc333f9de64387a43888b87b7ce28c';
const playlistId = "5E1Mgv2x2WdPqiOvhfMZo1";

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
    
    const track = data.items[0].track;

    console.log(track);
})();