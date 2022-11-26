<template>
    <div class="background">
        <div class="login">
            <h1>Login</h1>
            <form @submit="login">
                <input type="text" placeholder="Username" v-model="username"/>
                <input type="password" placeholder="Password" v-model="password"/>
                <button type="submit">Login</button>
            </form> 
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
                store
            }
        },
        methods: {
            login(e) {
                e.preventDefault()
                fetch('http://37.187.134.126:3000/user/getUser', {
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
                    this.$emit('login', data)
                })
            }
        }
    }
</script>

<style>
    .login {
        width: 300px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 5px;
        background-color: #e67e22;
        border-radius: 5px;
    }

    .login input {
        width: 70%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .login button {
        width: 70%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        border: none;
        background-color: #3498db;
        color: #fff;
    }

    .login button:hover {
        background-color: #d35400;
    }

    h1 {
        text-align: center;
        color: white;
    }

</style>