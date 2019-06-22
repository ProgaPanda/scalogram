<template>
  <v-container>
    <v-toolbar app dark color="#16172e" class="pl-2 py-2">
      <v-btn @click.stop="drawer = !drawer" icon>
        <v-avatar size="42px">
          <img v-if="user.picture" :src="user.picture" class="white-border" alt="Avatar">
          <img
            v-else
            :src="`https://ui-avatars.com/api/?name=${user.name}?background=fff&color=000`"
            alt="Avatar"
          >
        </v-avatar>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu transition="slide-y-transition" light bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile @click="deleteDialog = true">
            <v-list-tile-action>
              <v-icon color="red">delete</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-uppercase">clear all entries</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="deleteDialog">
      <v-card light>
        <v-card-text>Delete all your weight entries?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false" flat>cancel</v-btn>
          <v-btn @click="deleteAllEntries_emit" color="red darken-1" flat="flat">delete all entries</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" class="drawer" app>
      <!-- Buttons list -->
      <v-list class="pa-1" dark>
        <v-list-tile class="my-3" avatar>
          <v-avatar size="48px">
            <img v-if="user.picture" :src="user.picture" class="white-border" alt="Avatar">
            <img
              v-else
              :src="`https://ui-avatars.com/api/?name=${user.name}?background=fff&color=000`"
              alt="Avatar"
            >
          </v-avatar>
          <v-list-tile-content class="ml-3">
            <v-list-tile-title>{{user.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider color="#07071e"></v-divider>
        <v-list-tile to="/" @click="drawer= false" class="mt-2">
          <v-list-tile-action>
            <v-icon color="#fff">home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title style="color:white" class="text-uppercase">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import router from "@/router";
export default {
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userObj = {
          name: user.displayName,
          picture: user.photoURL,
          email: user.email
        };
        this.user = userObj;
      }
    });
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.replace("login");
          this.user = null;
        });
    },
    deleteAllEntries_emit: function() {
      // emits a global event, listen on dashboard and
      // executes delete function there
      this.$root.$emit("deleteAllEntries");
      this.deleteDialog = false;
    }
  },
  data: () => ({
    user: "",
    drawer: false,
    deleteDialog: false
  })
};
</script>

<style lang="scss" scoped>
.drawer {
  background-color: #0b0b2b;
}
.white-border {
  border: 2px solid #fff;
}
.drawer.primary--text {
  color: rgb(233, 0, 0);
}
</style>