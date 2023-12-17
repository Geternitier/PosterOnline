import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
