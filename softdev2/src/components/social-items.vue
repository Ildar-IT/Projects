<template>
  <div class="social-items">
    <a :href="item.content" class="social-items__item" v-for="(item, index) of items">
      <img :src="item.media" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'social-items',
  data() {
    return {
/*      items: [
        /!*{img: require('@/assets/socials/tg.svg')},
        {img: require('@/assets/socials/vkon.svg')},
        {img: require('@/assets/socials/lin.svg')},*!/
        {img: require('@/assets/socials/mail.svg')}
      ]*/
    }
  },
  computed: {
    items() {
      let itemsArr = [];
      let email = this.$store.state.common.email;
      email = {
        content: 'mailto:'+ email.content,
        media: require('@/assets/socials/mail.svg'),
      };
      itemsArr.push(email);

      return itemsArr;
    }
  }

}
</script>

<style lang="scss">
.social-items {
  &__item {
    display: flex;
    align-items: center;
    width: 23px;
    height: 14px;
    @include up($sm) {
      width: 33px;
      height: 20px;

    }

    img {


    }
  }
}

</style>