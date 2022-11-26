<template>
    <div class="nav">
        <h1>TaskApp</h1>
        <div class="buttons">
            <img :src="store.user.picture" alt="user" @click="logout" v-if="store.user"/>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js'

export default {
    name: 'NavBar',
    data() {
        return {
            store
        }
    },
    methods: {
        logout() {
            this.$emit('logout')
        }
    }
}
</script>

<style>
    .nav {
        width: 100vw;
        height: 7.5vh;
        background-color: #e67e22;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        color: #fff;
        font-size: 1.5rem;
        margin-left: 1.5rem;
    }

    .nav button {
        margin-right: 1.5rem;
        background-color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
    }

    .nav button:hover {
        background-color: #bdc3c7;
    }

    .buttons img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 1rem;
        cursor: pointer;
    }
</style>