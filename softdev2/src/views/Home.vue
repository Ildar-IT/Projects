<template>
  <div class="home">
    <div class="home__bg">
      <first-screen/>
      <stats/>
    </div>
    <our-projects/>
    <our-services-main :title="servicesTitle" :items="items"/>
    <about-main class="d-sm-flex d-md-block"/>
    <our-team/>
  </div>
</template>

<style lang="scss">
.home {
  &__bg {
    background: linear-gradient(154.66deg, #EDF4FF -1.2%, #78AEFF 96.94%);
    position: relative;
    z-index: 1;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      background: url("~@/assets/noize.png");
      height: 100%;
      opacity: 0.12;
      z-index: -1;
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-size: cover;
      background-position: center;
      background-image: url("~@/assets/Main/shadow4.png");

      @include up($sm) {
        background-image: url("~@/assets/Main/shadow3.png");
      }
    }
  }
}

</style>

<script>
// @ is an alias to /src

import OurServicesMain from "./Home/our-services-main";
import OurProjects from "./Home/our-projects";
import OurTeam from "./Home/our-team";
import Stats from "./Home/stats";
import AboutMain from "./Home/about-main";
import FirstScreen from "./Home/first-screen";
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();

export default {
  components: {
    FirstScreen,
    AboutMain,
    Stats,
    OurTeam, OurProjects, OurServicesMain,
  },
  computed: {
    items() {
      return this.$store.state.page?.services?.map(el => ({
        name: el.shorttitle,
        text: showdown.makeHtml(el.teaser),
        image: el.media?.url,
        to: {name: "ServiceItem", params: {code: el.url}}
      }));
    },
    servicesTitle() {
      const services = this.$store.state.common?.menus?.filter(el => el.url === "services");
      return services[0].shorttitle;
    }
  }
}
</script>



