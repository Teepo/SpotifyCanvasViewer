<template>
    <v-container class="fill-height">
        <v-col cols="12" v-for="playlist in playlists.items" :key="playlist.id">
            <v-btn :to="{ name : 'playlist' }" size="x-large">
                
                <template v-slot:prepend>
                    <v-img :width="200" cover :src="`${playlist.images[0].url}`" />
                </template>
                
                {{ playlist.name }}
            </v-btn>
        </v-col>
    </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { getPlaylists } from '../services/spotify';

let playlists = ref([]);

onMounted(async () => {
    
    playlists.value = await getPlaylists();

    console.log(playlists.value);
});
</script>

<style scoped lang="scss">
.v-col,
.v-btn {
    padding-left: 0;
}

.v-col {
    overflow: hidden;
}

.v-btn {
    width: 100%;
    height: auto !important;
    justify-content: start;
}

.v-img {
    margin-right: 30px;
    min-height: 200px;
}
</style>

<style>
.v-btn__content {
    justify-content: start;
    overflow: hidden;
}
</style>