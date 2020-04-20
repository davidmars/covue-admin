import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'

//les composants de l'admin NBD
import './global-imports'

//le router
import router from './router'
//vuex et la BDD
import store from './db/store'
import CurrentUser from "@/CurrentUser";

Vue.config.productionTip = false;




//Project metas TODO externaliser
let projectMetas={
  "title":"Séquence Prévention",
  "subTitle":"Roady",
};
/**
 *
 * @type {{subTitle: string, title: string}}
 */
Vue.prototype.$projectMetas = projectMetas;

//User TODO dynamiser
/**
 * L'utilisateur courrament connecté
 * @type {CurrentUser}
 */
Vue.prototype.$currentUser = new CurrentUser("d.marsalone@gmail.com","david");


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
