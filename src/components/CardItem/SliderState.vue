<template>
  <p v-if="label !== ''">{{ label }}</p>
  <input type="range" :min="min" :max="max" :step="step" :value="stateValue" @change="change"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseState from './BaseState';

export default defineComponent({
  name: 'SliderState',
  mixins: [BaseState],
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 100
    },
    step: {
      type: Number,
      required: false,
      default: 1
    },
  },
  methods: {
    change(e: any) {
      this.update(e.target.value);
    }
  }
});
</script>
