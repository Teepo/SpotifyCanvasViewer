<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">

            <v-row>
                <v-col>
                    <v-btn :to="{ name : 'playlist' }" prepend-icon="mdi-playlist-music-outline" stacked width="100%" height="33vh" size="x-large">
                        By Playlist
                    </v-btn>
                </v-col>
            </v-row>

        </v-responsive>
    </v-container>
</template>

<script setup>

import { getAccessToken, login } from '../services/spotify';

(async () => {

    login();

    const access_token = await getAccessToken();

    console.log(access_token);

    /*
    const data = await (await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).json();

    console.log(data);

    const uris = data.items.map(item => {
        return item.track.uri;
    });

    console.log(uris.join("\n"));

    */

    const recent = await (await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).json();

    console.log(recent);
})();
</script>

<script>
    export default {

    }
</script>