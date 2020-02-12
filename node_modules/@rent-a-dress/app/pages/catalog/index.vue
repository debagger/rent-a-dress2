<template>
  <v-content>
    <v-row>
      <v-col>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col xl="2" lg="3" md="4" v-for="item in items" :key="item.id">
                <v-card :to="`/catalog/${item.id}`">
                  <v-img :src="`/api/images/${item.img}`"></v-img>
                  <v-card-text>{{item.caption}}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
    </v-row>
  </v-content>
</template>

<script lang="ts">
import itemEditor from "~/components/itemEditor.vue";
import { CatalogItem } from "~/oapi-client-typescript-axios";
import { Component, Vue } from "nuxt-property-decorator";

@Component({ components: { itemEditor } })
export default class Index extends Vue {
  get items() {
    return this.$accessor.catalog;
  }
  public async mounted() {
    await this.$accessor.fetchCatalog();
  }
}
</script>

<style>
</style>>
