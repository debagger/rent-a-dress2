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
            </v-form>
          </v-col>
          <v-col cols="4">
            <v-img contain max-height="60vh" :src="`/api/images/${item.img}`"></v-img>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="imgs" key="1">
        <v-container>
          <v-row>
            <v-col cols="2">
              <input
                type="file"
                style="display: none"
                accept="image/jpeg"
                ref="fileinp"
                multiple="multiple"
                @change="fileInputChange"
              />
              <v-card class="ml-1 mr-1" @dragover.prevent @drop="fileDrop" @click="dropzoneClick">
                <v-responsive
                  class="d-flex align-center justify-content-center text-center"
                  aspect-ratio="0.8"
                >
                  <v-icon large>mdi-tray-plus</v-icon>
                </v-responsive>
                <v-card-subtitle>Dropzone</v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="2" v-for="image in images" :key="image.id">
              <v-card class="ml-1 mr-1">
                <v-img
                  :src="`/api/images/${image.id}`"
                  aspect-ratio="0.8"
                  v-on:click="showImage(image)"
                ></v-img>
                <v-card-actions>
                  <v-btn small icon v-on:click.stop="deleteImage(image)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn small icon v-on:click.stop="setCoverImage(image)">
                    <v-icon v-if="item.img==image.id">mdi-check-box-outline</v-icon>
                    <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="showImageDialog.show">
      <v-img
        :src="showImageDialog.src"
        :contain="showImageDialog.contain"
        :height="showImageDialog.height"
        v-on:click="imageClick"
      ></v-img>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { PropOptions } from "vue";
import { CatalogItem, Image } from "oapi-client-typescript-axios";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
interface DropEvent extends Event {
  dataTransfer: DataTransfer;
}
@Component({ components: {} })
export default class itemEditor extends Vue {
  @Prop() item: CatalogItem;

  @Watch("item") async onItemChange(
    oldItem: CatalogItem,
    newItem: CatalogItem
  ) {
    this.images = <Image[]>[];
    this.tab = "data";
    const result = await this.$api.getImagesForCatalogItem(this.item.id);
    console.log(result.data);
    this.images = result.data;
  }

  public showImageDialog = {
    show: false,
    src: "",
    contain: true,
    height: "80vh"
  };

  public tab = "data";
  public loading = false;
  public dialog = false;
  public images = <Image[]>[];

  async fileInputChange(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const fileInputElement = <any>this.$refs["fileinp"];
    const files = fileInputElement.files;
    await this.uploadFiles(files);
  }

  dropzoneClick() {
    (<any>this.$refs["fileinp"]).click();
  }

  imageClick() {
    this.showImageDialog.contain = !this.showImageDialog.contain;
    this.showImageDialog.height = this.showImageDialog.contain ? "80vh" : "";
  }

  showImage(image: Image) {
    this.showImageDialog.src = `/api/images/${image.id}`;
    this.showImageDialog.contain = true;
    this.showImageDialog.height = "80vh";
    this.showImageDialog.show = true;
  }

  setCoverImage(image: Image) {
    this.item.img = `${image.id}`;
  }

  async uploadFiles(files: FileList) {
    const itemId = this.item.id;
    const fd = new FormData();

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);
      fd.append("files", file, file.name);
    }

    fd.append("itemId", `${itemId}`);
    const result = await this.$axios.post("/api/images/upload", fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    this.images.push(...result.data);
  }

  async fileDrop(e: DropEvent) {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    await this.uploadFiles(files);
  }

  async deleteImage(image: Image) {
    await this.$api.deleteImage(image.id);
    const imgIndex = this.images.findIndex(item => item.id === image.id);
    this.images.splice(imgIndex, 1);
  }
}
</script>

<style>
</style>