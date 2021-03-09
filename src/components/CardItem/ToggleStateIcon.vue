<template>
  <i :class="showStateIcon" @click="toggle"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    }
  },
  computed: {
    showStateIcon(): string {
      return this.stateValue ? this.onIcon : this.offIcon;
    }
  },
  methods: {
  }
});
</script>
