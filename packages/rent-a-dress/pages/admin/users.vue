<template>
  <v-content>
    <h1>Пользователи</h1>
    <v-data-table :headers="headers" :items="users">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      class="mr-4 ml-4"
                      v-model="editedItem.username"
                      label="Имя пользователя"
                    ></v-text-field>
                    <v-text-field class="mr-4 ml-4" v-model="editedItem.email" label="E-mail"></v-text-field>
                    <v-text-field class="mr-4 ml-4" v-model="editedItem.role" label="Роль"></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-account-edit-outline</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-account-off-outline</v-icon>
      </template>
    </v-data-table>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      editedItem: {},
      headers: [
        { text: "Имя пользователя", value: "username" },
        { text: "E-mail", value: "email" },
        { text: "Роль", value: "role" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get("/api/auth/users");
    return { users: data };
  },
  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?");
    },
    async save() {
      debugger;
      const data = await this.$axios.$post(
        "/api/auth/edituser",
        this.editedItem
      );
      const user = this.users.find(item => item.username === data.username);
      Object.assign(user, data);
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>