import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en from './languages/en.json'
import fr from './languages/fr.json'

import './theme/styles.scss'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { en, fr },
  modifiers: {},
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
