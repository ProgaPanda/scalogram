<template>
  <v-container pt-0>
    <v-layout>
      <v-flex mt-1>
        <h2 class="display-1 font-weight-medium">Settings</h2>
      </v-flex>
    </v-layout>
    <v-layout column mt-5>
      <v-flex xs12>
        <h3 class="v-label theme--dark font-weight-regular">Target weight</h3>
      </v-flex>
      <v-flex xs12>
        <h2 class="display-3 font-weight-bold">{{target_weight.toFixed(1)}}kg</h2>

        <v-slider
          v-model="target_weight"
          :min="30"
          :max="100"
          step="0.5"
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
          step="1"
          color="#5836d2"
          thumb-color="#ffffff"
          required
        ></v-slider>
      </v-flex>
      <v-flex class="text-xs-center mt-4">
        <v-btn
          @click="saveData"
          color="#19ffd6"
          class="new-weight-btn font-weight-bold"
          :loading="loading"
          large
          round
          light
        >save</v-btn>
      </v-flex>
    </v-layout>
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
        db.collection("user-collection")
          .where("user", "==", this.user.email)
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              // do something
            } else {
              this.target_weight = querySnapshot.docs[0].data().targetWeight;
              this.height = querySnapshot.docs[0].data().height;
            }
          });
      }
    });
  },
  methods: {
    saveData: function() {
      this.loading = true;
      const updated_settings = {
        targetWeight: this.target_weight,
        height: this.height
      };
      db.collection("user-collection")
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            // do something
          } else {
            const id = querySnapshot.docs[0].id;
            db.collection("user-collection")
              .doc(id)
              .update(updated_settings)
              .then(() => {
                this.loading = false;
                this.$root.$emit("settingsChange", updated_settings);
                router.replace("/");
              });
          }
        });
    }
  },
  data: () => ({
    user: "",
    loading: false,
    target_weight: 50,
    height: 150
  })
};
</script>

<style lang="scss" scoped>
</style>