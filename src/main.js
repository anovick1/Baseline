import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import './styles/App.css'
import { VueCsvImportPlugin } from 'vue-csv-import'

createApp(App).use(router).use(VueCsvImportPlugin).mount('#app')
