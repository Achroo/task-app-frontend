<template>
    <div class="secondaryColor" id="popup">
        <div class="popupHeader">
            <h1 class="popupTitle"> {{ title }}</h1>
            <button class="popupCloseButton" @click="buttonClicked"> ✖ </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PopUp',
        props: {
            title: String,
        },
        methods: {
            buttonClicked(button) {
                this.$emit('buttonClicked', button)
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.$el.style.width = this.width
                this.$el.style.height = this.height
            })
        }
    }
</script>
<style>
    
</style>