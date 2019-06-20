<template>
  <v-container pa-1>
    <h1 class="weight-history__title mb-4">History</h1>
    <div v-if="weightData.length > 0">
      <weight-card
        v-for="weight_instant in weightData"
        :key="weight_instant.id"
        :date="weight_instant.date"
        :weightDifference="weight_instant.difference"
        :weight="weight_instant.weight"
      />
    </div>
    <div v-else class="mt-5">
      <h4 class="font-weight-light text-xs-center">You have no weight entries</h4>
    </div>
  </v-container>
</template>

<script>
import weightCard from "@/components/weight-card";

export default {
  components: {
    "weight-card": weightCard
  },
  props: {
    weightData: Array
  }
};
</script>

<style lang="scss">
.weight-history__title {
  color: #888995;
}
</style>

