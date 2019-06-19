<template>
  <div>
    <h1 class="weight-history__title mb-3">History</h1>
    <weight-card date="13/7" :weightDifference="1.2" :weight="65"/>
    <weight-card date="08/7" :weightDifference="-1.8" :weight="67"/>
    <weight-card date="30/6" :weightDifference="-1.2" :weight="60"/>
  </div>
</template>

<script>
import weightCard from "@/components/weight-card";

export default {
  components: {
    "weight-card": weightCard
  }
};
</script>

<style lang="scss">
.weight-history__title {
  color: #888995;
}
</style>

