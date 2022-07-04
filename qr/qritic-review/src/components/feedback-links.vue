<template>
  <div class="d-flex flex-column align-center">

    <div class="feedback-links mb-0  d-flex flex-column">
      <h4 class="mb-12">
        Благодарим за высокую оценку! Мы будем рады, если вы оставите отзыв о нас:
      </h4>

      <link-feedback v-for="(link, name) in reviewLinks" :key="'fl_'+name"
                     :link="link" :name="name"/>

    </div>
  </div>
</template>

<script>
import LinkFeedback from "./elements/link-feedback"

export default {
  name: "feedback-links",
  data: () => ({
    error: null,

  }),
  components: {LinkFeedback},
  computed: {
    reviewLinks() {
      return [
        {
          label: "GoogleMaps",
          name: "GoogleMaps",
          icon: "googleMaps",
        },
        {
          label: "Tripadvisor",
          name: "Tripadvisor",
          icon: "tripadvisor",
        },
        {
          label: "Yandex Maps",
          name: "YandexMaps",
          icon: "yandex_logo",
        },
        {
          label: "2GIS",
          name: "2gis",
          icon: "2gis",
        },
      ]
    },
    page() {
      return this.$store.state.currentPage;
    },
    isError() {
      return !!this.error;
    },
    isWindowMD() {
      return this.$store.getters.isWindowMD
    },
    reviewLinks() {
      return this.page.reviewLinks
    },
    headerTitle() {
      if (this.$route.params?.isPositive > 0) {
        return 'Расскажите нам, что вам не понравилось'
      } else if (this.$route.params?.isPositive == 0) {
        return 'Есть что добавить?';
      }
    }
  },
  methods: {
    onCancel() {
      this.$router.push({name: 'feedback-finish2'});
    },
  }
}
</script>

<style lang="scss">
.feedback-links {

  .text-button {
    color: $secondary;
    font-weight: bold;
    font-size: 17px;
    line-height: 21px;
    height: 50px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }

  &__file-input {
    border-color: rgba(0, 0, 0, 0.42);
    border-style: solid;
    border-width: 0 0 thin 0;

  }

  &__contacts {
    max-width: 300px;
  }
}
</style>
