<template>
  <v-content>
    <v-row>
      <v-col class="text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <v-btn v-on:click.stop="addNewCatalogItem()">Добавить</v-btn>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.action="{ item }">
            <div class="text-center d-flex">
              <v-btn icon v-on:click.stop="edit(item)">
                <v-icon>mdi-playlist-edit</v-icon>
              </v-btn>
              <v-btn icon v-on:click.stop="deleteItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.img="{ value }">
            <v-img class="mt-2 mb-2" width="120px" :src="`/api/images/${value}`"></v-img>
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
import itemEditor from "~/components/itemEditor.vue";
import { CatalogItem } from "~/oapi-client-typescript-axios";
import { Component, Vue } from "nuxt-property-decorator";

@Component({ components: { itemEditor } })
export default class Index extends Vue {
  public dialog = false;

  public dialogItem: CatalogItem = <CatalogItem>{
    id: -1,
    caption: "",
    desc: "",
    img: ""
  };

  public headers = [
    { text: "id", value: "id" },
    { text: "Изображение", value: "img" },
    { text: "Название", value: "caption" },
    { text: "Цена", value: "price" },
    { text: "Описание", value: "desc" },
    { text: "Actions", value: "action", sortable: false }
  ];

  get items() {
    return this.$accessor.catalog;
  }

  public addNewCatalogItem() {
    this.dialogItem = <CatalogItem>{
      id: -1,
      caption: "",
      desc: "",
      img: ""
    };
    this.dialog = true;
  }
  public edit(item: CatalogItem) {
    this.dialogItem = Object.assign({}, item);
    this.dialog = true;
  }
  public deleteItem(item: CatalogItem) {
    this.$accessor.deleteCatalogItem(item.id);
  }

  public async save() {
    if (this.items.find(item => item.id === this.dialogItem.id)) {
      await this.$accessor.updateCatalogItem(this.dialogItem);
    } else {
      await this.$accessor.newCatalogItem(this.dialogItem);
    }
    this.dialog = false;
  }
  public async asyncData() {}
  public async mounted() {
    await this.$accessor.fetchCatalog();
  }
}
</script>

<style>
</style>>
