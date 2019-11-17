<template>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:item.action="{ item }">
      <nuxt-link :to="'catalog/'+item.id">
        <v-icon small class="mr-2">mdi-account-edit-outline</v-icon>
      </nuxt-link>
      <!-- <v-icon small @click="deleteItem(item)">mdi-account-off-outline</v-icon> -->
    </template>
    <template v-slot:item.img="{ value }">
        <v-img class="mt-5 mb-5" width="150px" :src="'/img/' + value"></v-img>
    </template>
  </v-data-table>
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
</style>