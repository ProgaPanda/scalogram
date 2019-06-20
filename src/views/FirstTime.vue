<template>
  <v-container pa-3>
    <h1 class="weight-history__title mb-4">Welcome, {{user.name.split(" ")[0]}}</h1>
    <v-container>
      <v-layout mt-5>
        <v-flex xs12>
          <h3 class="v-label theme--dark font-weight-regular">Target weight</h3>
          <h2 class="display-3 font-weight-bold">{{target_weight.toFixed(1)}}kg</h2>
          <v-slider
            v-model="target_weight"
            :min="30"
            :max="100"
            :rules="required"
            step="0.1"
            color="#19d8b6"
            thumb-color="#ffffff"
            required
          ></v-slider>
          <h3 class="v-label theme--dark font-weight-regular">Height</h3>
          <h2 class="display-3 font-weight-bold">{{height}}cm</h2>
          <v-slider
            v-model="height"
            :min="110"
            :max="220"
            :rules="required"
            step="1"
            color="#5836d2"
            thumb-color="#ffffff"
            required
          ></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex class="text-xs-center mt-4">
      <v-btn
        @click="addUser"
        color="#19ffd6"
        class="new-weight-btn font-weight-bold"
        large
        round
        light
      >begin your journey</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import router from "@/router";
import { db } from "@/main";
import firebase from "firebase/app";
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
    addUser: function() {
      const user_info = {
        user: this.user.email,
        targetWeight: this.target_weight,
        height: this.height
      };
      db.collection("user-collection")
        .add(user_info)
        .then(() => {
          router.replace("/");
        });
    }
  },
  data: () => ({
    user: "",
    target_weight: 50,
    height: 150,
    required: [v => !!v || "Required"]
  })
};
</script>

<style lang="scss" scoped>
.text-color-grey {
  color: #888995;
}
</style>