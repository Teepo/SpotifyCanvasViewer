<template>
    <v-container class="fill-height">
        <div class="canvas-container" v-if="!!currentTrack">
            <video loop autoplay muted :src="`/canvas/${currentTrack.id}.mp4`" :poster="`${currentTrack.album.images[0].url}`"></video>
        </div>
    </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { getCurrentlyPlaying } from '../services/spotify';

let currentTrack = ref(false);

onMounted(async () => {

    async function getCurrentTrack() {

        const track = await getCurrentlyPlaying();

        if (track.id !== currentTrack.value.id) {
            await fetchCanvas(track.id);
        }

        currentTrack.value = track;

        setTimeout(getCurrentTrack, 5000);
    }

    async function fetchCanvas(trackId) {

        const { canvasesList } = await (await fetch('https://localhost:8443/api/canvas/?trackId=' + trackId)).json();

        if (canvasesList.length <= 0) {
            return;
        }

        await fetch('https://localhost:8443/api/canvas/?trackId=' + trackId);
    }

   await getCurrentTrack();
});


</script>