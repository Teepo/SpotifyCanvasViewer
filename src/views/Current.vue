<template>
    <v-container class="fill-height">
        <v-alert type="warning" v-if="!isLogged()">Not logged</v-alert>
        <v-alert type="info" v-if="currentTrack === false">Not track played</v-alert>
        <v-alert type="success" v-if="!!currentTrack">{{ currentTrack.name }} - {{ currentTrack.id }}</v-alert>
    </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { isLogged, getCurrentlyPlaying } from '../services/spotify';

let currentTrack = ref(null);

onMounted(async () => {

    async function getCurrentTrack() {
        currentTrack.value = await getCurrentlyPlaying();

        setTimeout(getCurrentTrack, 5000);
    }

   await getCurrentTrack();

   const canvas = await fetch('https://localhost:8443/api/canvas/?trackId=' + currentTrack.value.id);
});


</script>