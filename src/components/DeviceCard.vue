<template>
  <Card :style="cardStyle">
    <template #content>
      <component
          v-for="templateItem in template.items"
          :key="`ci-${templateItem.id}`"
          v-bind="templateItem.props"
          :is="templateItem.type"
          :enabled="enabled">
      </component>
    </template>>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card';
import Title from './CardItem/Title.vue';
import ActionButton from './CardItem/ActionButton.vue';
import BooleanTextState from './CardItem/BooleanTextState.vue';
import ToggleStateIcon from './CardItem/ToggleStateIcon.vue';
import LevelTextState from './CardItem/LevelTextState.vue';
import SliderState from './CardItem/SliderState.vue';
import KnobState from './CardItem/KnobState.vue';

export default defineComponent({
  name: 'DeviceCard',
  components: {
    Card,
    Title,
    ActionButton,
    BooleanTextState,
    ToggleStateIcon,
    LevelTextState,
    SliderState,
    KnobState
  },
  props: {
    template: {
      type: Object,
      required: true
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    // Will change
    cardStyle(): string {
      const card = this.template.card;
      let result: string = '';
      if (card.position !== undefined) {
        result += `position: ${card.position};`;
        if (card.x !== undefined) {
          result += `left: ${card.x};`;
        }
        if (card.y !== undefined) {
          result += `top: ${card.y};`;
        }
      }
      if (card.width !== undefined) {
        result += `width: ${card.width};`;
      }
      if (card.height !== undefined) {
        result += `height: ${card.height};`;
      }
      return result;
    }
  }
})
</script>

<style>
</style>