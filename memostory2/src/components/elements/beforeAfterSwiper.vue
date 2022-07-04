<template>
  <!--Swiper-->
  <swiper :options="swiperOptions">

    <!-- Slides Before  -->
    <swiper-slide v-if="getIsShowedBefore(index)" v-for="(img, i) of report.photosBefore" :key="i"
                  :style="{ 'backgroundImage': 'url(' + img.photo + ')' }">

    </swiper-slide>

    <!--Slides After-->
    <swiper-slide v-if="!getIsShowedBefore(index)" v-for="(img, i) of report.photosAfter" :key="i"
                  :style="{ 'backgroundImage': 'url(' + img.photo + ')' }">

    </swiper-slide>

    <!-- Pagination -->
    <div class="swiper-pagination "
         slot="pagination"></div>

  </swiper>
</template>

<script>
import '@/plugins/swiper';

export default {
  name: 'beforeAfterSwiper',
  props: ['report', 'index'],
  data() {
    return {
      isShowedBeforeObj: {updateCounter: 1},

      examples: [
        {
          NAME: "Красненькое кладбище. Тариф «Памятный». Ежемесячная уборка территории с фотоотчётом.",
          extras: [
            {icon: 'clean', name: 'Уборка'},
            {icon: 'flower', name: 'Озеленение территории'},
            {icon: 'repairs', name: 'Восстановительные работы'},
          ],
          photosBefore: [
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
          ],
          photosAfter: [
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
          ]
        },
        {
          NAME: "Новодевичье кладбище. Тариф «Ответственный». Ежемесячная уборка территории с фотоотчётом.",
          extras: [
            {icon: 'clean', name: 'Уборка'},
            {icon: 'flower', name: 'Озеленение территории'},
            {icon: 'repairs', name: 'Восстановительные работы'},
            {icon: 'video-report', name: 'Видеоотчёт'}
          ],
          photosBefore: [
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
          ],
          photosAfter: [
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
          ]
        },
        {
          NAME: "Южное кладбище. Тариф «Любящий». Ежемесячная уборка территории с фотоотчётом.",
          extras: [
            {icon: 'clean', name: 'Уборка', index: 1},
            {icon: 'flower', name: 'Озеленение территории', index: 2},
            // {icon: 'repairs', name: 'Восстановительные работы', index:3},
          ],
          photosBefore: [
            {photo: require("@/assets/images/grave.jpg")},
            {photo: require("@/assets/images/grave.jpg")},
          ],
          photosAfter: [
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
            {photo: require("@/assets/images/landscape.jpg")},
          ]
        },
      ],

      //Swiper
      isMoving: false,
      swiperOptions: {
        keyboard: {
          enabled: true,
        },
        slidesPerView: 'auto',
        preloadImages: false,
        autoHeight: true,
        spaceBetween: 16,
        // effect: 'fade',
        lazy: true,
        pagination: {
          el: '#care-examples-card-swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
      },
    }
  },
  methods: {
    showBefore(index) {
      this.isShowedBeforeObj[index.toString()] = true;
      this.isShowedBeforeObj.updateCounter++;
    },
    showAfter(index) {
      this.isShowedBeforeObj[index.toString()] = false;
      this.isShowedBeforeObj.updateCounter++;
    },
    getIsShowedBefore(index) {
      this.isShowedBeforeObj.updateCounter;
      if (index.toString() in this.isShowedBeforeObj) {
        return this.isShowedBeforeObj[index.toString()]
      }
      this.isShowedBeforeObj[index.toString()] = true;
      this.$set(this.isShowedBeforeObj, index.toString(), true);
      return true;
    }
  }
}
</script>
