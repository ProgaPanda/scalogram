<template>
  <v-container>
    <v-toolbar app dark color="#16172e" class="pa-1">
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
      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" class="drawer" app>
      <v-list class="pa-1" dark>
        <v-list-tile avatar>
          <v-avatar size="42px">
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
        <v-divider></v-divider>
        <v-list-tile @click="logout" dark>
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
    }
  },
  data: () => ({
    user: "",
    drawer: false
  })
};
</script>

<style lang="scss" scoped>
.drawer {
  background-color: #19192d;
}
.white-border {
  border: 2px solid #fff;
}
</style>