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
import ConfirmationService from 'primevue/confirmationservice';
import NextDomApi from './services/NextDomApi';

const eventBus = mitt();
NextDomApi.getInstance().connectFromCache(store).then(() => {
   router.beforeEach((to, from, next) => {
      if (store.getters.isConnected()) {
         next();
      } else {
         if (to.name !== 'Login') {
            next('/login');
         } else {
            next();
         }
      }
   });
   
   const app = createApp(App);
   app.config.globalProperties.eventBus = eventBus;
   app.use(store)
      .use(PrimeVue)
      .use(router)
      .use(ConfirmationService)
      .mount('#app')
   
});
