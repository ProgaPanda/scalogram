<template>
  <div id="app" dark>
    <v-app dark>
      <v-content>
        <keep-alive include="Dashboard">
          <router-view/>
        </keep-alive>
      </v-content>
    </v-app>
  </div>
</template>


<style lang="scss">
#app {
  background-color: #16172e;
  color: #fff;
  font-family: Roboto, sans-serif;
}
</style>
