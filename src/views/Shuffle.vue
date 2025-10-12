<template>
    <v-container class="fill-height">
        <div class="canvas-container" v-if="!!currentTrack">
            <video loop autoplay muted :src="`/canvas/${currentTrack.id}.mp4`" :poster="`${currentTrack.album.images[0].url}`"></video>
        </div>
        <v-alert type="warning" v-else>No track played</v-alert>
    </v-container>
</template>

<script setup>

import { onMounted } from 'vue';

onMounted(async () => {
});

</script>