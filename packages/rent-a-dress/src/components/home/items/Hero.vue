<template>
<section>
  <SfHero>
    <SfHeroItem
        :title="'hero.title'"
        :subtitle="'hero.subtitle'"
        :buttonText="'hero.buttonText'"
        :background="'hero.background'"
        :image="'assets/bannerA.jpg'"
      ></SfHeroItem>
  </SfHero>
</section>
</template>

<script>
import {SfHero} from "@storefront-ui/vue";
export default {
name: "HeroSection",
components: {SfHero}
}
</script>

<style>

</style>