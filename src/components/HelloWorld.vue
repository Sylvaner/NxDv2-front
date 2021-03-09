<template>
  <Card :template="templates[0]"></Card>

  <button @click="count++">count is: {{ count }}</button>
  {{ test }}
</template>

<script lang="ts">
import Card from './Card.vue';

import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  components: {
    Card
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      templates: [
        {
          id: 'a-test-id',
          items: [
            { type: 'Title', props: {title: 'Mon titre' }},
            { type: 'BooleanTextState', props: {showLabel: true, label: 'My state', on: 'On', off: 'Off', state: {deviceId: 'lights-2', capabilityName: 'on'}}},
            { type: 'ActionButton', props: {label: 'On', action: {deviceId: 'lights-2', capability: 'on', targetValue: true}}},
            { type: 'ActionButton', props: {label: 'Off', action: {deviceId: 'lights-2', capability: 'on', targetValue: false}}}
          ]
        }
      ]
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  },
  computed: {
    test(): number {
      return this.$store.getters.aaa;
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
