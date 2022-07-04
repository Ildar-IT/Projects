<template>
  <div class="poll-page-new layout-top mb-8">
    <h1 class="margin-bottom-main">
      {{ isEditPage ? "Редактирование опроса #" + poll.ID : "Создание опроса" }}
    </h1>

    <v-form @submit.prevent="submit">
      <v-row class="margin-bottom-small py-0">
        <v-col cols="12" class="py-0">
          <v-textarea
            label="Название опроса"
            placeholder="Дарим промокод за честные ответы"
            auto-grow
            outlined
            rows="1"
            v-model="poll.NAME"
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- <v-row class="margin-bottom-small py-0">
              <v-col cols="12" class="py-0">
                <v-textarea
                    label="Пояснение к опросу"
                    placeholder="Спасибо за визит к нам в ресторан. Пожалуйста, ответьте на несколько вопросов."
                    auto-grow
                    outlined
                    rows="1"
                    v-model="poll.PREVIEW_TEXT"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row class="margin-bottom-main py-0">
              <v-col cols="12" sm="4" class="py-0">
                <v-textarea
                    label="Текст на кнопке старта"
                    placeholder="Поехали!"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="poll.BTN_LABEL"
                ></v-textarea>
              </v-col>
            </v-row> -->

      <!--			Avatar logo -->
        <div class="flex flex-column align-center justify-center margin-bottom-main">
            <template v-if="imagePreview">
                <div class="poll-page-new__logo__image" ref="settingsLogoImage" id="settingsLogoImage"
                     :style="{ 'backgroundImage': 'url(' + imagePreview + ')' }">
                </div>

                <input @change="onLogoFileChange" class="poll-page-new__logo__input"
                       name="file" type="file" ref="fileInput"
                       accept=".jpg, .jpeg, .png, .gif">

                <div class="flex mt-3 poll-page-new__delete" @click="deleteImageModal()">
					<span class="mr-3 ">
						Удалить фото
					</span>
                    <svgicon name="trash_full" class="" :fill="false"
                             width="24" height="24"
                    />
                </div>

            </template>
            <div v-else class="poll-page-new__logo">
                <div class="poll-page-new__logo__text">
                    <div class="text-center">
                        <svgicon class="" name="upload" :fill="false" width="32" color="#B145F3"/>
                    </div>
                    <div class="text-center">
                        Загрузите ваш логотип
                    </div>
                </div>

                <input @change="onLogoFileChange" class="poll-page-new__logo__input"
                       name="file" type="file" ref="fileInput"
                       accept=".jpg, .jpeg, .png, .gif">
            </div>
        </div>
       <h4
        class="margin-bottom-small gray-text"
        :class="isWindowLG ? 'text-center' : ''"
      >
        Срок жизни опроса
      </h4>

      <v-row class="margin-bottom-small py-0">
        <v-col cols="12" class="py-0">
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
      </v-row>

      <h4
        class="margin-bottom-small gray-text"
        :class="isWindowLG ? 'text-center' : ''"
      >
        Вопросы
      </h4>

      <draggable
        class="list-group"
        :list="poll.questions"
        group="questions"
        handle=".handle"
        @start="dragging = true"
        @end="dragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <div
            class="list-group-item margin-bottom-main"
            v-for="(question, index) in poll.questions"
            :key="'q' + index"
          >
            <card>
              <div class="flex justify-space-between align-center mb-8">
                <span class="flex align-center">
                  <!-- <svgicon name="drag-dots"
                                              original
                                              class="handle mr-3"
                                              width="24"
                                              :class="dragging? 'handle&#45;&#45;dragging':'handle&#45;&#45;drag' "/>-->
                  <span class="h6 gray-text">
                    #{{ index + 1 }}
                    {{ question.ID ? "ID: " + question.ID : "" }}
                  </span>
                </span>

                <svgicon
                  class="poll-page-new__delete"
                  name="trash-3"
                  original
                  width="24"
                  height="24"
                  @click="deleteQuestionModal(question)"
                />
              </div>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="Текст вопроса"
                    placeholder="Как Вы оцениваете наш сервис?"
                    auto-grow
                    outlined
                    rows="1"                   
                    v-model="question.NAME"
                  ></v-textarea>
                </v-col>
                <!--<v-col cols="12" lg="6">
                                  <v-textarea
                                      placeholder="Подзаголовок"
                                      auto-grow
                                      outlined
                                      rows="1"
                                      v-model="question.TEXT"
                                  ></v-textarea>
                                </v-col>-->
              </v-row>

              <div class="poll-page-new__smile-wrap">
                <v-row>
                  <v-col  cols="6"  sm="3" lg="3"  v-for="type of questionTypes" :key="type.type"
                    class="pb-0" >
                    <card :small="true"
                      class="poll-page-new__smile-card"
                      @click="setType(question, type)"
                      :class="type.type === question.TYPE ? 'poll-page-new__smile-card--selected' : '' " >
                      <div class="h7 mb-4">
                        {{ type.name }}
                      </div>
                      <svgicon :name="type.icon" width="32" original />
                    </card>
                  </v-col>
                </v-row>
              </div>

              <div class="margin-top-main" v-if="question.TYPE === 'SELECT'">
                <div v-for="(option, idx) in question.OPTIONS" :key="idx">
                  <v-textarea
                    :placeholder="`Вариант ответа ` + (idx + 1)"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="question.OPTIONS[idx].NAME"
                  ></v-textarea>
                </div>

                <card
                  :small="true"
                  :hoverable="true"
                  class="margin-top-small poll-page-new__add"
                  @click="addAnswer(question)"
                >
                  <div class="h7 flex-center align-center">
                    <svgicon
                      name="plus-circle"
                      :fill="false"
                      width="24"
                      color="#B145F3"
                    />
                    <span class="ml-4">Добавить вариант ответа</span>
                  </div>
                </card>
              </div>

              <v-row class="mt-8" v-else-if="question.TYPE === 'SMILE'">   
                <v-col  cols="12"  lg="4">            
                  <v-textarea
                    class="mb-8"
                    placeholder="Хорошо"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="question.CAPTIONS[0].NAME"
                  ></v-textarea>
                  </v-col> 
                <v-col  cols="12"  lg="4"> 
                  <v-textarea
                    class="mb-8"
                    placeholder="Нормально"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="question.CAPTIONS[1].NAME"
                  ></v-textarea>
                </v-col>
                <v-col  cols="12"  lg="4"> 
                  <v-textarea
                    class="mb-8"
                    placeholder="Плохо"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="question.CAPTIONS[2].NAME"
                  ></v-textarea>  
                </v-col>                           
              </v-row>

            </card>
          </div>
        </transition-group>
      </draggable>

      <card
        :hoverable="true"
        class="margin-bottom-main poll-page-new__add"
        @click="addQuestion"
      >
        <h6 class="flex-center align-center">
          <svgicon
            name="plus-circle"
            :fill="false"
            width="24"
            color="#B145F3"
          />
          <span class="ml-4">Добавить вопрос</span>
        </h6>
      </card>

      <!--<h4 class="margin-bottom-main gray-text" :class="isWindowLG? 'text-center' : ''">
              Реакция на пройденный опрос
            </h4>
            <v-row class="margin-bottom-main py-0">
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea :class="isWindowLG? '' : 'mb-6'"
                      placeholder="Заголовок"
                      auto-grow
                      outlined
                      rows="1"
                      v-model="poll.reactionPoll.NAME"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea
                    placeholder="Подзаголовок"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="poll.reactionPoll.TEXT"
                ></v-textarea>
              </v-col>
            </v-row>-->

      <h4
        class="margin-bottom-small gray-text"
        :class="isWindowLG ? 'text-center' : ''"
      >
        Подарок за пройденный опрос
      </h4>
      <v-row class="margin-bottom-small py-0">
        <v-col cols="12" class="py-0">
          <v-textarea
            label="Промокод или секретное слово"
            placeholder="Промокод: ВЕСНА"
            auto-grow
            outlined
            rows="1"
            v-model="poll.COUPON"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="margin-bottom-main py-0">
        <v-col cols="12" class="py-0">
          <v-textarea
            label="Пояснение к подарку"
            placeholder="Сообщите этот промокод при следующем заказе и получите скидку 10%"
            auto-grow
            outlined
            rows="1"
            v-model="poll.COUPON_TEXT"
          ></v-textarea>
        </v-col>
      </v-row>

      <!--<h4 class="margin-bottom-main gray-text" :class="isWindowLG? 'text-center' : ''">
              Текстовый отзыв
            </h4>
            <v-row class="margin-bottom-main py-0">
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea :class="isWindowLG? '' : 'mb-6'"
                      placeholder="Заголовок"
                      auto-grow
                      outlined
                      rows="1"
                      v-model="poll.review.NAME"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea
                    placeholder="Подзаголовок"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="poll.review.TEXT"
                ></v-textarea>
              </v-col>
            </v-row>-->

      <!--<h4 class="margin-bottom-main gray-text" :class="isWindowLG? 'text-center' : ''">
              Реакция на текстовый отзыв
            </h4>

            <v-row v-if="false" class="margin-bottom-main py-0">
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea :class="isWindowLG? '' : 'mb-6'"
                      placeholder="Заголовок"
                      auto-grow
                      outlined
                      rows="1"
                      v-model="poll.reactionReview.NAME"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="6" class="py-0">
                <v-textarea
                    placeholder="Подзаголовок"
                    auto-grow
                    outlined
                    rows="1"
                    v-model="poll.reactionReview.TEXT"
                ></v-textarea>
              </v-col>
            </v-row>

            <h4 class="margin-bottom-main gray-text" :class="isWindowLG? 'text-center' : ''">
              Уведомления об ответах
            </h4>
            <div class="margin-bottom-main block-max-width">
              <v-text-field class="margin-bottom-main"
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      label="E-mail"
              ></v-text-field>
              <v-btn large class="primary margin-bottom-small " @click="save">
                <svgicon name="save" width="24" color="white" class="mr-2" :fill="false"/>
                <span>Сохранить</span>
              </v-btn>
              <v-btn text large class="" color="error">
                Удалить
              </v-btn>
            </div>-->

      <div
        v-if="!isEditPage"
        class="body-1 margin-bottom-small text-center"
        :class="isWindowLG ? 'text-center' : ''"
      >
        После создания опроса Вы получите уникальный QR-код, ведущий на его
        страницу.
      </div>

      <div class="flex-center">
        <v-btn type="submit" large class="primary">
          <svgicon
            name="save"
            width="24"
            color="white"
            class="mr-5"
            :fill="false"
          />
          <span>{{ isEditPage ? "Сохранить" : "Создать" }}</span>
        </v-btn>
      </div>
      <div class="flex-center poll-page-new__delete mt-16" v-if="isEditPage">
        <v-btn
          @click="deletePollModal"
          class="v-btn v-btn--flat v-btn--text v-size--large primary--text"
        >
          Удалить опрос
        </v-btn>
      </div>

      <v-btn v-if="isWindowLG" class="primary btn-fixed-big" @click="submit">
        <svgicon
          name="save"
          width="24"
          color="white"
          class="mr-2"
          :fill="false"
        />
        <span>Сохранить</span>
      </v-btn>

      <v-btn v-else @click="submit" fab class="primary btn-fixed-small">
        <svgicon name="save" width="24" color="white" :fill="false" />
      </v-btn>
    </v-form>

    <transition name="fade" mode="out-in">
      <div v-if="requestStatus" class="poll-page-new__alert">
        <v-alert dense :type="requestStatus">
          {{ message }}
        </v-alert>
      </div>
    </transition>

    <v-dialog
      v-model="dialog"
      persistent
      class="poll-page-new__dialog"
      overlay-opacity="0.5"
      overlay-color="#8189A8"
      max-width="500"
    >
      <card>
        <div class="d-flex flex-column pa-md-8">
          <div class="mb-8 d-flex align-center justify-center">
            <img src="@/assets/Question.png" />
          </div>
          <div class="h5 text-center pb-8">
            Вы уверены, что хотите удалить вопрос?
          </div>
          <div class="d-flex flex-column align-center block-max-width">
            <v-btn block class="primary mb-4"  @click="deleteQuestion">  Да </v-btn>
            <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0" @click="closeModal"> Нет </v-btn>
          </div>
        </div>
      </card>
    </v-dialog>

    <v-dialog
      v-model="dialogPoll"
      persistent
      class="poll-page-new__dialog"
      overlay-opacity="0.5"
      overlay-color="#8189A8"
      max-width="500"
    >
      <card>
        <div class="d-flex flex-column pa-md-8">
          <div class="mb-8 d-flex align-center justify-center">
            <img src="@/assets/Question.png" />
          </div>
          <div class="h5 text-center pb-8">
            Вы уверены, что хотите удалить опрос?
          </div>
          <div  class="d-flex flex-column align-center block-max-width">
              <v-btn block class="primary mb-4"  @click="closeModalPoll"> Нет </v-btn>
              <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0" text color="error" @click="deletePoll"> Удалить </v-btn>
          </div>
        </div>
      </card>
    </v-dialog>

    <v-dialog  
      overlay-opacity="0.5"
      overlay-color="#8189A8"
      v-model="dialogPollPublished"
      persistent
      class="vcard-edit-create__dialog"
      max-width="500"
    >
      <card>
        <div class="d-flex flex-column pa-md-8">
            <div class="mb-8 d-flex align-center justify-center">
              <img src="@/assets/Question.png" />
            </div>
          <div class="h5 text-center pb-4">
           Ранее, Вы приобретали физическую копию QR-кода этого опроса. После удаления опроса, QR-код будет не действителен.
          </div>
          <div class="body-1  mb-8">
              Вы дейстительно хотите удалить опрос?
          </div>
           <div class="d-flex flex-column align-center block-max-width">
              <v-btn block class="primary mb-4"  @click="closeModalPoll"> Нет </v-btn>
              <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0" text color="error" @click="deletePoll"> Удалить </v-btn>
          </div>
        </div>
      </card>
    </v-dialog>

    <!--    Модальное окно, которое появляется при удалении логотипа -->
    <v-dialog  
      overlay-opacity="0.5"
      overlay-color="#8189A8"
      v-model="dialogDelFile"
      persistent
      class="settings__dialog"
      max-width="500"
    >
      <card>
        <div class="d-flex flex-column pa-md-8">
          <div class="mb-8 d-flex align-center justify-center">
            <img src="@/assets/Question.png" />
          </div>
        <div class="h5 text-center pb-8">
          Вы уверены, что хотите удалить фотографию?
        </div>
        <div class="d-flex flex-column align-center block-max-width">
          <v-btn block class="primary mb-4" @click="deleteImage"> Да </v-btn>
          <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0"  @click="closeDialogDelFile">  Нет  </v-btn>
        </div>
        </div>
      </card>
    </v-dialog>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import QrCard from "./elements/qr-card";
import LinkCard from "./elements/link-card";

export default {
  name: "poll-page-new",
  components: { LinkCard, QrCard, draggable },
  data: () => ({
    counter: 0,
    dragging: false,
    requestStatus: null,
    message: "",
    email: "",
    dialog: false,
    dialogPoll: false,
    dialogMaxQuestions: false,
    file: null,
    imagePreview: null,
    dialogDelFile: false,
    dialogPollPublished: false,

    questionToDelete: null,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    //todo придумать как сделать draggable с computed

    newPoll: {
      NAME: "",
      PREVIEW_TEXT: "",
      BTN_LABEL: "",
      questions: [],
      COUPON: "",
      COUPON_TEXT: "",
    },
  }),
  computed: {
    user() {
      let user = this.$store.state.session.user;
      if (!user.UF_SOCIALS || typeof user.UF_SOCIALS !== "object")
        user.UF_SOCIALS = {};
      return user;
    },
    page() {
      return this.$store.state.page.PollItemController;
    },
    poll() {
      if (this.isEditPage) {
        if (!this.page.item) return {};
        if (!this.page.item.questions) this.page.item.questions = [];
        return this.page.item;
      } else {
        return this.newPoll;
      }
    },
    pollsQty() {
      return this.$store.state.session.user.pollsQty;
    },
    maxPollsQty() {
      return this.$store.getters.tariff?.MAX_POLLS;
    },
    maxQuestionQty() {
      return this.$store.getters.tariff?.MAX_QUESTIONS;
    },
    isEditPage() {
      return !!this.$route.params.hash;
    },
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isWindowXL() {
      return this.$store.getters.isWindowXL;
    },
    questionTypes() {
      return [
        {
          type: "LIKE",
          name: "Лайки",
          icon: "question-like",
        },
        {
          type: "SMILE",
          name: "Смайлы",
          icon: "question-smile",
        },
        {
          type: "STARS",
          name: "Звёзды",
          icon: "question-star",
        },
        {
          type: "SELECT",
          name: "Меню",
          icon: "question-menu",
        },
      ];
    },
    countQuestions() {
      return this.poll.questions.length;
    },
  },
  methods: {
    submit() {

      // Используем formData чтобы сделать upload файла
      let formData = new FormData();
      
      //валидация, что у всех опросов есть имена 
      if(this.poll.questions.some(el => el.NAME == "")) {
          this.$store.state.alert = {
                  type: "error",
                  text: "Напишите текст вопроса",
            } 
            return      
          };
         if(this.poll.questions.some(el => el.TYPE == "SMILE" )) {
          this.$store.state.alert = {
                  type: "error",
                  text: "Напишите текст вопроса",
            } 
            return      
          };
      if (this.file) {
        console.log(this.file);
        formData.append("DETAIL_PICTURE", this.file);
      } else {
        console.log("No File attached");
        //console.log(this.vCard.DETAIL_PICTURE);
       // formData.append("DETAIL_PICTURE", this.vCard.DETAIL_PICTURE);
      }
      formData.append("withoutDetailPicture", this.withoutDetailPicture);

      Object.keys(this.poll).forEach((key) => {  
          //console.log("KEY!: " , key );     
          if(key === 'questions') {
            // append nested object           
              formData.append(`questions`, JSON.stringify( this.poll[key]));
           
          }
        else if (key == "DETAIL_PICTURE") {
          console.warn("Skipped");
          return;
        } else {
          formData.append(key, this.poll[key] === null ? "" : this.poll[key]);
        }
      });
      this.$store
        .dispatch("post", {
          action: "PollItemController",
          params: formData,
        })
        .then((res) => {
          this.$store.state.alert = {
            type: "success",
            text: "Опрос успешно сохранен!",
          };
          this.$router.push({
            name: "poll-page",
            params: { hash: res.page?.PollItemController?.item?.QRHASH },
            query: { new: !this.isEditPage },
          });
        })
        .catch((error) => {
          console.error(error);
          this.$store.state.alert = {
            type: "error",
            text: "Что-то пошло не так :( Попробуйте еще раз.",
          };
        });
    },
    deletePoll() {
      this.dialogPoll = false;
      let hash = this.poll.QRHASH;

      this.$store
        .dispatch("post", {
          action: "RemovePollController",
          params: { hash },
        })
        .then((res) => {
          this.$store.state.alert = {
            type: "success",
            text: "Опрос удален!",
          };
          this.$router.push({
            name: "polls",
          });
        })
        .catch((error) => {
          console.error(error);
          this.$store.state.alert = {
            type: "error",
            text: "Что-то пошло не так :( Попробуйте еще раз.",
          };
        });
    },
    deletePollModal() {
       if(this.poll?.QRHASH_IS_PUBLISHED) this.dialogPollPublished = true;
      this.dialogPoll = true;
      // this.questionToDelete = question
    },
    setAvatarLogoImage() {
      let avatarLogoImage = document.getElementById("avatarLogoImage");
      // let avatarLogoImage = this.$refs.avatarLogoImage;
      if (avatarLogoImage) {
        let rect = avatarLogoImage.getBoundingClientRect();
        this.imageSize = {
          width: rect.width,
          height: rect.height,
        };
      }
      return this.imageSize;
    },
    deleteImageModal() {
      this.dialogDelFile = true;
    },
    deleteImage() {
      this.withoutDetailPicture = true;
      if (this.isEditPage) {
        console.log("RemoveVCardPictureController");
        this.$store
          .dispatch("post", {
            action: "RemoveVCardPictureController",
            params: { hash: this.poll.QRHASH },
          })
          .then(() => {
            this.dialog = false;
            this.imagePreview = null;
            this.poll.DETAIL_PICTURE = null;
            this.dialogDelFile = false;
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      this.dialog = false;
      this.imagePreview = null;
      this.poll.DETAIL_PICTURE = null;
      this.dialogDelFile = false;
    },
    onLogoFileChange() {
    this.file = this.$refs.fileInput.files[0];
    if (this.file) {
      // ставим картинку превью
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.imagePreview = reader.result;
        },
        false
      );
      if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
        reader.readAsDataURL(this.file);
      }
    }
    },
    closeDialogDelFile() {
    this.dialogDelFile = false;
    },
    setType(question, type) {    
    if (type.type == "SMILE") {
      question.CAPTIONS = new Array(3);
      console.log("question.CAPTIONS", question.CAPTIONS)              
          question.CAPTIONS[0] = { NAME: "Отлично" , answerStats: [] }
          question.CAPTIONS[1] = { NAME: "Хорошо" , answerStats: [] }
          question.CAPTIONS[2] = { NAME: "Плохо" , answerStats: [] }
          console.log("question", question)        
      }  
      for (let q of this.poll.questions) {      
        if (this.isEditPage) {
          if (q.ID && q.ID === question.ID) q.TYPE = type.type;
          else if (q.idx && q.idx === question.idx)  {
            q.TYPE = type.type;
          }
        } else if (q.idx === question.idx) {
          q.TYPE = type.type;         
        } 
      }
    },
    addQuestion() {
      if (this.maxQuestionQty && this.countQuestions >= this.maxQuestionQty) {
        this.$store.state.common.premiumPopUpDialog = true;
        return;
      }
      this.counter++;
      this.poll.questions.push({
        ID: null,
        NAME: "",
        PREVIEW_TEXT: "",
        TYPE: "LIKE",
        OPTIONS: [{ NAME: "", answerStats: [] }],
        idx: this.counter,
      });
    },
    addAnswer(question) {
      let idx;
      if (this.isEditPage) {
        idx = this.poll.questions.findIndex((q) => q.ID === question.ID);
      } else idx = this.poll.questions.findIndex((q) => q.idx === question.idx);
      if (this.poll.questions[idx].OPTIONS === false)
        this.poll.questions[idx].OPTIONS = [];
      this.poll.questions[idx].OPTIONS.push({ NAME: "", answerStats: [] });
    },
    deleteQuestion() {
      this.dialog = false;
      let question = this.questionToDelete;
      let index;
      this.counter--;
      if (this.isEditPage) {
        if (question.ID) {
          index = this.poll.questions.findIndex((q) => q.ID === question.ID);
          console.log("delete index", index);
        } else
          index = this.poll.questions.findIndex((q) => q.idx === question.idx);
      } else
        index = this.poll.questions.findIndex((q) => q.idx === question.idx);
      this.poll.questions.splice(index, 1);
      this.questionToDelete = null;
    },
    closeModal() {
      this.dialog = false;
      this.questionToDelete = null;
    },
    closeModalPoll() {
      this.dialogPoll = false;
      this.dialogPollPublished = false;
    },
    deleteQuestionModal(question) {
      this.dialog = true;
      this.questionToDelete = question;
    },
  },
  created() {
    this.counter = this.poll.questions.length + 1;
    if (this.isEditPage) {
      this.imagePreview = this.poll.DETAIL_PICTURE;
    } else {      
      if (this.user.WORK_LOGO) {
        this.imagePreview = this.user.WORK_LOGO;
        this.setAvatarLogoImage();
      }
    }
    this.poll.NAME = this.poll.NAME.replaceAll('&quot;', '"' )
    let captionsQuestion = this.poll.questions.filter(el => el.TYPE == "SMILE"); 
    captionsQuestion = captionsQuestion.map( question => {
      if(!question.CAPTIONS || question.CAPTIONS.length < 2 ) {
         question.CAPTIONS = new Array(3);                   
            question.CAPTIONS[0] = { NAME: "Отлично" , answerStats: [] }
            question.CAPTIONS[1] = { NAME: "Хорошо" , answerStats: [] }
            question.CAPTIONS[2] = { NAME: "Плохо" , answerStats: [] }                 
        }
    })
  },
};
</script>

<style lang="scss">
#account-app {
  .v-dialog {
    box-shadow: none;
  }

  .poll-page-new {
    .v-dialog {
      box-shadow: none;
    }

    &__dialog {
      box-shadow: none;
    }
    
  &__logo {
      border: 2px dashed $primary;
      box-sizing: border-box;
      max-width: 296px;
      width: 100%;
      height: 128px;
      border-radius: 32px;
      cursor: pointer;
      color: $primary;
      position: relative;

      &__input {
          box-sizing: border-box;
          max-width: 296px;
          width: 100%;
          height: 128px;
          border-radius: 32px;
          cursor: pointer;
          opacity: 0;
          z-index: 2;
          position: absolute;
      }

      &__text {
          max-width: 296px;
          padding: 0 16px;
          width: 100%;
          height: 128px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
      }

      &__image {
          border-radius: 32px;
          max-width: 296px;
          width: 100%;
          height: 128px;
          background-size: contain;
          background-position: center;
          background-origin: border-box;

          &__wrap {
              /*max-width: 100%;*/
              height: 100%;
              border-radius: 32px;
              margin-right: auto;
              margin-left: auto;
              max-width: 296px;
              width: 100%;
              background-size: contain;
              background-position: center;
              background-origin: border-box;
              background-color: red;
          }
      }
  }

    &__alert {
      position: fixed;
      z-index: 5;
      width: 100%;
      right: 0;
      top: 35%;
      display: flex;
      justify-content: center;
      justify-items: center;

      .v-sheet.v-alert:not(.v-sheet--outlined) {
        box-shadow: $box-shadow;
      }

      .v-alert {
        border-radius: 1000px;
      }
    }

    &__delete {
      cursor: pointer;
    }

    &__add {
      cursor: pointer;
    }

    &__premium-alert {
      border: 4px solid $red1;
    }

    &__smile-wrap {
      max-width: 232px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      @include up($sm) {
        max-width: 500px;
      }
    }

    &__smile-card {
      width: 100px;
      height: 100px;
      @include transition();

      &:hover {
        cursor: pointer;
        background: $secondary;
        color: $primary;
      }

      &--selected {
        background: $primary;
        color: white;

        &:hover {
          cursor: pointer;
          background: $primary-hover;
          color: white;
        }
      }
    }
  }

  .handle {
    cursor: grab;

    &--dragging {
      cursor: grabbing;
    }

    &--drag {
      cursor: grab;
    }
  }
}
</style>
