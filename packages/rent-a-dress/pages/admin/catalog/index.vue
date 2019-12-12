<template>
  <v-content>
    <v-row>
      <v-col class="text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <v-btn to="catalog/new">Добавить</v-btn>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.action="{ item }">
            <div class="text-center">
              <v-btn v-on:click.stop="edit(item)">
                <v-icon small class="mr-2">mdi-account-edit-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.img="{ value }">
            <v-img class="mt-2 mb-2" width="120px" :src="'/img/' + value"></v-img>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="80vw">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{dialogItem.caption}}</v-card-title>
        <v-card-text>
          <itemEditor v-if="dialogItem" :item="dialogItem"></itemEditor>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="save">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import itemEditor from "~/components/itemEditor.vue";
import { CatalogItem } from "~/oapi-client-typescript-axios";

export default Vue.extend({
  components: { itemEditor },
  data() {
    return {
      items: <CatalogItem[]>[],
      dialog: false,
      dialogItem: <CatalogItem>{ id: 0, caption: "", desc: "", img: "" },
      headers: [
        { text: "id", value: "id" },
        { text: "Изображение", value: "img" },
        { text: "Название", value: "caption" },
        { text: "Описание", value: "desc" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  methods: {
    edit(item: CatalogItem) {
      this.dialogItem = Object.assign({}, item);
      this.dialog = true;
    },
    async save() {
      const result = await this.$api.updateCatalogItem(this.dialogItem);
      debugger;
      if (result.status == 200) {
        const updatedItem = result.data;
        const index = this.items.findIndex(item => item.id == updatedItem.id);
        Object.assign(this.items[index], updatedItem);
        this.dialog = false;
      }
    }
  },
  async asyncData() {},
  async mounted() {
    const items = await this.$api.getCatalog();
    this.items = items.data;
  }
});
</script>

<style>
</style>>
