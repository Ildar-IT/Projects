<template>
  <v-form class="review" ref="form">

    <h2 class="pb-4">
      Есть, что добавить?
    </h2>
    <div class="pb-8 body-2 text-center">
      Мы будем признательны за любую обратную связь.
    </div>
    <div class="secondary-text">
      <v-textarea class="secondary-text"
                  outlined
                  name="input-7-4"
                  auto-grow
                  rows="1"
                  placeholder="Ваш комментарий"
                  label=""
                  :value="review"
                  v-model="review"
                  :rules="commentRules"
      ></v-textarea>
    </div>

    <div class="flex-center mb-8">
      <v-btn @click="onSubmit(review)">
        <svgicon class="mr-4" name="mail" :fill="false" width="24" color="white"/>
        Отправить
      </v-btn>
    </div>
    <div class="flex-center">
      <div class="button-text" @click="onCancel">
        Нет, спасибо
      </div>
    </div>
    <v-dialog
        v-model="isError"
        max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span>Что-то пошло не так...</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          К сожалению, сейчас не получилось принять ваш ответ. Пожалуйста, попробуйте ещё раз. <br/>
          <i>{{ error }}</i>
        </v-card-text>
        <v-card-actions class="flex-center">
          <v-btn
              @click="error = null"
          >
            Ок
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  name: "review",
  data: () => ({
    review: '',
    error: null,
    //Rules для проверки, что комментарий не пустой и длинее двух символов
    commentRules: [
      v => v.length >= 2 || 'Ну пожалуйста, напишите нам хотя бы пару букв...'
    ]
  }),
  computed: {
    page() {
      return this.$store.state.page.ReviewController;
    },
    isError() {
      return !!this.error;
    }
  },
  methods: {
    onSubmit(review) {
      let params = {
        hash: this.$route.params.hash,
        comments: review,
        //pollId: this.page.poll.ID,
      };
      //Проверяем соблюдены ли rules
      if (this.$refs.form.validate()) {
        //Переход на следующую страницу
        this.$store.dispatch('post', {
          action: 'ReviewCommentsController',
          params
        }).then(() => {
          this.$router.push({name: 'review-finish'});
        }).catch((error) => {
          this.error = error ? error : 'Всё плохо!';
        });

      }
    },
    onCancel() {
      this.$router.push({name: 'feedback'});
    }
  }
}
</script>

<style lang="scss">
.review {

}
</style>