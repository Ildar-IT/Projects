<template>
    <div class="layout-top journal">
        <h1 class="margin-bottom-main primary-text">
            Готовые шаблоны с QR-кодом
        </h1>
        <templates-cards :cards="page.items" :polls="page.polls" :styles="page.styles" />
        <template-banner/>
    </div>
</template>

<script>
    import TemplatesCards from "./elements/templates-cards";
    import TemplateBanner from "./elements/template-banner";
    import premiumPopUp from "./elements/premium-pop-up";

    export default {
        name: "templates",
        components: {TemplatesCards, TemplateBanner, premiumPopUp},
        computed: {
            page() {
                return this.$store.state.page.TemplateListController;
            },
            formats() {
                return this.$store.state.page.TemplateListController.formats;
            },
        }
    }
</script>

<style scoped>

</style>
