import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap/dist/js/bootstrap.min";

createApp(App).use(store).use(router).mount('#app')
app.use(VueAxios, axios)