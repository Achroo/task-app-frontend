<template>
    <div>
        <!-- Navbar -->
        <NavBar @logout="logout"/>

        <!-- Body -->

        <div class="tasksContainer">
            <div class="task mainColor" v-for="(task, index) in store.tasks" v-bind:key="index">
                <div class="taskTitle">
                    <h1 class="taskHeader"> {{task.title}} </h1>
                    <h1 class="taskTime"> {{ task.formattedTime}} </h1>
                </div>
                <p class="taskDescription"> {{task.description}} </p>
                <div class="taskButtons">
                    <div class="leftButtons">
                        <button class="taskCompleteButton secondaryColor" v-if="task.completed == 0" @click="setTaskCompleted(task, true)">Complete</button>
                        <button class="taskCompleteButton secondaryColor taskCompleted" v-if="task.completed == 1" @click="setTaskCompleted(task, false)">Completed</button>
                        <button class="taskDeleteButton secondaryColor" @click="deleteTask(task)">Delete</button>
                    </div>
                    <div class="rightButtons">
                        <button class="taskEditButton secondaryColor" @click="editTask(task)">Edit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit popup -->

        <div class="editPoup mainColor taskPopup" id="taskPopup" v-if="store.currentPopup == 'editTask'" title="Edit task" @buttonClicked="closeButtonClicked">
            <div class="popupHeader">
                <h1 class="popupTitle"> Edit Task</h1>
                <button class="popupCloseButton" @click="closeButtonClicked"> ✖ </button>
            </div>
           <form @submit="submitEdit">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" maxlength="17" v-model="editingTask.title">
                <label for="description">Description</label>
                <input type="text" name="description" id="description" maxlength="30" v-model="editingTask.description">
                <button class="secondaryColor submitButton"> Edit </button>
           </form>
        </div>
        <button class="createButton secondaryColor" @click="createTask">+</button>

        <!-- Create popup -->

        <div class="editPoup mainColor taskPopup" v-if="store.currentPopup == 'createTask'" @buttonClicked="createTask">
            <div class="popupHeader">
                <h1 class="popupTitle"> Create Task</h1>
                <button class="popupCloseButton" @click="closeButtonClicked"> ✖ </button>
            </div>
           <form @submit="submitCreateTask">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" maxlength="15" v-model="creatingTask.title">
                <label for="description">Description</label>
                <input type="text" name="description" id="description" maxlength="30" v-model="creatingTask.description">
                <button class="secondaryColor submitButton"> Create </button>
           </form>
        </div>
x   
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

import { store } from '../store.js'

export default {
    name: 'HomeView',
    components: {
        NavBar: NavBar
    },
    data() {
        return {
            editingTask: {},
            creatingTask: {},
            store
        }
    },
    methods: {
        logout() {
            this.$emit('logout')
        },
        deleteTask(task) {
            fetch('http://127.0.0.1:3000/task/removeTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.store.user.username,
                        password: this.store.user.password
                    },
                    task: task.id
                })
            }).then(res => res.json())
            .then( () => {
                this.fetchTasks()
                this.sortTasks()
            })
        },
        fetchTasks() {
            fetch('http://127.0.0.1:3000/task/getTasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.store.user.username,
                        password: this.store.user.password
                    }
                })
            }).then(res => res.json())
            .then(data => {
                data.forEach(task => {
                    let formattedTime = task.created_at.split('T')[0]
                    task.formattedTime = formattedTime.split('-').reverse().join('-');

                })
                store.tasks = data

                this.sortTasks()
            })
        },
        disableScroll() {
            document.body.classList.add("stopScroll")
        },
        enableScroll() {
            document.body.classList.remove("stopScroll")
        },
        createTask() {
            this.store.currentPopup = "createTask"
            this.disableScroll()
        },
        submitCreateTask(e) {
            e.preventDefault();

            fetch('http://127.0.0.1:3000/task/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.store.user.username,
                    password: this.store.user.password
                },
                title: this.creatingTask.title,
                description: this.creatingTask.description
            })
            }).then(res => res.json())
            .then(data => {
                if (data.message != "Task created") {
                    console.log(data.message)
                } else {
                    this.store.currentPopup = ""

                    this.creatingTask = {}

                    this.fetchTasks()

                    this.enableScroll()
                    this.sortTasks()
                }
            })  
        },
        submitEdit(e) {
            e.preventDefault();

            fetch('http://127.0.0.1:3000/task/editTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.store.user.username,
                    password: this.store.user.password
                },
                task: this.editingTask.id,
                title: this.editingTask.title,
                description: this.editingTask.description
            })
            }).then(res => res.json())
            .then(data => {
                if (data.message != "Task updated") {
                    console.log(data.message)
                } else {
                    this.store.currentPopup = ""
                    this.editingTask = {}

                    this.enableScroll()
                    this.sortTasks()
                }
            })  
        },
        closeButtonClicked() {
            store.currentPopup = ''
            this.enableScroll()
        },
        setTaskCompleted(task, completed) {
            fetch('http://127.0.0.1:3000/task/setCompleted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.store.user.username,
                    password: this.store.user.password
                },
                task: task.id,
                completed: completed
            })
            }).then(res => res.json())
            .then(data => {
                if (data.message != "Task updated") {
                    console.log(data.message)
                } else {
                    task.completed = completed
                    this.sortTasks()
                }
            })
        },
        sortTasks() {
            store.tasks.sort((a, b) => {
                return a.completed - b.completed
            })
            store.tasks.sort((a, b) => {
                if (a.completed == 0) {
                    let aTime = new Date(a.created_at)
                    let bTime = new Date(b.created_at)
                    
                    return bTime - aTime
                }
            })
        },
        editTask(task) {
            store.currentPopup = 'editTask'
            store.currentTask = task
            this.editingTask = task

            this.disableScroll()
        },
    },
    mounted() {
        this.fetchTasks()
        store.currentPopup = ''
    }
}
</script>

<style>
    .tasksContainer {
        margin: 11vh auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;

    }
    .task {
        width: 100%;
        height: 17.5vh;
        margin: 0.5vh 0;
        border-radius: 5px;
        border: 1px solid gray;
    }

    .taskTitle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 10%;
        padding: 0 2%;
        margin-top: 2vh;
        margin-bottom: 2.5vh;
    }

    .taskHeader {
        margin: 0;
        padding: 0;
        font-size: 1.1rem;
        margin-left: 3vw;
        margin-top: 2vh;
        color: black;
    }

    .taskTime {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        margin-right: 2.5vw;
        font-weight: 800;
        margin-top: 2vh;
        color: black;
    }

    .taskDescription {
        margin: 0;
        padding: 0;
        font-size: 0.75rem;
        margin-left: 5vw;
        margin-top: 0.5vh;
        color: black;
    }

    .taskButtons {
        margin-top: 1.5vh;
        margin-left: 5vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }

    .taskCompleteButton {
        font-size: 0.75rem;
        font-weight: bold;
        color: white !important;
        border: none;
        border-radius: 10px;
        width: 22vw;
        height: 5vh;
    }

    .taskDeleteButton {
        font-size: 0.75rem;
        font-weight: bold;
        color: white !important;
        border: none;
        border-radius: 10px;
        width: 18vw;
        height: 5vh;
        margin-left: 1vw;
    }

    .taskEditButton {
        font-size: 0.75rem;
        font-weight: bold;
        color: white !important;
        border: none;
        border-radius: 10px;
        width: 18vw;
        height: 5vh;
        margin-right: 3.5vw;
    }

    .taskCompleted {
        background-color: #075907 !important;
    }

    .editPopup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        background-color: red;
        z-index: 2;
    }

    .editPopup form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .popupHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 10%;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0;
    }

    .popupTitle {
        color: black;
        font-size: 6vw;
        text-align: center;
        margin-top: 6vh;
        margin-left: 5vw;
    }

    .popupCloseButton {
        background-color: white;
        border-radius: 0px;
        border: none;
        font-size: 8vw;
        background: none;
        padding: 0;
        color:black;
        margin-top: 2vh;
        margin-right: 4vw;
    }

    .taskPopup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95vw;
        height: 60vh;
        border-radius: 15px;
        z-index: 2;
        border: 1px solid gray;
    }

    .taskPopup form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10vh;
        width: 100%;
    }

    .taskPopup input {
        width: 70%;
        height: 4vh;
        border-radius: 5px;
        border: none;
        margin-bottom: 2vh;
        padding-left: 2vw;
        font-size: 1rem;
        background-color: #e7e7e9;
        border: 1px solid gray;
    }

    .taskPopup .submitButton {
        width: 50%;
        height: 5.5vh;
        border-radius: 5px;
        border: none;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        margin-top: 2.5vh;
    }

    .taskPopup label {
        font-size: 1.25rem;
        font-weight: bold;
        color: black;
        margin-bottom: 1.25vh;
    }

    .createButton {
        position: fixed;
        bottom: 0vh;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
        font-size: 3rem;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        font-weight: bold;
        color: white !important;
        border: none;
    }

    .stopScroll {
        overflow: hidden;
        height: 100%
    }

</style>