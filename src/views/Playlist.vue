<template>
    <v-container class="fill-height">
        <v-row v-for="playlist in playlists" :key="playlist.id">
            <v-col>
                <v-btn :to="{ name : 'playlist' }" prepend-icon="mdi-motion-play-outline" stacked width="100%" height="33vh" size="x-large">
                    Currently Played
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { getPlaylists } from '../services/spotify';

let playlists = ref([]);

onMounted(async () => {
    playlists.value = await getPlaylists();
});


</script>