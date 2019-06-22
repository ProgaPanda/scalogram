<template>
  <transition name="slide" mode="out-in">
    <v-container pt-0>
      <v-layout>
        <v-flex mt-1>
          <h2 class="display-1 font-weight-medium">New Weight</h2>
        </v-flex>
        <v-flex class="text-xs-right">
          <v-btn to="/" flat icon>
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout mt-4>
        <v-date-picker color="#19d8b6" no-title v-model="date" full-width scrollable></v-date-picker>
      </v-layout>
      <v-layout mt-4>
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
      <v-flex class="text-xs-center">
        <v-btn
          @click="addWeight"
          color="#19ffd6"
          class="new-weight-btn font-weight-bold"
          :loading="loading"
          large
          round
          light
        >save</v-btn>
      </v-flex>
    </v-container>
  </transition>
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
          email: user.email
        };
        this.user = userObj;
      }
    });
    this.weight = parseFloat(this.$route.params.lastWeight);
    if (this.weight) {
      this.minimum_weight = this.weight - 15;
      this.maximum_weight = this.weight + 15;
    } else {
      this.minimum_weight = 20;
      this.maximum_weight = 300;
      this.weight = this.minimum_weight;
    }
  },
  methods: {
    addWeight: function() {
      this.loading = true;
      if (!this.$route.params.lastWeight) {
        this.difference = 0;
      } else {
        this.difference = this.weight - this.$route.params.lastWeight;
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
          this.loading = false;
          this.$root.$emit("newEntry", new_weight);
          router.replace("/");
        });
    }
  },
  data: () => ({
    user: "",
    date: new Date().toISOString().substr(0, 10),
    weight: 0,
    difference: 0,
    minimum_weight: 20,
    maximum_weight: 300,
    isFirstEntry: false,
    loading: false
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