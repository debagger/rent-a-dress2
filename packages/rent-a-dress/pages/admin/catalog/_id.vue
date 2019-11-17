<template>
<v-content>
    <v-row>
        <v-col>
  <v-form>
    <v-text-field class="mr-4 ml-4" v-model="item.caption" label="Название"></v-text-field>
    <v-text-field class="mr-4 ml-4" v-model="item.price" label="Цена"></v-text-field>
    <v-text-field class="mr-4 ml-4" v-model="item.details.desc" label="Описание"></v-text-field>
  </v-form>
  </v-col>
  <v-col><v-img max-width="50vw" :src="'/img/' + item.img"></v-img></v-col>
    </v-row>
</v-content>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ $axios, route }) {
      const data=await $axios.$get(`/api/catalog/item/${route.params.id}`);
    return { item: data };
  }
};
</script>

<style>
</style>