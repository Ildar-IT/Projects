<template>
  <section v-if="text" class="about-main d-sm-flex d-md-block">
    <v-container>
      <v-row>
        <v-col cols="12 col-sm-6">
          <div class="about-main__content">
            <h2 class="about-main__title">{{ text.shorttitle }}</h2>
            <div class="mb-4 mb-md-8 about-main__text" v-html="text.teaser"></div>
            <!--            <p class="mb-5">
                          The strong team of best-of-breed professionals. Rendering services to the customers for over
                          25
                          years.</p>
                        <p class="mb-8 mb-md-13">
                          We’re in a position to help respond to the many challenges that software vendors in North
                          America,
                          Europe and Asia are facing in the today’s business realm.
                        </p>-->

            <div class="d-flex justify-start justify-sm-end">
              <btn-link class="pl-0 d-inline-flex" :to="{name:'About-us'}"/>
            </div>

          </div>
        </v-col>
        <v-col cols="12 col-sm-6">
          <img src="@/assets/About-us/tower.png">
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<style lang="scss">
.about-main {
  padding-top: 60px;
  position: relative;
  overflow: hidden;
  @include up($sm) {
    padding: 132px 0 108px;
  }
  @include up($md) {
    padding: 120px 0 148px;
  }
  @include up($lg) {
    padding: 160px 0;
  }

  &__title {
    margin-bottom: 32px;
    @include up($md) {
      margin-bottom: 70px;
    }
    @include up($lg) {
      margin-bottom: 80px;
    }
  }

  p {
    color: $black !important;
  }

  img {
    display: block;
    margin-top: -80px;
    overflow: hidden;
    width: 566px;
    height: auto;
    z-index: -1;
    @include up($sm) {
      position: absolute;
      margin-left: auto;
      top: 20%;
      right: -10%;
      //left: 30%;
      margin-top: 0;
      width: 593.96px;
    }
    @include up($md) {
      position: absolute;
      top: 12%;
      right: unset;
      left: 35%;
      width: 940.49px;
    }
    @include up($lg) {
      top: 8%;
      width: 1300px;

    }
  }

  &__content {
    @include up($sm) {
      //width: 340px;
    }
    @include up($md) {
      width: 507px;
    }
  }
}
</style>

<script>
import BtnLink from "../../components/btn-link";
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();

export default {
  components: {BtnLink},
  computed: {
    text() {
      const text = this.$store.state.page?.textAboutUs;
      if (!text) return null;
      if (text.teaser) text.teaser = showdown.makeHtml(text.teaser);
      return text;
    }
  }
}
</script>