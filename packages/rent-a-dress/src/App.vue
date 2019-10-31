<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import "@storefront-ui/vue/styles.scss";
import  Home from "./components/home/home";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style lang="scss">
</style>