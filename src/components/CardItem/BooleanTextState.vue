<template>
  <p v-if="label !== ''">
    {{ label }}
  </p>
  <p>{{ stateValue }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseState from './BaseState';

export default defineComponent({
  name: 'BooleanTextState',
  mixins: [BaseState],
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    onLabel: {
      type: String,
      required: false,
      default: 'on'
    },
    offLabel: {
      type: String,
      required: false,
      default: 'off'
    }
  }
});
</script>
