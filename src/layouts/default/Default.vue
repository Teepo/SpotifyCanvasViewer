<template>
    <v-app>
        <default-view />
    </v-app>
</template>

<script setup>
    import DefaultView from './View.vue'
</script>

<script>
    export default {

        data() {
            return {
                tab: this.$route.name
            }
        }
    }
</script>

<style scoped>
    .v-application {
        background-color: #21D4FD;
        background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
    }

    .v-tabs a {
        color: #fff
    }
</style>