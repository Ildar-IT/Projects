<template>
  <section  class="benefits-softdev">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center mb-auto">
          <img class="d-block " src="@/assets/Benefits/Main.png" alt="Image">
        </v-col>
        <v-col cols="12" sm="6">
          <h1 class="text-center text-sm-start ">{{ text.title }}</h1>
          <div class="content benefits-softdev__text" v-html="text.content"></div>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();

export default {
  name: "softdev",
  computed: {
    text() {
      const text = this.$store.state.page?.textBenefits;


      if (!text) return null;
      if (text.content) text.content = showdown.makeHtml(text.content);

      let from = text.content.search('<h3');
      let newText;

      if (from === -1) {
        newText = text.content;
      } else {
        newText = text.content.substring(0, from);
      }

      return {
        content: newText,
        title: text.title,
        url: text.url
      };
    }
  }
}
</script>

<style lang="scss">
.benefits-softdev {
  padding: 104px 0 60px;
  @include up($sm) {
    padding: 120px 0 60px 0;
  }

  @include up($md) {
    padding: 170px 0 120px;
  }
  @include up($lg) {
    padding: 200px 0 120px;
  }
  &__title {
    @include up($sm) {
      max-width: 405px;
    }
    @include up($md) {
      max-width: 730px;
    }
  }

  img {
    width: 100%;
    height: auto;
  }
  h1 {
    margin-bottom: 32px;
    @include up($sm) {
      margin-bottom: 40px;
    }

  }
}
</style>