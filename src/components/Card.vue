<template>
  <div class="card" :style="cardStyle">
    <component
        v-for="templateItem in template.items"
        :key="`ci-${templateItem.id}`"
        v-bind="templateItem.props"
        :is="templateItem.type">
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Title from './CardItem/Title.vue';
import ActionButton from './CardItem/ActionButton.vue';
import BooleanTextState from './CardItem/BooleanTextState.vue';
import ToggleStateIcon from './CardItem/ToggleStateIcon.vue';
import LevelTextState from './CardItem/LevelTextState.vue';
import SliderState from './CardItem/SliderState.vue';

export default defineComponent({
  name: 'Card',
  components: {
    Title,
    ActionButton,
    BooleanTextState,
    ToggleStateIcon,
    LevelTextState,
    SliderState
  },
  props: {
    template: {
      type: Object,
      required: true
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
.card {
  border: 1px solid #CCC;
  display: block;
  border-radius: 0.5rem;
  box-shadow: 4px 2px 5px 0px rgba(0,0,0,0.75);
  background-color: white;
}
</style>