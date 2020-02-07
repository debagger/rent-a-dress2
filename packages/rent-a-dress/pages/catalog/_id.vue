<template>
  <v-container>
    <v-row class="d-sm-flex d-md-none">
      <v-col cols="12">
        <v-carousel height="100vh" hide-delimiters show-arrows-on-hover>
          <v-carousel-item v-for="image in images" :key="image.id">
            <v-img :src="`/api/images/${image.id}`"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-md-block" cols="1" sticky-container>
        <div v-sticky sticky-z-index="1">
          <v-row v-for="image in images" :key="image.id" :id="`thumb${image.id}`">
            <v-col class="pl-5 pb-1 pt-1">
              <v-card :to="`#${image.id}`">
                <v-img :src="`/api/images/thumbs/${image.id}`"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="d-none d-md-block" xl="8" lg="6" md="5">
        <v-row>
          <v-col
            md="12"
            lg="6"
            v-for="image in images"
            :key="image.id"
            :id="image.id"
            v-intersect="onIntersect"
          >
            <v-img :src="`/api/images/${image.id}`"></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col xl="3" lg="5" md="6" sm="12" sticky-container>
        <div v-sticky sticky-z-index="1" v-if="item">
          <h1>{{item.caption}}</h1>
          <h2>{{item.price}} р.</h2>
          <div v-html="description"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import itemEditor from "~/components/itemEditor.vue";
import { CatalogItem, Image } from "~/oapi-client-typescript-axios";
import { Component, Vue } from "nuxt-property-decorator";
import { timingSafeEqual } from "crypto";
const marked = require("marked");

@Component({ components: { itemEditor } })
export default class Index extends Vue {
  get items() {
    return this.$accessor.catalog;
  }
  get item() {
    return this.$accessor.getCatalogItem(this.id);
  }
  public get id() {
    return Number(this.$route.params.id);
  }

  public get description() {
    const res = marked(this.item.desc, { breaks: true });
    return res;
  }
  public images: Image[] = [];

  public onIntersect(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserverInit
  ) {
    // for (let index = 0; index < entries.length; index++) {
    //   const element = entries[index];
    //   if (element.isIntersecting) {
    //     const thumbId = `thumb${element.target.id}`;
    //     const el = document.getElementById(thumbId);
    //     console.log(el);
    //     el.scrollIntoView();
    //     break;
    //   }
    // }
  }
  public onScroll(e: Event) {
    //this.thumbsElement.scrollTo(0, window.scrollY);
  }

  public created() {}

  public destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }
  private thumbsElement: Element;

  public async mounted() {
    await this.$accessor.fetchCatalog();
    const result = await this.$api.getImagesForCatalogItem(this.id);
    this.images = result.data;
    this.thumbsElement = <Element>this.$refs["thumbs"];
    window.addEventListener("scroll", this.onScroll);
  }
}
</script>

<style>
.left {
  width: 10vw;
}

.center {
  width: 90vw;
  margin-left: 10vw;
}
</style>
