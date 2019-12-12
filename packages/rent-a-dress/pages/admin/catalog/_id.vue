<template>
  <v-content>
    <v-row>
      <v-col class="text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <itemEditor v-if="item" :item="item"></itemEditor>
      </v-col>
    </v-row>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import itemEditor from "../../../components/itemEditor.vue";
import { CatalogItem } from "~/oapi-client-typescript-axios";

export default Vue.extend({
  components: { itemEditor },
  data() {
    return { item: <CatalogItem>null };
  },
  async mounted() {
    const result = await this.$api.getCatalogItem(
      Number(this.$route.params.id)
    );
    this.item = result.data;
  }
});
</script>

<style>
</style>