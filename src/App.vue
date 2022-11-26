<template>
    <HomeView @logout="logout" v-if="store.loggedIn && store.currentView == 'home'"/>
    <LoginView @login="login" v-else/>
</template>

<script>

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'

import { store } from './store.js'

function isImgUrl(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

export default {
  name: 'App',
  components: {
    HomeView: HomeView,
    LoginView: LoginView,
  },
  data() {
    return {
      store
    }
  },
  mounted() {
    let user = localStorage.getItem('user')
    if (user != "undefined" && user != null && user != "null") {
      store.user = JSON.parse(user)
      store.loggedIn = true
    } else {
      store.loggedIn = false
    }
  },
  methods: {
    login(data) {
      store.user = data
      store.loggedIn = true
      let picture = data.picture
      isImgUrl(picture).then((res) => {
        if (!res) {
          store.user.picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
      })
      localStorage.setItem('user', JSON.stringify(store.user))
      store.currentView = 'home'
    },
    logout() {
      store.user = null
      store.loggedIn = false
      localStorage.removeItem('user')
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
