<template>
  <button @click="execute">{{ this.label }}</button>
</template>

<script lang="ts">
import NextDomApi from '../../services/NextDomApi';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionButton',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    action: {
      type: Object,
      required: true
    }
  },
  methods: {
    execute() {
      if (this.action.deviceId !== undefined) {
        NextDomApi.setDeviceAction(this.action.deviceId, this.action.capability, this.action.targetValue);
      }
    }
  }
});
</script>
