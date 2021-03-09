<template>
  <p v-if="label !== ''">{{ label }}</p>
  <Knob type="range" :min="min" :max="max" :step="step" v-model="stateValue"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Knob from 'primevue/knob';
import BaseState from './BaseState';

export default defineComponent({
  name: 'KnobState',
  mixins: [BaseState],
  components: {
    Knob
  },
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
