<template>
  <i @click="toggle">Icon {{ showStateIcon }}</i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NextDomApi from '../../services/NextDomApi';
import BaseState from './BaseState';

export default defineComponent({
  name: 'ToggleStateIcon',
  mixins: [BaseState],
  props: {
    onIcon: {
      type: String,
      required: false,
      default: 'on'
    },
    offIcon: {
      type: String,
      required: false,
      default: 'off'
    },
    setOn: {
      type: Object,
      required: true
    },
    setOff: {
      type: Object,
      required: true
    }
  },
  computed: {
    showStateIcon(): string {
      return this.stateValue ? this.onIcon : this.offIcon;
    }
  },
  methods: {
      toggle() {
        if (this.stateValue) {
          NextDomApi.setDeviceAction(this.setOff.deviceId, this.setOff.capability, this.setOff.targetValue);
        } else {
          NextDomApi.setDeviceAction(this.setOn.deviceId, this.setOn.capability, this.setOn.targetValue);
        }
      }
  }
});
</script>
