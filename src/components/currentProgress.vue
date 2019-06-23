<template>
  <v-container pa-0 my-4>
    <v-layout align-start wrap>
      <v-flex>
        <h3 class="headline font-weight-bold weight_greyText">
          {{firstWeight.weight}}
          <span class="body-2">kg</span>
        </h3>
        <h3
          class="caption caption__date text-uppercase font-weight-bold weight_greyText"
        >{{firstWeight.date}}</h3>
      </v-flex>
      <v-flex>
        <h3 class="display-2 font-weight-bold">
          {{currentWeight.weight}}
          <span class="body-2 body-2__current">kg</span>
        </h3>
      </v-flex>
      <v-flex>
        <h3 class="headline font-weight-bold weight_greyText">
          {{targetWeight}}
          <span class="body-2">kg</span>
        </h3>
        <h3 class="caption caption__target text-uppercase font-weight-bold weight_greyText">TARGET</h3>
      </v-flex>
    </v-layout>
    <v-progress-linear v-model="leftToTarget" height="3" color="#19ffd6"></v-progress-linear>
  </v-container>
</template>

<script>
export default {
  props: {
    firstWeight: Object,
    currentWeight: Object,
    targetWeight: Number
  },
  computed: {
    leftToTarget: function() {
      return (
        ((this.firstWeight.weight - this.currentWeight.weight) /
          (this.firstWeight.weight - this.targetWeight)) *
        100
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.weight_greyText {
  color: #888995;
}
.caption__date {
  letter-spacing: 2px;
}
.caption__target {
  letter-spacing: 4px;
}
.body-2 {
  margin-left: -2px;
}
.body-2__current {
  margin-left: -8px;
}
</style>