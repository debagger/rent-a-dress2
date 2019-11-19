<template>
  <v-content>
    <v-row>
      <v-col class=" text-center grey darken-4 white--text">
        <h2 class="font-weight-thin display-2">RENT-A-DRESS</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table sort-by="username" :headers="headers" :items="users">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" @click="newUser()">New Item</v-btn>
              <v-dialog v-model="dialog" max-width="500px">
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
                        <v-text-field
                          class="mr-4 ml-4"
                          v-if="editedItem.isnew"
                          v-model="editedItem.password"
                          label="Пароль"
                        ></v-text-field>
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
      </v-col>
    </v-row>
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
    newUser() {
      this.editedItem = {
        isnew: true,
        username: "",
        email: "",
        role: "",
        password: ""
      };
      this.dialog = true;
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?");
    },
    async save() {
      debugger;
      if (this.editedItem.isnew) {
        const data = await this.$axios.$post("/api/auth/adduser", {
          username: this.editedItem.username,
          email: this.editedItem.email,
          password: this.editedItem.password
        });
        this.users = await this.$axios.$get("/api/auth/users");
      } else {
        const data = await this.$axios.$post(
          "/api/auth/edituser",
          this.editedItem
        );
        const user = this.users.find(item => item.username === data.username);
        Object.assign(user, data);
      }
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