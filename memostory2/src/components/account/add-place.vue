<template>
    <div class="add-memory-place text-center margin-top-main px-4 pb-0 pb-lg-15">
        <h2 class="beige-text mb-md-8 mb-4">{{ pageContent.titleEmpty ? pageContent.titleEmpty : "Добавление места захоронения" }}</h2>
        <p class="body-1 grey-text mb-md-16 mb-8">{{ pageContent.subTitleEmpty ? pageContent.subTitleEmpty : "Пожалуйста, введите данные о месте, где захоронен близкий Вам человек. Мы идентифицируем локацию и сможем проявлять нашу заботу о нем."}}</p>

        <v-row>
            <v-col cols="12" lg="6" class="mx-auto">

                <stepperAddPlace/>

            </v-col>
        </v-row>
    </div>
</template>

<script>
    import stepperAddPlace from "@/components/elements/account-elements/stepper-add-place"

    export default {
        name: 'add-memory-place',
        components: {stepperAddPlace},
        data() {
            return {
                dialog: false,
            }
        },
        computed: {
            pageContent() {
                return this.$store.state.page.PlaceItemController?.texts.content ? this.$store.state.page.PlaceItemController?.texts.content : this.$store.state.page.ReportListController?.texts.content ? this.$store.state.page.ReportListController?.texts.content : {}
            },
        }

    }
</script>

<style lang="scss">
    .add-memory-place {
        position: relative;
    }

</style>
