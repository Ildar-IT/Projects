<template>
  <div class="layout-top qlean">
    <v-row justify="center">

      <v-col cols="12" md="10" class="mb-12">
        <card class="qlean__intro d-flex flex-column justify-space-between text-center">
          <svgicon class="mx-auto mb-5" width="130" height="130" original name="qlean-logo"/>
          <h1 class="mb-5">Следите за чистотой своих заведений</h1>
          <p class="mx-auto">Напечатайте готовый макет и отслеживайте реакции своих клиентов в личном кабинете
            совершенно бесплатно</p>
        </card>
      </v-col>

      <v-col cols="12" sm="8" md="6" class="mb-16">
        <h3 class="text-center mb-5">Готовый шаблон для печати</h3>
        <card class="qlean__template d-flex flex-column justify-space-between text-center">
          <div class="qlean__template-img mb-7 mx-auto">
            <img src="../assets/qlean-template.png" alt="Template">
            <img :src="poll.QRHASH_IMAGE" alt="Qr">
          </div>

          <v-btn block small class="secondary qlean__btn mx-auto" @click="openModal()">
            Скачать
          </v-btn>
        </card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import {crossDownload} from "@/utils/utils";

export default {
  name: "qlean",
  data() {
    return {

      currentTypeCode: "CARD"
    }
  },
  computed: {
    poll() {
      return this.$store.state?.page?.QleanController.item;
    },
    style() {
      return this.$store.state?.page?.QleanController.style;
    },
  },
  methods: {
    openModal() {

      if (this.poll) {
        this.download(this.currentTypeCode, this.poll.QRHASH, this.style.ID)
      }
    },
    download(type, hash, styleID) {
      console.log("type", type)
      let params = '?hash=' + hash + '&type=' + type + "&styleId=" + styleID;
      console.log(hash, type, styleID)

      const url = "/api/DownloadTemplateController" + params;
      console.log(url)
      const filename = 'Qritic.ru-макет' + hash + '-' + type + '.tif';
      crossDownload(url, filename)
    },
  }
}
</script>

<style lang="scss">
.qlean {
  &__intro {
    border-radius: 32px;
    padding: 40px 12px;
    @include up($sm) {
      padding: 40px 80px;
    }
    @include up($md) {
      padding: 40px 100px;
    }

    p {
      max-width: 450px;

    }
  }

  h3 {
    color: $blue-light;
  }

  &__template {
    padding: 35px 0;

    &-img {
      max-width: 345px;
      max-height: 476px;
      @include up($sm) {
        width: 345px;
        height: 476px;
      }

      position: relative;

      img {
        &:nth-child(1) {
          width: 100%;
          height: 100%;
          filter: drop-shadow(2px 4px 14px rgba(8, 136, 164, 0.25));
        }

        &:nth-child(2) {
          position: absolute;
          top: calc(50% + 10px);
          left: calc(50% - 2px);;
          transform: translate(-50%, -50%);
          width: 130px;
          height: 130px;
          @include up($sm) {
            width: 150px;
            height: 150px;
          }
        }
      }
    }


  }

  &__btn {
    width: 128px !important;
    min-width: auto !important;
  }

}
</style>
