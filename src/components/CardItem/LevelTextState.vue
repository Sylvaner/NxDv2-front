<template>
  <p v-if="label !== ''">{{ label }}</p>
  <p>{{ stateValue }}<span v-if="unit !== ''"> {{ unit }}</span></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseState from './BaseState';

export default defineComponent({
  name: 'LevelTextState',
  mixins: [BaseState],
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    unit: {
      type: String,
      required: false
    }
  }
});
</script>
