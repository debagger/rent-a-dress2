<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="500">
      <v-form>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Login</v-btn>
        </template>
        <v-card class="pa-5">
          <v-card-title class="headline">Вход</v-card-title>
          <v-text-field label="Имя" v-model="login.username"></v-text-field>
          <v-text-field label="Пароль" v-model="login.password" type="password"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="loginLocal">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
 
export default Vue.extend({
  data() {
    return {
      show: false,
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    showForm() {
      this.show = true;
      
    },
    loginLocal() {
      this.$auth 
        .loginWith("local", {
          data: {
            username: this.login.username,
            password: this.login.password
          }
        })
        .then(
          () => {
            this.show = false;
            this.login.username = "";
            this.login.password = "";
          }
        );
    },
    logout: function() {
      this.$auth.logout();
    }
  }
});
</script>

<style>
</style>