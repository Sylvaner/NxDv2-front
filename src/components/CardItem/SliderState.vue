<template>
  <p v-if="label !== ''">{{ label }}</p>
  <input type="range" :min="min" :max="max" :step="step" :value="stateValue" @change="update"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NextDomApi from '../../services/NextDomApi';

export default defineComponent({
  name: 'SliderState',
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
    state: {
      type: Object,
      required: true
    }
  },
  computed: {
    stateValue(): number {
        return this.$store.getters.deviceState(this.state.deviceId, this.state.capability);
    }
  },
  methods: {
    update(e: any) {
      NextDomApi.setDeviceAction(this.state.deviceId, this.state.capability, e.target.value);
    }
  }
});
</script>
