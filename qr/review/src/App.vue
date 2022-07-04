<template>
	<v-app id="review-app">
		<transition name="route" mode="out-in">
			<router-view />
		</transition>
	</v-app>
</template>

<script>
    export default {
        name: 'App',

        components: {},

        data: () => ({
            //
        }),
        mounted() {
            window.addEventListener("resize", this.updateWindow);
			// Then we set the value in the --vh custom property to the root of the document
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            window.addEventListener('resize', () => {
                document.querySelector(':root').style
                    .setProperty('--vh', window.innerHeight / 100 + 'px');
            })
        },
        methods: {
            updateWindow() {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                window.addEventListener('resize', () => {
                    document.querySelector(':root').style
                        .setProperty('--vh', window.innerHeight / 100 + 'px');
                })
                this.$store.commit('updateWindowWidth')
            },
        }
    };
</script>
