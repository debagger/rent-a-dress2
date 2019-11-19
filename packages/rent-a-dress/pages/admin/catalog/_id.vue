<template>
  <v-content>
    <v-row>
      <v-col class="text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <itemEditor :itemid="$route.params.id"></itemEditor>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import itemEditor from "../../../components/itemEditor";
export default {
  components: { itemEditor },
  data() {
    return {};
  }
};
</script>

<style>
</style>