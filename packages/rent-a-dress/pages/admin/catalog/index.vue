<template>
  <v-content>
    <v-row>
      <v-col class=" text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <v-btn to="catalog/new">Добавить</v-btn>
        <v-data-table dark :headers="headers" :items="items">
          <template v-slot:item.action="{ item }">
            <nuxt-link :to="'catalog/'+item.id">
              <v-icon small class="mr-2">mdi-account-edit-outline</v-icon>
            </nuxt-link>
          </template>
          <template v-slot:item.img="{ value }">
            <v-img class="mt-2 mb-2" width="120px" :src="'/img/' + value"></v-img>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "id", value: "id" },
        { text: "Изображение", value: "img" },
        { text: "Название", value: "caption" },
        { text: "Цена", value: "price" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  async asyncData({ $axios }) {
    const ids = await $axios.$get("/api/catalog/items");
    const data = [];
    for (const id of ids) {
      data.push(await $axios.$get(`/api/catalog/item/${id}`));
    }
    return { items: data };
  }
};
</script>

<style>
</style>>
