<template>
  <v-window :height="'100vh'" v-model="window" style="background: pink">
    <v-window-item v-for="(img, i) in imgs" :key="i" transition="fade-transition">
      <v-img
        :src="img"
        height="100vh"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      ></v-img>
    </v-window-item>
    <v-overlay :absolute="true" z-index="0" opacity="0.1">
      <div
        style="height: 100vh; width:100vw; display: flex; flex-flow: column; justify-content:space-between"
      >
        <div class="mt-5 text-center">
          <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
        </div>
        <div>
          <v-container>
            <v-row justify="center">
              <v-col class="text-center">
                <h1 class="font-weight-light display-1">Прокат модной одежды в Новоуральске</h1>
                <p class="overline font-italic">Мы меняем правила</p>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn
                class="font-weight-thin headline mt-3"
                large
                outlined
                @click="$vuetify.goTo($parent.$refs.details)"
              >Узнать больше</v-btn>
            </v-row>
          </v-container>
        </div>
        <div>
          <v-row align="center">
            <v-col class="ml-12">
              <v-btn icon href="https://api.whatsapp.com/send?phone=79126310700" target="_blank">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>Задайте вопрос
            </v-col>

            <v-col class="text-center">
              <v-btn fab outlined class="ma-4">
                <v-icon large>mdi-instagram</v-icon>
              </v-btn>
              <v-btn fab outlined class="ma-4">
                <v-icon large>mdi-vk</v-icon>
              </v-btn>
            </v-col>

            <v-col class="mr-12 text-right">
              <v-icon>mdi-phone</v-icon>Контакты
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- <v-container>
        <v-row>
          <h1
            class="blue--text text--lighten-4 font-weight-black display-1"
          >Хорошее платье само себя не наденет</h1>
        </v-row>
        <v-row justify="center">
          <v-btn
            class="mt-12 font-weight-thin headline"
            large
            outlined
            @click="$vuetify.goTo($parent.$refs.details)"
          >Узнать больше</v-btn>
        </v-row>
        <v-row style="margin-top:auto" justify="center">
          <v-btn
            class="mt-12 font-weight-thin headline"
            large
            outlined
            @click="$vuetify.goTo($parent.$refs.details)"
          >Узнать больше</v-btn>
        </v-row>
      </v-container>-->
    </v-overlay>
  </v-window>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  props: { imgs: <PropOptions<string[]>>{ type: Array, default: () => [] } },
  data() {
    return {
      window: 0
    };
  },
  methods: {
    run: function() {
      this.window;
    }
  },
  mounted() {
    setInterval(() => {
      if (++this.window >= this.imgs.length) this.window = 0;
    }, 6000);
  }
});
</script>

<style>
</style>