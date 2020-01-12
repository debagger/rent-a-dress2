<template>
  <v-content>
    <v-row>
      <v-col class="text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="$router.back()">Назад</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <itemEditor v-if="item" :item="item"></itemEditor>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col>
        <v-btn color="primary" text @click="save">I accept</v-btn>
      </v-col>
    </v-row>
  </v-content>
</template>

<script lang="ts">
import itemEditor from "~/components/itemEditor.vue";
import { CatalogItem } from "~/oapi-client-typescript-axios";
import { Component, Vue } from "nuxt-property-decorator";

@Component({ components: { itemEditor } })
export default class catalogDetails extends Vue {
  public item:CatalogItem = null; 

  public get id() {
    return Number(this.$route.params.id);
  }

  async mounted() {
    await this.$accessor.fetchCatalogItem(this.id);
    this.item = Object.assign({},this.$accessor.getCatalogItem(this.id));
  }
  async save() {
    await this.$accessor.updateCatalogItem(this.item);
    this.$router.back();
  }
}
</script>

<style>
</style>