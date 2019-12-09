import Vue from 'vue'
import {DefaultApi} from "../oapi-client-typescript-axios"

declare module 'vue/types/vue' {
    interface Vue {
      $api: DefaultApi;
    }
  }
const hostname = window.location.origin;
const api = new DefaultApi(undefined, hostname);
Vue.prototype.$api = api;
  