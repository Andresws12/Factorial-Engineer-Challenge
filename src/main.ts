import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import router from './routes/router';
import i18n from './localization';

import './styles/main.scss';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

pinia.use(
  createPersistedState({
    auto: true,
  })
);
app.use(pinia).use(i18n).use(router);
app.mount('#app');
