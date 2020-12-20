import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import store from './store';

import Card from 'primevue/card';

import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);

app.component('Card', Card);

app.mount('#app')
