<template>
    <div>
        <NavBar @logout="logout"/>
        <div class="profileBody">
            <h1 class="profileHeader">Profile</h1>
            <img class="profilePicture" :src="store.user.picture" alt="">
        </div>
        <h1 class="usernameText">Name: {{store.user.username}}</h1>
        <h1 class="usernameText">Created At: {{getFormatedTime()}}</h1>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

import { store } from '../store.js'

export default {
    name: 'ProfileView',
    components : {
        NavBar: NavBar
    },
    data() {
        return {
            store
        }
    },
    methods: {
        logout() {
            this.$emit('logout')
        },
        getFormatedTime() {
            let date = new Date(this.store.user.created_at)
            return date.toLocaleString().split(',')[0]
        }
    }
}
</script>

<style>
    .profileBody {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 17%;
        margin-bottom: 5%;
    }

    .profilePicture {
        width: 30vw;
        height: 30vw;
        border-radius: 50%;
    }

    .profileHeader {
        color: black;
        font-size: 2rem;
        text-align: center;
    }

    .usernameText {
        font-size: 1.2rem;
        margin-left: 5vw;
        margin-top: 0.5vh;
        margin-bottom: 0;
        color: black;
    }
</style>
