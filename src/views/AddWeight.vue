<template>
  <v-container>
    <v-layout mt-2>
      <v-flex mt-1>
        <h2 class="display-1 font-weight-medium">New Weight</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="text-xs-right">
        <v-btn to="/" flat icon>
          <v-icon medium>close</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout mt-3>
      <v-date-picker color="#19d8b6" v-model="date" full-width scrollable></v-date-picker>
    </v-layout>
    <v-layout mt-5>
      <v-flex class="text-xs-center">
        <h2 class="display-3 font-weight-bold">{{weight}}Kg</h2>
        <v-slider
          v-model="weight"
          :min="last_weight - 15"
          :max="last_weight + 15"
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
          .where("owner", "==", "looda97@gmail.com")
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              this.last_weight = this.weight;
            } else {
              this.last_weight = querySnapshot.docs[0].data().weight;
              this.weight = this.last_weight;
            }
          });
      }
    });
  },
  methods: {
    addWeight: function() {
      const new_weight = {
        weight: this.weight,
        difference: this.weight - this.last_weight,
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
    date: new Date().toISOString().substr(0, 10),
    weight: 0,
    last_weight: 0
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