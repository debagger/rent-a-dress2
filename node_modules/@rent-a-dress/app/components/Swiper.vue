<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, i) in imgs" :key="i">
        <v-card class="horisontal-item" flat>
          <v-img :src="img"></v-img>
          <v-card-title>Красивое платье №{{i}}</v-card-title>
          <v-card-subtitle class="pb-0">Это просто замечательно!</v-card-subtitle>
          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Цена: {{1000*i}} руб</div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <!-- <div class="swiper-pagination swiper-pagination-bullets"></div> -->
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  props: ["imgs"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 5,
        freeMode: true,
        // effect: "coverflow",
        // coverflowEffect: {
        //   rotate: 10,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: false
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChange() {
            // console.log("onSlideChangeEnd", this);
          },
          tap() {
            // console.log("onTap", this);
          }
        }
      }
    };
  },
  mounted() {
    // console.log("app init", this);
    // setTimeout(() => {
    //   this.banners.push("img/5.jpg");
    //   console.log("banners update");
    // }, 3000);
    // console.log(
    //   "This is current swiper instance object",
    //   this.mySwiper,
    //   "I will slideTo banners 3"
    // );
    // this.mySwiper.slideTo(3);
  }
});
</script>


<style lang="scss" scoped>
.horisontal-item {
  width: 300px;
  margin: 5px;
}
.my-swiper {
  height: 400px;
  width: 50%;
  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}
</style>