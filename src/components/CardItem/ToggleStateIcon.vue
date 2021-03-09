<template>
  <i @click="toggle">Icon {{ showStateIcon }}</i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NextDomApi from '../../services/NextDomApi';

export default defineComponent({
  name: 'ToggleStateIcon',
  props: {
    state: {
      type: Object,
      required: true
    },
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
      return this.$store.getters.deviceState(this.state.deviceId, this.state.capability) ? this.onIcon : this.offIcon;
    }
  },
  methods: {
      toggle() {
        if (this.$store.getters.deviceState(this.state.deviceId, this.state.capability)) {
          NextDomApi.setDeviceAction(this.setOff.deviceId, this.setOff.capability, this.setOff.targetValue);
        } else {
          NextDomApi.setDeviceAction(this.setOn.deviceId, this.setOn.capability, this.setOn.targetValue);
        }
      }
  }
});
</script>
