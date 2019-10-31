<template>
  <section>
    <SfProductCard
      :title="img"
      :image="`https://localhost/assets/items/${img}`"
      v-for="(img, i) in imgs"
      :regular-price="'1000 руб'"
      :max-rating="5"
      :score-rating="5"
      :key="i"
    />
    <!-- <SfProductCard
          :title="img"
          :image="'assets/items/'"
          :regular-price="'product.price.regular'"
          :max-rating="5"
          :score-rating="5"
          :is-on-wishlist="false"
          class="product-card"
    />-->
  </section>
</template>

<script>
import { SfSection, SfCarousel, SfProductCard } from "@storefront-ui/vue";
import axios from "axios";

export default {
  name: "Catalog",
  components: { SfSection, SfCarousel, SfProductCard },
  data: function() {
    return { imgs: [] };
  },
  methods: {},
  mounted() {
    axios.get("https://localhost/items").then(response => {
      const d = JSON.parse(response.data);
      console.log(d);
      this.imgs = d;
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
}
</style>