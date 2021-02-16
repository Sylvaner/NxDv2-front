<template>
  <div v-if="capability.get.type === 'boolean'" class="p-grid">
    <div class="p-field-radiobutton p-col-6">
      <RadioButton
        id="boolean-true"
        name="boolean"
        value="true"
        v-model="capabilityValue"
      />
      <label for="boolean-true">Vrai</label>
    </div>
    <div class="p-field-radiobutton p-col-6">
      <RadioButton
        id="boolean-false"
        name="boolean"
        value="false"
        v-model="capabilityValue"
      />
      <label for="boolean-false">Faux</label>
    </div>
  </div>
  <div class="p-grid" v-else>
    <InputText class="p-col-6" type="text" v-model="capabilityValue" />
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import { computed } from 'vue';

export default ({
  name: 'ScenarioCapabilityValue',
  components: {
    RadioButton,
    InputText
  },
  props: {
    capability: Object,
    modelValue: String
  },
  setup(props, { emit }) {
    const capabilityValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    return {
      capabilityValue
    };
  }
});
</script>
