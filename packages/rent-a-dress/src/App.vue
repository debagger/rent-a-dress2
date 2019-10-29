<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import "@storefront-ui/vue/styles.scss";
import  Home  from "./home.vue";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style lang="scss">
</style>