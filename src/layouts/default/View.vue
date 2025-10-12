<template>
    <v-main>
        <v-btn :to="{ name : 'home' }" prepend-icon="mdi-home" size="x-large" variant="text">Home</v-btn>
        <router-view />
    </v-main>
</template>

<script setup></script>