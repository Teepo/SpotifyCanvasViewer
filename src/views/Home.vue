<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">

            <v-row>
                <v-col>
                    <v-btn :to="{ name : 'current' }" prepend-icon="mdi-motion-play-outline" stacked width="100%" height="33vh" size="x-large">
                        Currently Played
                    </v-btn>
                </v-col>

                <v-col>
                    <v-btn :to="{ name : 'playlist' }" prepend-icon="mdi-playlist-music-outline" stacked width="100%" height="33vh" size="x-large">
                        By Playlist
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-btn :to="{ name : 'shuffle' }" prepend-icon="mdi-shuffle-variant" stacked width="100%" height="33vh" size="x-large">
                        Shuffle
                    </v-btn>
                </v-col>
            </v-row>

        </v-responsive>
    </v-container>
</template>

<script>
    export default {}
</script>