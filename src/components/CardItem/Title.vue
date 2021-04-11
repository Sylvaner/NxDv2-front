<template>
  <h2 class="device-title">{{ title }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style>
.device-title {
  text-align: center;
  margin: 0;
}
</style>