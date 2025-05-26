import './assets/tailwind.css';
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { logger } from './services/loggerService';

const app = createApp(App)

app.provide('logger', logger);

app.use(createPinia())
app.use(router)

app.mount('#app')
