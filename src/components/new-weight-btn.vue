<template>
  <div>
    <v-btn
      :to="{ name: 'addWeight',  params: { lastWeight }}"
      class="new-weight-btn font-weight-bold"
      color="#19ffd6"
      large
      round
      fixed
      bottom
      light
    >new weight</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    lastWeight: Number
  }
};
</script>

<style lang="scss" scoped>
.new-weight-btn {
  z-index: 4;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>