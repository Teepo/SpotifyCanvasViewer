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
                    <v-btn :to="{ name : 'playlists' }" prepend-icon="mdi-playlist-music-outline" stacked width="100%" height="33vh" size="x-large">
                        By Playlists
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-btn :to="{ name : 'shuffle' }" prepend-icon="mdi-shuffle-variant" stacked width="100%" height="33vh" size="x-large">
                        Shuffle
                    </v-btn>
                </v-col>

                <v-col>
                    <v-btn :to="{ name : 'theater' }" prepend-icon="mdi-theater" stacked width="100%" height="33vh" size="x-large">
                        Theater Mode
                    </v-btn>
                </v-col>
            </v-row>

        </v-responsive>
    </v-container>
</template>

<style lang="scss">
.v-btn {
    &__content {
        text-align: center;
    }
}
</style>