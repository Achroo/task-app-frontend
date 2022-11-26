<template>
    <div>
        <NavBar @logout="logout"/>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: 'HomeView',
    components: {
        NavBar: NavBar
    },
    methods: {
        logout() {
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>