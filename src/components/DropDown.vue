<template>
    <div class="dropdown">
        <button class="dropdownElement"  v-for="(element, index) in elements" v-bind:key="index" @click="emitEvent(element.action)">{{element.title}} </button>
    </div>
</template>

<script>
    export default {    
        name: 'DropDown',
        data() {        
            return {
                show: false,
            }
        },
        props: {
            elements: {
                type: Array,
            }
        },
        methods: {
            toggle() {
                this.show = !this.show
            },
            emitEvent(action) {
                this.$emit('selected', action)
            }
        }
    }
</script>

<style>
    .dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        border: none;
        width: 50vw;
        height: 50vh;
        right: -5vw;
    }

    .dropdownElement {
        background-color: white;
        border-radius: 0px;
        border: none;
        font-size: 300%;
        font-weight: bold;
        background: none;
        padding: 0;
        color: black;
    }

    .dropdownElement:hover {
        cursor: pointer;
    }
</style>