<template>
    <div class="polls layout-top">
      <template  v-if="polls">
        <h1 class="margin-bottom-main">Ваши опросы</h1>

        <template v-for="poll in polls">
            <poll-card :poll="poll"/>
        </template>

          <div class="margin-bottom-main margin-top-main" v-if="page.maxPollsWarning">
              <h4 class="margin-bottom-small text-center">Часть ваших опросов скрыта</h4>
              <p class="text-center padding-bottom-small mt-8">Пожалуйста, выберите тариф соответствующий количеству ваших опросов. Всего у вас {{ textCountPolls }} </p>
              <div class="flex-center">
                  <v-btn class="primary box-shadow-primary mx-auto" @click="goToTarrifs">
                      <span>Тарифы</span>
                  </v-btn>
              </div>
          </div>

      </template >
      <template  v-else>
          <h1>Ваши опросы</h1>
           <p class="text-center mt-10">У Вас пока не создан ни один опрос.</p>
            <div class="flex-center mt-10">
                <v-btn large class="primary" @click="addPoll">
                    <span>Создать опрос</span>
                </v-btn>
            </div>
      </template >
        <v-btn v-if="isWindowLG" class="primary box-shadow-primary btn-fixed-big" @click="addPoll">
            <svgicon name="plus-circle" width="24" height="24" color="white" class="mr-2" :fill="false"/>
            <span>Создать опрос</span>
        </v-btn>
        <v-btn v-else @click="addPoll" fab class="primary btn-fixed-small box-shadow-primary">
            <svgicon name="plus-circle" width="24" height="24" color="white" :fill="false"/>
        </v-btn>
    </div>
</template>

<script>
    import PollCard from "./elements/poll-card";
    import {end} from "@/utils/string";
    export default {
        name: "polls",
        components: {PollCard},
        computed: {
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            textCountPolls() {
                return this.page.maxPollsWarning + " " + end(this.page.maxPollsWarning, "опрос", "опроса", "опросов");
            },
            page() {
                return this.$store.state.page.PollListController;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            polls() {
                return this.page.items;
            },
            pollsQty() {
                return this.page.items?.length || 0;
            },
            ownPollsQty() {
                return this.page.items?.filter(el => el.USER == this.user.ID).length
            },
            maxPollsQty() {
                return this.$store.getters.tariff?.MAX_POLLS;
            },
            user() {
                return this.$store.state.session.user;
            }
        },
        methods: {
            addPoll() {
                console.log("this.maxPollsQty: ", this.maxPollsQty);
                console.log("this.pollsQty: ", this.pollsQty);
                if (this.maxPollsQty && this.ownPollsQty >= this.maxPollsQty || !this.maxPollsQty) {
                    this.$store.state.common.premiumPopUpDialog = true;
                    return;
                }
                this.$router.push({name: 'poll-page-new'});
            },
            goToTarrifs() {
                this.$router.push({name: 'tariffs'});
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .polls {

    }
</style>
