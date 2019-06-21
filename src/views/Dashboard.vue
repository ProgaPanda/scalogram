<template>
  <v-container pt-0>
    <v-layout>
      <v-flex xs12>
        <bmi-chart v-if="weight_store.length" :lastEntry="weight_store[0]" :height="user_height"/>
        <weight-history :weightData="weight_store"/>
        <new-weight-btn/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";
import bmiChart from "@/components/bmiChart";
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
export default {
  components: {
    "bmi-chart": bmiChart,
    "weight-history": weightHistory,
    "new-weight-btn": newWeightBtn
  },
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
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              //do something
            } else {
              querySnapshot.forEach(weight => {
                const weight_instance = {
                  id: weight.id,
                  weight: weight.data().weight,
                  date: weight.data().date,
                  difference: weight.data().difference
                };
                this.weight_store.push(weight_instance);
              });
            }
          });
        db.collection("user-collection")
          .where("user", "==", user.email)
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              // do something
            } else {
              this.user_height = querySnapshot.docs[0].data().height;
            }
          });

        this.$root.$on("deleteAllEntries", () => {
          this.weight_store = [];
          db.collection("weight-collection")
            .where("owner", "==", this.user.email)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.empty) {
                //do something
              } else {
                querySnapshot.forEach(weight => {
                  weight.ref.delete();
                });
              }
            });
        });
      }
    });
  },
  data: () => ({
    user: "",
    weight_store: [],
    user_height: 0
  })
};
</script>


