<template>
  <v-container pa-1 mb-2>
    <h1 class="bmi-chart__title mb-2">Your BMI</h1>
    <v-card v-if="height" color="#202137" class="bmi-chart_card pa-3" flat dark>
      <v-layout>
        <v-layout>
          <v-flex xs6>
            <h3 class="bmi-chart__number">{{bmi.number}}</h3>
            <h5
              class="bmi-chart__category text-uppercase font-weight-black"
              :style="{color: bmi.color}"
            >{{bmi.category}}</h5>
          </v-flex>
          <v-flex>
            <v-slider
              class="_slider_thumb"
              :value="bmi.number"
              :color="bmi.color"
              :min="8"
              :max="45"
              readonly
            ></v-slider>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    lastEntry: Object,
    height: Number
  },
  computed: {
    bmi: function() {
      const number = (
        (this.lastEntry.weight / this.height ** 2) *
        10000
      ).toFixed(1);
      let category = "healthy";
      let color = "green";
      if (number <= 18.5) {
        category = "underweight";
        color = "#2bceea";
      } else if (number <= 24.9) {
        category = "healthy";
        color = "#14cd83";
      } else if (number <= 29.9) {
        category = "overweight";
        color = "#ffcb00";
      } else if (number >= 30) {
        category = "obese";
        color = "#ff6622";
      }

      return { number, category, color };
    }
  }
};
</script>

<style lang="scss" scoped>
.bmi-chart__title {
  color: #888995;
}
.bmi-chart_card {
  border-radius: 10px;
}
.bmi-chart__number {
  font-size: 1.8rem;
}
.bmi-chart__category {
  font-size: 1rem;
  letter-spacing: 2px;
}
</style>
<style lang="scss">
._slider_thumb .v-slider__thumb {
  border-radius: 25%;
  height: 60px;
  width: 15px;
}
</style>