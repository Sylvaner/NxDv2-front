import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { store } from './store'
import router from './router';
import mitt from 'mitt';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const eventBus = mitt();

const app = createApp(App);
app.config.globalProperties.eventBus = eventBus;
app.use(store)
   .use(PrimeVue)
   .use(router)
   .mount('#app')
