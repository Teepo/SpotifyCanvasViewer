<template>
    <v-container class="fill-height">
        <div class="canvas-container">
            <video autoplay muted :src="`${currentVideo}`"></video>
        </div>
    </v-container>
</template>

<script setup>

import { onMounted, ref } from 'vue';

import { getFileNameAndExtension } from './../utils/string';

const currentVideo = ref(null);

onMounted(async () => {

    const files = import.meta.glob('./../../public/canvas/*.mp4', { eager: true });
    
    const canvas = [];

    for (const path in files) {
        canvas.push(`/canvas/${getFileNameAndExtension(path)}`);
    }

    currentVideo.value = canvas.shift();

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