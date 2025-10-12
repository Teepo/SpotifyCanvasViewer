<template>
    <v-container class="fill-height">
        <div class="canvas-container" v-if="!!currentTrack">
            <video loop autoplay muted :src="`/canvas/${currentTrack.id}.mp4`" :poster="`${currentTrack.album.images[0].url}`"></video>
        </div>
        <v-alert type="warning" v-else>No track played</v-alert>
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
            await fetch(`${process.env.API_CANVAS_URL}/api/canvas/?trackId=${track.id}`);
        }

        currentTrack.value = track;

        setTimeout(getCurrentTrack, 5000);
    }

   await getCurrentTrack();
});


</script>