<template>
    <div class="nav mainColor">
        <h1 class="logo" @click="store.currentView = 'home'">TaskApp</h1>
        <div class="navButtons">
            <img :src="store.user.picture" alt="user" @click="showUserDropdown" v-if="store.user"/>
            <DropDown v-if="this.showDropdown" :elements="dropdownElements" @selected="selectedDropdown"/>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js'
import DropDown from './DropDown.vue'


export default {
    name: 'NavBar',
    components : {
        DropDown: DropDown
    },
    data() {
        return {
            showDropdown: false,
            dropdownElements: [
                {
                    title: 'Profile',
                    action: 'profile'
                },
                {
                    title: 'Settings',
                    action: 'settings'
                },
                {
                    title: 'Logout',
                    action: 'logout'
                },
            ],
            store
        }
    },
    methods: {
        logout() {
            this.$emit('logout')
        },
        showUserDropdown() {
            this.showDropdown = !this.showDropdown
        },
        selectedDropdown(action) {
            switch(action) {
                case 'profile':
                    store.currentView = 'profile'
                    break
                case 'settings':
                    store.currentView = 'settings'
                    break
                case 'logout':
                    this.logout()
                    break
            }
        }
    }
}
</script>

<style>
    .nav {
        width: 100vw;
        height: 10%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid gray;
    }

    .logo {
        color: black;
        font-size: 7vw;
        margin-left: 5vw;
        font-weight: 700;
    }

    .logo:hover {
        cursor: pointer;
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

    .navButtons img {
        width: 7.5vh;
        height: 7.5vh;
        border-radius: 50%;
        margin-right: 1rem;
        cursor: pointer;
    }
</style>