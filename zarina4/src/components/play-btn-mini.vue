<template>
  <div class="play-btn-mini">
    <div class="play-btn-mini__circle2">
      <svgicon name="play"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'play-btn-mini',
        props: []
    }
</script>

<style scoped lang="scss">
    .play-btn-mini {
        //cursor: pointer;

        &__circle2 {
            width: 100%;
            height: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        svg {
            position: absolute;
            left: 50%; /* % of surrounding element */
            top: 50%;
            transform: translate(-50%, -50%); /* % of current element */
            width: 5.76px;
            height: 5.76px;
            fill: $white-color;
            margin-left: 1px;
        }

        &:hover {
            .play-btn__circle1 {
                border: 1px dashed rgba(255, 255, 255, 0.0);
            }
            .play-btn__circle2 {
                width: 60px;
                height: 60px;
                border: 1px solid rgba(255, 255, 255, 1);
            }

        }
    }
</style>
