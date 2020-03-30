import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'

//les composants de l'admin NBD
import './globalComponents'

//le router
import router from './router'
//vuex et la BDD
import store from './db/store'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
