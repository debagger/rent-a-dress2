import Vue from 'vue'
// import {DefaultApi, ApiClient} from "../oapi-client/src/index"
// const client = new ApiClient();
// client.basePath = "https://localhost"
// const api = new DefaultApi(client);
// Vue.prototype.$api = api;

import {DefaultApi} from "../oapi-client-typescript-axios"


declare module 'vue/types/vue' {
    interface Vue {
      $api: DefaultApi;
    }
  }
  
const api = new DefaultApi(undefined, "https://localhost");
Vue.prototype.$api = api;
  