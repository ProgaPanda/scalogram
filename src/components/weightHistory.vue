<template>
  <div>
    <h1 class="weight-history__title mb-3">History</h1>
    <weight-card
      v-for="weight_instant in weightData"
      :key="weight_instant.id"
      :date="weight_instant.date"
      :weightDifference="weight_instant.difference"
      :weight="weight_instant.weight"
    />
  </div>
</template>

<script>
import weightCard from "@/components/weight-card";

export default {
  components: {
    "weight-card": weightCard
  },
  props: {
    "weight-data": Array
  }
};
</script>

<style lang="scss">
.weight-history__title {
  color: #888995;
}
</style>

