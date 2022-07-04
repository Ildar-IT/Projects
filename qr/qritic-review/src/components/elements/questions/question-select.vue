<template>
    <div>
        <h2 v-if="question && question.NAME" class="mb-8">{{question.NAME}}</h2>
        <v-form class="question-select"
                ref="form"
                lazy-validation>

            <v-select :items="options"
                      label="Пожалуйста, выберите"
                      v-model="selected"
                      :rules="[v => !!v || 'Необходимо что-то выбрать']"
                      required
            ></v-select>
            <div class="flex-center">
                <v-btn class="mt-4" @click="onSubmit">
                    Отправить
                </v-btn>
            </div>
        </v-form>
    </div>

</template>

<script>
    export default {
        name: "question-select",
        props: ['question'],
        data: () => ({
            selected: null,
            options: []
        }),
        methods: {
            onSubmit() {
                let isValid = this.$refs.form.validate();
                if ( isValid ) this.$emit('click', this.selected);
            }
        },
        created() {
            this.options = this.question?.OPTIONS?.map(el=>el.NAME);
        }
    }
</script>

<style lang="scss">
    .question-select {
        height: 141px;
        max-width: 350px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
</style>