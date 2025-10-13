<template>
    <v-container class="fill-height">
        <div class="canvas-container" v-if="!!currentTrack">
            <video loop autoplay muted :src="`${BASE_URL}/canvas/${currentTrack.id}.mp4`" :poster="`${currentTrack.album.images[0].url}`"></video>
        </div>
        <v-alert type="warning" v-else>No track played</v-alert>
    </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { getCurrentlyPlaying } from '../services/spotify';

import { sleep } from './../utils/timing';

let currentTrack = ref(false);

const BASE_URL = ref(process.env.BASE_URL);

onMounted(async () => {

    document.querySelector('video').requestFullscreen();

    async function getCurrentTrack() {

        const track = await getCurrentlyPlaying();

        if (track.id !== currentTrack.value.id) {
            await fetch(`${process.env.API_CANVAS_URL}/api/canvas/?trackId=${track.id}`);
            await sleep(100);
        }

        currentTrack.value = track;

        setTimeout(getCurrentTrack, 5000);
    }

   await getCurrentTrack();
});

</script>