<template>
    <div class="polls layout-top">
      <template  v-if="polls">
        <h1 class="margin-bottom-main">Ваши опросы</h1>
        <template v-for="poll in polls">
            <poll-card :poll="poll"/>
        </template>
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

    export default {
        name: "polls",
        components: {PollCard},
        computed: {
            isWindowXL() {
                return this.$store.getters.isWindowXL;
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
