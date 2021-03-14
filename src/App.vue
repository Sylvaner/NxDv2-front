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
body {
  margin: 0;
}
</style>