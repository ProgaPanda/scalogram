<template>
  <v-container pa-2 mb-2>
    <v-layout>
      <line-chart
        :library="chartJS_options"
        :colors="['#19ffd6']"
        :curve="false"
        suffix="kg"
        :dataset="{
          borderWidth: 4,
          pointHoverBackgroundColor:'#0e7765',
          pointHoverBorderColor:'#0e7765',
          pointHoverRadius:8,
          
          }"
        :data="recent_entries"
        :min="Math.round(min_weight) - 1"
        height="220px"
      ></line-chart>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";

import Chartkick from "vue-chartkick";
import Chart from "chart.js";
Vue.use(Chartkick.use(Chart));
Chart.defaults.global.defaultFontColor = "#dfdfdf";
Chart.defaults.global.defaultFontStyle = "bold";

Chart.scaleService.updateScaleDefaults("linear", {
  gridLines: {
    display: false,
    drawBorder: false
  }
});
export default {
  props: {
    weights: Array
  },
  computed: {
    recent_entries: function() {
      let recent_weights = {};
      this.weights.forEach(weight => {
        recent_weights[weight.date] = weight.weight;
        if (weight.weight < this.min_weight) {
          this.min_weight = weight.weight;
        }
      });
      return recent_weights;
    }
  },
  data: () => ({
    chartJS_options: {
      tooltips: {
        backgroundColor: "#fff",
        titleFontStyle: "normal",
        titleFontColor: "#000",
        bodyFontStyle: "bold",
        bodyFontColor: "#000",
        bodyFontSize: "18",
        caretPadding: 15
      },
      elements: {
        point: {
          radius: 4,
          hitRadius: 10
        }
      },
      animation: {
        duration: 800
      },
      gridLines: {
        display: false
      }
    },
    min_weight: 999
  })
};
</script>

<style lang="scss" scoped>
</style>