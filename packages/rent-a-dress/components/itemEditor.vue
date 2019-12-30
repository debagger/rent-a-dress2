<template>
  <div>
    <v-tabs right fixed-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#data">Основные данные</v-tab>
      <v-tab href="#imgs">Изображения</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data" key="0">
        <v-row class="d-flex justify-between">
          <v-col cols="8">
            <v-form>
              <v-text-field class="mr-4 ml-4" v-model="item.id" readonly label="id"></v-text-field>
              <v-text-field class="mr-4 ml-4" v-model="item.caption" label="Название"></v-text-field>
              <v-text-field class="mr-4 ml-4" v-model="item.price" label="Цена"></v-text-field>
              <v-text-field class="mr-4 ml-4" v-model="item.desc" label="Описание"></v-text-field>
              <v-file-input></v-file-input>
            </v-form>
          </v-col>
          <v-col cols="4">
            <v-img contain max-height="60vh" :src="'/img/' + item.img"></v-img>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="imgs" key="1">
        <v-container>
          <v-row>
            <v-col cols="2" v-for="image in images" :key="image.id">
              <v-card class="ml-1 mr-1">
                <v-img :src="`/api/images/${image.id}`" aspect-ratio="0.8"></v-img>
                
                <v-card-actions>
                  <v-btn v-on:click="deleteImage(image)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { CatalogItem, Image } from "oapi-client-typescript-axios";
export default Vue.extend({
  data() {
    return {
      tab: null,
      filesToUpload: [],
      loading: false,
      dialog: false,
      images: <Image[]>[]
    };
  },
  props: { item: <PropOptions<CatalogItem>>{ type: Object } },
  watch: {
    item: {
      handler: async function(oldItem, newItem) {
        this.images = <Image[]>[];
        const result = await this.$api.getImagesForCatalogItem(this.item.id);
        console.log(result.data);
        this.images = result.data;
      },
      immediate: true
    }
  },
  methods: {
    async deleteImage(image: Image){
      await this.$api.deleteImage(image.id);
      const imgIndex = this.images.findIndex(item => item.id ===image.id);
      this.images.splice(imgIndex, 1);
    }


  }
});
</script>

<style>
</style>