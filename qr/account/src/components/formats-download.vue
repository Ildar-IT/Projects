<template>
    <div class="layout-top journal">
        <h1 class="margin-bottom-main">
           {{currentTypeName}}
        </h1>
        <format-cards :cards="formats" :polls="page.polls" :styles="page.styles" :formats="page.styles" />        
    </div>
</template>

<script>
    import FormatCards from "./elements/format-cards";
    import TemplateBanner from "./elements/template-banner";
    import premiumPopUp from "./elements/premium-pop-up";
    import {end} from "@/utils/string";

    export default {
        name: "formats-download",
        components: {FormatCards, TemplateBanner, premiumPopUp},
        props:  ['type', "poll"],
        computed: {
            page() {
                return this.$store.state.page.TemplateListController;
            },
            cards() {
                return this.$store.state.templateCards
            },
            currentTypeName() {
              return this.currentType.UF_TITLE
            },
            formats() {
              return this.page.formats.filter(el=> el.CODE == this.type )
            },
            currentType() {
                return this.page.items.find(el=> el.CODE == this.type )
            }
        }
    }
</script>

<style scoped>

</style>