<template>
<div>
  
</div>
</template>


<script>
    export default {
        name: 'add-photo-field',
        props: ['card'],
        data() {
            return {
                imagePreview: null,
            }
        },
        methods: {
            loadFile() {
                console.log('loadFile')
                this.file = this.$refs.fileInput.files[0];
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                     //this.imagePreview = reader.result;
                   // this.card.DETAIL_PICTURE = reader.result;
                    
                }.bind(this), false);

                if (this.file) {
                    if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
                        reader.readAsDataURL(this.file);
                    }
                }
                this.$emit('imageUpload', this.file)
            }
        }
    }
</script>

<style lang="scss">
    .add-photo-field {
        &__photo {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            position: relative;
            &_dashed{
                border: 2px dashed $beige1;
            }
        }

        &__avatar {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            background-size: cover;
            background-position: center;
        }

        &__download {
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            border-radius: 100%;
            cursor: pointer;
            opacity: 0;
            z-index: 3;
            position: absolute;
            left: 0;
            top:0;

        }
    }
</style>
