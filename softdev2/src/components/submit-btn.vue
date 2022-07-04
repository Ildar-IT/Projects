<template>
    <button class="submit-btn d-flex align-center" >
        <slot name="default">{{submitTitle}}</slot>
        <svg class="submit-btn__arrow ml-3" width="20" height="12" viewBox="0 0 20 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.7798 2L13.0704 2.70592L16.0798 5.70086H3V6.69923H16.0797L13.0704 9.69408L13.7798 10.4L18 6.2L13.7798 2Z"
                />
        </svg>
    </button>
</template>

<style lang="scss">
.submit-btn {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-family: $primary-font-family !important;
    color: $white !important;
    background-color: $primary-1;
    padding: 15px 40px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.05em;
    justify-content: space-between;
    @include up($sm) {
        //width: 342px;
        font-size: 16px;
        line-height: 22px;
        padding: 15px 40px;
        justify-content: space-between;
        & svg {
            width: 25px;
            height: 14px;
          & path {
            fill: $white;
          }
        }
    }
    @include up($md) {
        height: 70px;
        font-size: 20px;
        line-height: 27px;
        padding: 21px 40px;
        & svg {
            width: 35px;
            height: 35px;
        }
    }
    @include up($lg) {
        //width: 505px;
    }

    &:hover,
    focus {
        background-color: $primary-2;
    }

    &:active {
        background-color: $primary-2;
        color: $secondary-2 !important;

        & svg path {
            fill: $secondary-2;
        }
    }

    &:disabled {
        background-color: $light-grey;
        color: $mid-grey !important;

        & svg path {
            fill: $mid-grey;
        }
    }

}
.disabled {
  cursor: not-allowed;
  pointer-events: none !important;
  background-color: $light-grey;
  color: $mid-grey !important;

  & svg path {
    fill: $mid-grey;
  }
}
</style>

<script>
import Config from "@/config";

export default {
    name: 'submit-btn',

		computed: {
			submitTitle() {
				return this.$store.state.common.email.FormSubmitTitle;
			},
    },
}
</script>
