import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/routers';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(Buefy);

var mixin = {
  methods: {
    addressShortener: function (str) {
      return str.slice(0,6) + "..." + str.slice(-4);
    }
  }
}

new Vue({
  store,
  router,
  mixins: [mixin],
  render: h => h(App),
}).$mount('#app');
