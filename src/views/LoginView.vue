<template>
    <div class="loginBackground">
        <div class="mainColor login">
            <div v-if="store.currentView == 'login'">
                <h1 class="loginh1">Login</h1>
                <form @submit="login">
                    <input type="text" placeholder="Username" v-model="username"/>
                    <input type="password" placeholder="Password" v-model="password"/>
                    <button class="secondaryColor" type="submit">Login</button>
                </form>
                <button class="secondaryColor" @click="store.currentView = 'signup'; this.error=''">Sign Up</button>
                <h2 class="loginh2" v-if="error">{{ error }}</h2>
            </div>
            <div v-if="store.currentView == 'signup'">
                <h1 class="loginh1">Sign Up</h1>
                <form @submit="signup">
                    <input type="text" placeholder="Username" v-model="username"/>
                    <input type="password" placeholder="Password" v-model="password"/>
                    <input type="text" placeholder="Profile Picture (URL)" v-model="picture"/>
                    <button class="secondaryColor" type="submit">Sign Up</button>
                </form>
                <button class="secondaryColor" @click="store.currentView = 'login'; this.error=''">Go Back</button>
                <h2 class="loginh2" v-if="error">{{ error }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../store.js'

    export default {
        name: 'LoginView',
        data() {
            return {
                username: '',
                password: '',
                picture: '',
                error: "",
                store
            }
        },
        methods: {
            login(e) {
                e.preventDefault()
                fetch('http://127.0.0.1:3000/user/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        this.error = data.message
                    } else {
                        this.$emit('login', data)
                    }
                })
            },
            signup(e) {
                e.preventDefault()
                fetch('http://127.0.0.1:3000/user/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        picture: this.picture
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        this.error = data.message
                        this.login(e)
                    }
                })
            }
        },
        mounted () {
            if (!store.loggedIn || store.currentView == 'login') {
                store.currentView = 'login'
            }
        }
    }
</script>

<style>
    .loginBackground {
        background-color: #2c3e50;
    }
    .login {
        width: 100%;
        height: 100vh;
        border-radius: 5px;
        text-align: center;
    }

    .login input {
        width: 70%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .login button {
        width: 70%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: none;
        color: #fff;
    }

    .loginh1 {
        text-align: center;
        color: black;
        margin-top: 0;
        padding-top: 5vh
    }

    .loginh2 {
        text-align: center;
        margin-bottom: 0.5rem;
    }

</style>