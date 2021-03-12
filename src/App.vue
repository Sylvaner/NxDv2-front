<template>
  <TopMenu />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopMenu from './components/TopMenu.vue';
import StateUpdater from './services/StateUpdater';

export default defineComponent({
  name: 'App',
  components: {
    TopMenu
  },
  mounted() {
    const stateUpdater = new StateUpdater();
    stateUpdater.start();
  }
})
</script>

<style>
html {
    background-color: #EEEEEE;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>