<template>
  <v-container pt-0>
    <v-snackbar width="200" :color="alert.color" v-model="alert.active" :timeout="2000" top>
      <span class="black--text">{{ alert.messege }}</span>
      <v-icon color="black">{{alert.icon}}</v-icon>
    </v-snackbar>
    <v-layout>
      <v-flex xs12>
        <current-progress
          class="text-xs-center"
          v-if="weight_store.length"
          :firstWeight="weight_store[weight_store.length - 1]"
          :currentWeight="weight_store[0]"
          :targetWeight="user_targetWeight"
        />
        <bmi-chart v-if="weight_store.length" :lastEntry="weight_store[0]" :height="user_height"/>
        <weight-history :weightData="weight_store"/>
        <new-weight-btn :lastWeight="lastWeight"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";
import currentProgress from "@/components/currentProgress";
import bmiChart from "@/components/bmiChart";
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
export default {
  name: "Dashboard",
  components: {
    "current-progress": currentProgress,
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
              this.user_targetWeight = querySnapshot.docs[0].data().targetWeight;
            }
          });

        this.$root.$on("deleteAllEntries", () => {
          this.weight_store = [];
          db.collection("weight-collection")
            .where("owner", "==", this.user.email)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.empty) {
                this.alert = {
                  active: true,
                  messege: "You have no entries",
                  color: "#c6c6c6",
                  icon: "info"
                };
              } else {
                querySnapshot.forEach(weight => {
                  weight.ref.delete();
                });
                this.alert = {
                  active: true,
                  messege: "All entries deleted",
                  color: "#ff7876",
                  icon: "check_circle"
                };
              }
            });
        });

        this.$root.$on("newEntry", new_weight => {
          this.weight_store.unshift(new_weight);
        });

        this.$root.$on("settingsChange", data => {
          this.user_height = data.height;
          this.user_targetWeight = data.targetWeight;
          this.alert = {
            active: true,
            messege: "Settings saved",
            color: "#16e4bf",
            icon: "check_circle"
          };
        });
      }
    });
  },
  computed: {
    lastWeight: function() {
      if (this.weight_store.length) {
        return this.weight_store[0].weight;
      }
      return 0;
    }
  },
  data: () => ({
    user: "",
    alert: {},
    weight_store: [],
    user_height: 0,
    user_targetWeight: 0
  })
};
</script>


