<template>
    <component
        v-for="templateItem in template.items"
        :key="`ci-${templateItem.id}`"
        v-bind="templateItem.props"
        :is="templateItem.type">
    </component>
</template>

<script lang="ts">
import Title from './CardItem/Title.vue';
import ActionButton from './CardItem/ActionButton.vue';
import BooleanTextState from './CardItem/BooleanTextState.vue';

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Card',
  components: {
    Title,
    ActionButton,
    BooleanTextState
  },
  props: {
    template: {
      type: Object,
      required: true
    }
  }
})
</script>
