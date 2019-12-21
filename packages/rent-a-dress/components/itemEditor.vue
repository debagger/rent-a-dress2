<template>
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
      <!-- <v-slide-group>
        <v-slide-item v-for="(img, i) in item.details.otherImgs" :key="i">
          <v-img max-height="200px" max-width="100px" :src="'/img/' + img"></v-img>
        </v-slide-item>
        <v-slide-item>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-form ref="imgform">
                        <v-file-input
                          multiple
                          :loading="loading"
                          v-model="filesToUpload"
                          label="Изображение"
                        ></v-file-input>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="upload">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-slide-item>
      </v-slide-group> -->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { CatalogItem } from "oapi-client-typescript-axios";
export default Vue.extend({
  data() {
    return {
      filesToUpload: [],
      loading: false,
      dialog: false
    };
  },
  props: { item: <PropOptions<CatalogItem>>{ type: Object } },
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