<template>
  <Button @click="execute">{{ this.label }}</Button>
</template>

<script lang="ts">
import NextDomApi from '../../services/NextDomApi';
import Button from 'primevue/button';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionButton',
  components: {
    Button
  },
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
