<template>
  <section v-if="items"  class="benefits-section">
    <v-container>
      <v-row justify="">
        <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item.title">
          <div class="mb-8 mb-md-10 text-center text-sm-start" v-html="item.title"></div>
          <div class="content" v-html="item.descr"></div>
        </v-col>
        <v-col cols="12" md="4" class="d-none d-md-flex justify-center" >
          <img  src="@/assets/Benefits/Rocket.jpg" alt="Rocket">
        </v-col>
      </v-row>


    </v-container>
  </section>
</template>

<script>
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();
export default {
  name: "benefits-section",
  data() {
    return {
/*      items: [
        {
          title: 'Improve quality of software development',
          descr: 'We provide highly-skilled engineers with wide range of experience.  By having quality assurance team and technical support services, we ensure the quality of products.'
        },
        {
          title: 'Stay ahead of competition',
          descr: 'By optimizing our customers’ costs and resources SoftDev allows its customers to develop highly competitive products. We ensure confidentiality and security of your ideas and source code.'
        },
        {
          title: 'Significantly lower development expenses',
          descr: 'Competitive rates and absence of over-head expenses such as employment taxes, employment benefits, cost of training, office and equipment expenses are proved to be essential to save costs.'
        },
        {
          title: 'Optimize resources and save time',
          descr: 'Because we do all the leg-work - finding, hiring and managing - you can focus on your other business objectives.'
        },
        {
          title: 'Make sure their products stay abreast of new technologies',
          descr: 'SoftDev stays on top of new developments in high-tech and Internet industries and incorporates the knowledge into its work.'
        },
      ]*/
    }
  },
  computed: {
    items() {
      const text = this.$store.state.page?.textBenefits;
      if (!text) return null;
      if (text.content) text.content = showdown.makeHtml(text.content);

      //Удаляем не нужную часть
      let from = text.content.search('<h3');
      let newText;
      if (from === -1) {
       return null;
      } else {
        newText = text.content.substring(from, text.content.length);
      }


      const itemsLength = newText.match(/<h3/g).length;

      const items = []

      for (let i = 1; i <= itemsLength; i++) {
        // Получаем h3 и вырезаем
        let titleIndex = newText.search('</h3>') + 5;
        let titleText = newText.substring(0, titleIndex);
        newText = newText.substring(titleIndex, newText.length);

        // Получаем p и вырезаем
        let contentIndex = newText.search('<h3');
        let contentText;
        if (contentIndex === -1) {
          contentText = newText;
        } else {
          contentText = newText.substring(0, contentIndex);
          newText = newText.substring(contentIndex, newText.length);
        }


        items.push({
          title: titleText,
          descr: contentText
        });
      }


      return items;
    }
  }

}
</script>

<style lang="scss">
.benefits-section {
  .container {
    position: relative;


    .col-12 {
      margin-bottom: 40px;

      @include up($md) {
        margin-bottom: 80px;
      }
    }
  }
  img {
    max-width: 400px;
    max-height: 400px;
  }

}
</style>