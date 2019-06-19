<template>
  <v-card color="#202137" class="weight-card mb-3" height="80" flat dark>
    <v-layout pa-3 row wrap align-center>
      <v-flex>
        <h3 class="weight-card__date mb-2">{{date.slice(5,10).split('-').reverse().join('/')}}</h3>
        <h3 class="weight-card__weight-difference" :style="{ color: diffrence_color}">
          <v-icon
            class="weight-card__weight-difference__icon"
            :style="{ color: diffrence_color}"
          >arrow_upward</v-icon>
          {{weightDifference.toFixed(1)}} kg
        </h3>
      </v-flex>
      <v-spacer></v-spacer>
      <h3 class="weight-card__weight">{{weight}}kg</h3>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    date: String,
    weightDifference: Number,
    weight: Number
  },
  computed: {
    diffrence_color: function() {
      return this.weightDifference < 0 ? "#28beaa" : "#d44a5f";
    }
  }
};
</script>
<style lang="scss" scoped>
.weight-card {
  border-radius: 10px;

  .weight-card__date {
    font-size: 1rem;
    color: #888995;
  }
  .weight-card__weight-difference {
    color: #28beaa;

    .weight-card__weight-difference__icon {
      font-size: 1.4rem;
      color: #28beaa;
    }
  }
  .weight-card__weight {
    font-size: 1.8rem;
  }
}
</style>

