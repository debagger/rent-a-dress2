import Vue from 'vue'
import {Store} from "vuex"
import {DefaultApi} from "../oapi-client-typescript-axios"

declare module 'vue/types/vue' {
    interface Vue {
      $api: DefaultApi;
    }
  }

  declare module 'vuex/types' {
    interface Store<S> {
      $api: DefaultApi;
    }
  }


const hostname = window.location.origin;
console.log("hostname = ", hostname);
const api = new DefaultApi(undefined, hostname);
Vue.prototype.$api = api;
Store.prototype.$api = api;
  