<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <weight-history :weight-data="weight_store"/>
        <new-weight-btn/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "@/main";
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
export default {
  components: {
    "weight-history": weightHistory,
    "new-weight-btn": newWeightBtn
  },
  mounted: function() {
    db.collection("weight-collection")
      .where("owner", "==", "looda97@gmail.com")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          //do something
        }
        querySnapshot.forEach(weight => {
          const weight_instance = {
            id: weight.id,
            weight: weight.data().weight,
            date: weight.data().date,
            difference: weight.data().difference
          };
          this.weight_store.push(weight_instance);
        });
      });
  },
  data: () => ({
    weight_store: []
  })
};
</script>


