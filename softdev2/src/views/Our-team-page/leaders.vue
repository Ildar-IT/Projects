<template>
  <section class="leaders">
    <v-container>
      <h2>Softdev leaders</h2>
      <v-row>
        <v-col cols="12" sm="6" md="4"
               class="leaders__item"
               v-for="item in items" :key="item.name">
          <img class="d-block mx-auto mb-8 mb-md-6" :src="item.img" alt="Image">
          <h4 >
             {{item.name}}
            <span class="mt-sm-1 d-block">{{item.descr}}</span>
          </h4>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "leaders",
  data() {
    return {
      items:[
        {img: require('../../assets/Our-team-page/1.jpg'), name:'Sergey Presnyak', descr:'CEO & Director General'},
        {img: require('../../assets/Our-team-page/2.jpg'), name:'Robert Fox', descr:'Chief Revenue Officer'},
        {img: require('../../assets/Our-team-page/3.jpg'), name:'Leslie Alexander', descr:'President of Sales'},
        {img: require('../../assets/Our-team-page/4.jpg'), name:'Guy Hawkins', descr:'Head of Operations'},
        {img: require('../../assets/Our-team-page/5.jpg'), name:'Jerome Bell', descr:'General Council'},
        {img: require('../../assets/Our-team-page/6.jpg'), name:'Dmitry Ivanov', descr:'Chief Privacy Officer'},
        {img: require('../../assets/Our-team-page/7.jpg'), name:'Devon Lane', descr:'Head of Finance'},
        {img: require('../../assets/Our-team-page/8.jpg'), name:'Savannah Nguyen', descr:'Marketing Coordinator'},

      ]
    }
  }
}
</script>

<style lang="scss">
.leaders {
  h2 {
    margin-bottom: 52px;
    @include up($sm) {
      margin-bottom: 60px;
    }
    @include up($md) {
      margin-bottom: 70px;
    }
  }

  &__item {
    margin-bottom: 68px;
    @include up($sm) {
      margin-bottom: 60px;
    }
    @include up($md) {
      margin-bottom: 70px;
    }
    @include up($lg) {
      margin-bottom: 85px;
    }
  }

  img {
    width: 100%;
    height: auto;
  }

  h4 {
    span {
      text-transform: capitalize;
      font-size: 12px;
      line-height: 18px;
      @include up($sm) {
        font-size: 13px;
        line-height: 19.5px;
      }
    }
  }
}
</style>