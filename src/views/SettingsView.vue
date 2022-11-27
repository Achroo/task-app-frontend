<template>
    <div>
        <NavBar @logout="logout"/>
        <div class="settingsBody">
            <h1 class="settingsHeader">Settings</h1>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: 'SettingsView',
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
    .settingsBody {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 17%;
    }
    .settingsHeader {
        color: black;
        font-size: 2rem;
        text-align: center;
    }

</style>