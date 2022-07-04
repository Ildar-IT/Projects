import Vue from 'vue';

export default new Vue({
    el: "#prerender",
    render: h => h("<div id='#prerender'></div>")
});
