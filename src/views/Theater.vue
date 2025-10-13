<template>
    <v-container class="fill-height">
        <div class="canvas-container">
            <video autoplay muted :src="`${BASE_URL}/canvas/${currentVideo}`"></video>
        </div>
    </v-container>
</template>

<script setup>

import { onMounted, ref } from 'vue';

const currentVideo = ref(null);

const BASE_URL = ref(process.env.BASE_URL);

onMounted(async () => {

    const canvas = await (await fetch(`${process.env.API_CANVAS_URL}/api/canvas_list`)).json();

    currentVideo.value = canvas.shift();

    document.querySelector('video').requestFullscreen();

    let loop = 0;

    document.querySelector('video').addEventListener('ended', () => {

        const video = document.querySelector('video');

        if (loop < 5) {
            loop++;
            video.currentTime = 0;
            video.play();
            return;
        }

        loop = 0;

        canvas.push(currentVideo.value);
        currentVideo.value = canvas.shift();
    });
});

</script>