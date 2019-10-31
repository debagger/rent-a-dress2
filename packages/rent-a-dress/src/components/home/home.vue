<template>
  <div>
    <Top />
    <Hero />
    <Catalog />
  </div>
</template>

<script>
import Top from "./items/Top";
import Hero from "./items/Hero";
import Catalog from "./items/Catalog";
export default {
  name: "Home",
  components: { Top, Hero, Catalog }
};
</script>

<style>
</style>