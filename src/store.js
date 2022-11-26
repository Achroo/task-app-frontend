import { reactive } from 'vue'

export const store = reactive({
    tasks: [],
    user: {},
    loggedIn: false,
    currentView: "login"
})