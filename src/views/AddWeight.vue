<template>
  <v-container>
    <v-layout mt-2>
      <v-flex mt-1>
        <h2 class="display-1 font-weight-medium">New Weight</h2>
      </v-flex>
      <v-flex class="text-xs-right">
        <v-btn to="/" flat icon>
          <v-icon medium>close</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout mt-5>
      <v-date-picker color="#19d8b6" no-title v-model="date" full-width scrollable></v-date-picker>
    </v-layout>
    <v-layout mt-5>
      <v-flex class="text-xs-center">
        <h2 class="display-3 font-weight-bold">{{weight.toFixed(1)}}Kg</h2>
        <v-slider
          v-model="weight"
          :min="minimum_weight"
          :max="maximum_weight"
          step="0.1"
          color="#19d8b6"
          persistent-hint
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-flex class="text-xs-center mt-5">
      <v-btn
        @click="addWeight"
        color="#19ffd6"
        class="new-weight-btn font-weight-bold"
        large
        round
        light
      >save</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import { db } from "@/main";
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

        db.collection("weight-collection")
          .orderBy("createdAt", "desc")
          .where("owner", "==", this.user.email)
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              this.weight = this.minimum_weight;
              this.isFirstEntry = true;
            } else {
              // get the last weight entry
              this.last_weight = querySnapshot.docs[0].data().weight;
              this.weight = this.last_weight;
              this.minimum_weight = this.weight - 15;
              this.maximum_weight = this.weight + 15;
            }
          });
      }
    });
  },
  methods: {
    addWeight: function() {
      if (this.isFirstEntry) {
        this.difference = 0;
      } else {
        this.difference = this.weight - this.last_weight;
      }
      const new_weight = {
        weight: this.weight,
        difference: this.difference,
        date: this.date,
        createdAt: new Date(),
        owner: this.user.email
      };

      db.collection("weight-collection")
        .add(new_weight)
        .then(() => {
          router.replace("/");
        });
    }
  },
  data: () => ({
    user: "",
    date: new Date().toISOString().substr(0, 10),
    weight: 0,
    last_weight: 0,
    difference: 0,
    minimum_weight: 20,
    maximum_weight: 300,
    isFirstEntry: false
  })
};
</script>

<style lang="scss">
.theme--dark.v-picker__body {
  background: #202137;
}
.v-picker__title {
  color: #16172e;
}
.new-weight-btn {
  width: 50%;
}
</style>