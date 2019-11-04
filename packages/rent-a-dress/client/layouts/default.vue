<template>
  <v-app id="inspire">
    <nav>
      <v-app-bar color="transparent" fixed hide-on-scroll dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </nav>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>

<style>
.top-menu {
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
}
</style>