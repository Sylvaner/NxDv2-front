<template>
  <DeviceManager/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import DeviceManager from './components/DeviceManager.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    DeviceManager
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