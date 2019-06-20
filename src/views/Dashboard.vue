<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <weight-history :weightData="weight_store"/>
        <new-weight-btn/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
export default {
  components: {
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
      }
    });
  },
  data: () => ({
    user: "",
    weight_store: []
  })
};
</script>


