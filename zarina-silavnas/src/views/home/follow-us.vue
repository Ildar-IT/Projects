<template>
    <section class="follow-us">
        <v-container>

            <h2>follow us</h2>
            <div class="d-flex justify-center mt-10">
                <social-items/>
            </div>

        </v-container>
    </section>
</template>

<script>
    import SocialItems from '../../components/social-items.vue'

    export default {
        name: 'follow-us',
        components: {
            SocialItems
        }
    }
</script>

<style lang="scss">

    .follow-us {
        padding: 10px 0 80px 0;
        text-align: center;

        @include up($md) {
            padding: 50px 0 120px 0;
        }
    }
</style>
