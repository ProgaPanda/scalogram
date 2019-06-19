<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <weight-history/>
        <new-weight-btn/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import weightHistory from "@/components/weightHistory";
import newWeightBtn from "@/components/new-weight-btn";
export default {
  components: {
    "weight-history": weightHistory,
    "new-weight-btn": newWeightBtn
  }
};
</script>


