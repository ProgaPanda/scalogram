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
/*slide transition*/
.slide-enter-active {
  transition: transform 0.15s ease-out;
}
.slide-enter {
  transform: translateY(100%);
}
</style>
</style>
