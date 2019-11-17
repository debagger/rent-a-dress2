<template>
  <v-app id="inspire">
    <nav>
      <v-app-bar color="transparent" fixed hide-on-scroll dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- <v-btn
          v-if="$auth.loggedIn"
          @click="$auth.logout()"
        >{{$auth.user.role}} - {{$auth.user.email}}</v-btn>
        <v-btn v-else @click="$refs.login.showForm()">Войти</v-btn>-->

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-if="$auth.loggedIn" icon v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn icon v-else @click="$refs.login.showForm()">
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
          </template>
          <v-list v-if="$auth.loggedIn">
            <v-list-item v-if="$auth.loggedIn">
              <v-list-item-title>
                <v-icon>mdi-account-circle</v-icon>
                {{$auth.user.email}}
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$auth.user && $auth.user.role==='admin'" to="/admin/users">
              <v-list-item-title>
                <v-icon>mdi-account-search</v-icon>Пользователи
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$auth.user && $auth.user.role==='admin'" to="/admin/catalog">
              <v-list-item-title>
                <v-icon>mdi-format-list-checkbox</v-icon>Каталог
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$auth.loggedIn" @click="$auth.logout()">
              <v-list-item-title>
                <v-icon>mdi-logout-variant</v-icon>Выйти
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </nav>
    <v-content>
      <nuxt />
    </v-content>
    <LoginForm ref="login" />
  </v-app>
</template>
<script>
import LoginForm from "../components/LoginForm";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  components: { LoginForm }
};
</script>

<style>
.top-menu {
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
}
</style>