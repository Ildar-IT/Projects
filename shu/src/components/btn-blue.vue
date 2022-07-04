<template>
    <router-link v-if="to" :to="to">
        <div class="btn-blue">
            <slot name="default">

            </slot>
        </div>
    </router-link>
    <a v-else href="javascript:void" @click="$emit('click')">
        <div class="btn-blue">
            <slot name="default">

            </slot>
        </div>
    </a>
</template>

<script>
export default {
    name: 'btn-blue',
    props: ["to"],
}
</script>

<style lang="scss">
.btn-blue {
    padding: 15px 32px;
    background-color: $secondary500;
    color: $white;
    font-size: 18px;
    line-height: 21px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.08);
    border-radius: 999px;
    display: inline-block;
    transition: all 0.2s ease;

    &:hover {
        background-color: $white;
        color: $secondary500;
    }
}
</style>