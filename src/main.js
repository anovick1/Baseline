import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import './styles/App.css'
import { VueCsvImportPlugin } from 'vue-csv-import'
import gAuthPlugin from 'vue3-google-oauth2'
let gauthClientId = process.env.VUE_APP_gauthClientId

createApp(App)
  .use(router)
  .use(VueCsvImportPlugin)
  .use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent'
  })
  .mount('#app')
