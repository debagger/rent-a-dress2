<template>
  <main>
    <section>
      <index-top :imgs="imgs" />
    </section>
    <section>
      <v-parallax src="img/index-bg.jpg" height="350">
        <v-row
          class="ml-n5 mr-n5 pt-12"
          ref="details"
          style="color: black; background: rgba(255, 220, 220,0.95)"
        >
          <v-col class="text-center ml-12">
            <v-icon size="50px">mdi-party-popper</v-icon>
            <h1>Для вечеринок</h1>
            <p>Ты собираешься на семейное торжество, свадьбу к подруге или на вечеринку с друзьями. Возми платье на прокат. Будешь неотразима.  И деньги сэкономишь.</p>
          </v-col>
          <v-col class="text-center">
            <v-icon size="50px">mdi-camera-enhance-outline</v-icon>
            <h1>Образ для фотосесии</h1>
            
            <p class="mb-1">Хочешь сногсшибательные фото для инсты и вк?</p>
            <ul class="text-left ml-3 overline font-italic">
              <li>Запишись на фотосессию у Лены Клещевниковой</li>
              <li>выбери платье (ага, прям на месте)</li>
              <li>...</li>
              <li>profit!!!111</li>
              </ul> 
              <p>Выглядит как план ))</p>
          </v-col>
          <v-col class="text-center mr-12">
            <v-icon size="50px">mdi-emoticon-cool-outline</v-icon>
            <h1>Короче</h1>
            <p>Мы хотим, чтобы ты выглядела круто в любой ситуации. Свяжись с нами и мы поможем.</p>
          </v-col>
        </v-row>
      </v-parallax>
    </section>
    <section>
      <v-row class="mt-0 purple lighten-5 pa-5" align="center">
        <v-col>
          <v-img src="img/clothing_rack.jpg" />
        </v-col>
        <v-col>
          <h1>Что тут у нас?</h1>
          <p>Никогда такого не было в Новоуральске. А теперь есть. Это как одолжить платье на вечер у подруги. Только вряд ли у твоей подруги такой выбор изумительной трендовой одежды.</p>
          <p>Вот мы и решили сделать прокат для тебя. Чтобы ты выглядела на все сто и в соцсетях и на дне рождения. Каждый раз в новом модном и трендовом.</p>

        </v-col>
      </v-row>
    </section>
    <section>
      <v-row class="mt-12">
        <v-col class="text-center">
          <h1>Пссс... подруга, смотри что у нас есть!</h1>
        </v-col>
      </v-row>
      <v-lazy transition="expand-transition">
        <swiper :imgs="imgs" />
      </v-lazy>
    </section>
  </main>
</template>

<script>
import IndexTop from "~/components/index-top";
import Swiper from "~/components/Swiper";
export default {
  components: { Swiper, IndexTop },
  data() {
    return {
      window: 0,
      imgs: [...Array(13).keys()].map(i => `img/${i}.jpg`)
    };
  }
};
</script>

<style>
</style>

