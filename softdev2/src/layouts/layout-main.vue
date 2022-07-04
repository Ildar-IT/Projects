<template>
    <div class="layout-main" @click="closeLangMenu">
        <the-header/>
        <main>
            <transition name="route" mode="out-in"  >
                <router-view :key="route"/>
            </transition>
        </main>
        <the-footer/>
    </div>
</template>



<script>
import TheHeader from "./main/the-header";
import TheFooter from "./main/the-footer";



export default {
    components: {TheHeader, TheFooter},
    computed:{
      route() {
        console.log(this.$route)
        return this.$route.fullPath;
      }
    },
  methods: {
    closeLangMenu(e) {
      console.log(e);
      if (e.target.id === "menuLangSelect") return
      if(this.$store.state.menuLangActive) this.$store.state.menuLangActive = false
    }
  }
}
</script>