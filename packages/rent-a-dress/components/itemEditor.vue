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
              <v-img class="ml-1 mr-1" :src="`/api/images/${image.id}`" max-width="100px"></v-img>
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
    // upload: function() {
    //   this.loading = true;
    //   const formData = new FormData();
    //   formData.append("itemId", this.item.id);
    //   for (var i = 0; i < this.filesToUpload.length; i++) {
    //     let file = this.filesToUpload[i];
    //     formData.append( i, file);
    //   }
    //   this.$axios
    //     .$post("/api/images/upload", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       }
    //     })
    //     .then(function(result) {
    //       console.log(result);
    //       this.loading = false;
    //       this.dialog = false;
    //       this.item.details.otherImgs.push(...result.result);
    //     }.bind(this))
    //     .catch(function(err) {
    //       this.loading = false;
    //       console.error(err);
    //     }.bind(this));
    // }
  }
});
</script>

<style>
</style>