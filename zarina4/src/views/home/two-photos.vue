<template>
    <section class="d-md-none two-photos">
        <v-row no-gutters>
            <v-col cols="6">
                <img class="d-block" src="~@/assets/two-photos/photo1.jpg" alt="Photo1">
            </v-col>
            <v-col cols="6">
                <img class="d-block" src="~@/assets/two-photos/photo2.jpg" alt="Photo2">
            </v-col>
            <!--<v-col cols="6" sm="4" class="d-none d-sm-block">
                <img class="d-block" src="~@/assets/two-photos/photo1.jpg" alt="Photo3">
            </v-col>-->
        </v-row>
        <!--<img class="d-block" srcset="~@/assets/two-photos/photo1.jpg 320w,
             ~@/assets/two-photos/photo1x2.jpg 960w"
             sizes="(max-width: 960px) 320w,
             960w"
             src="~@/assets/two-photos/photo1.jpg" alt="Photo1">-->
    </section>
</template>

<script>
    export default {
        name: 'two-photos',
    }
</script>

<style lang="scss">

    .two-photos {
        img {
            width:100%;
        }
    }

</style>
