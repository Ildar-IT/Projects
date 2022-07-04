<template>
	<div class="animated-img" :class="{loaded:isLoaded}">
		<v-img :src="src" @load="onLoaded"/>
		<div v-if="isLoaded" class="anim-fade-in anim-dur-10">
			<img :src="src" class="anim-delay-5" :class="animClassImg" :alt="alt">
			<border class="anim-delay-5" :class="animClassBorder"/>
		</div>
	</div>
</template>

<script>
    import Border from "@/components/border";

    export default {
        name: "animated-img",
        props: ["src", "alt", "reversed"],
        components: {
            Border
        },
        data: () => {
            return {
                isLoaded: false,
                isReversed: false
            }
        },
        computed: {
            animClassImg() {
                return this.reversed ? "anim-fade-nw" : "anim-fade-se";
            },
            animClassBorder() {
                if (!this.isLoaded) return null;
                return this.reversed ? "anim-fade-se" : "anim-fade-nw";
            }
        },
        methods: {
            onLoaded() {
                setTimeout(() => {
                    this.isLoaded = true;
                    this.$emit("loaded");
                }, 150);
            }
        }

    }
</script>

<style lang="scss">
	.animated-img {
		position: relative;
		width: 295px;
		height: 295px;

		@include up($md) {
			width: 378px;
			height: 378px;
		}

		@include up($lg) {
			width: 440px;
			height: 440px;
		}

		& > div {
			width: 100%;
			height: 100%;

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.v-image {
			position: absolute;
			width: 1px;
			height: 1px;
			opacity: 0;
		}
	}

</style>