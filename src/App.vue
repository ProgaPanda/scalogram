<template>
  <div id="app" dark>
    <app-bar v-if="!$route.meta.loginView"/>
    <v-app dark>
      <v-content>
        <keep-alive include="Dashboard">
          <router-view/>
        </keep-alive>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import appBar from "@/components/app-bar";
export default {
  components: {
    appBar
  }
};
</script>


<style lang="scss">
#app {
  background-color: #16172e;
  color: #fff;
  font-family: Roboto, sans-serif;
}
::-webkit-scrollbar {
  display: none;
  width: 0;
}
</style>
