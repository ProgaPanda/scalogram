<template>
  <v-container pa-0>
    <loading :active.sync="isLoading" background-color="#16172e" is-full-page>
      <ball-grid-pulse color="#19ffd6" scale="1"/>
    </loading>
    <div v-show="!isLoading">
      <v-snackbar width="200" :color="alert.color" v-model="alert.active" :timeout="2000" top>
        <span class="black--text">{{ alert.messege }}</span>
        <v-icon color="black">{{alert.icon}}</v-icon>
      </v-snackbar>
      <weight-chart v-if="weight_store.length >= 2" :weights="weight_store"/>
      <v-layout px-3>
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
    </div>
  </v-container>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";

import weightChart from "@/components/weightChart";
import currentProgress from "@/components/currentProgress";
import bmiChart from "@/components/bmiChart";
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
//import loading component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "vue-loaders/dist/vue-loaders.css";
import ballGridPulse from "vue-loaders/dist/loaders/ball-grid-pulse";

export default {
  name: "Dashboard",
  components: {
    "weight-chart": weightChart,
    "current-progress": currentProgress,
    "bmi-chart": bmiChart,
    "weight-history": weightHistory,
    "new-weight-btn": newWeightBtn,
    Loading,
    "ball-grid-pulse": ballGridPulse.component
  },
  mounted: function() {
    this.isLoading = true;
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
              this.isLoading = false;
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
              this.isLoading = false;
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
    isLoading: false,
    user: "",
    alert: {},
    weight_store: [],
    user_height: 0,
    user_targetWeight: 0
  })
};
</script>


