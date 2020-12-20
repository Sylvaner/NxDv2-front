<template>
  <Fieldset legend="Valeur">
    <template v-if="capability.get.type === 'boolean'">
      <div class="p-field-radiobutton">
        <RadioButton
          id="boolean-true"
          name="boolean"
          value="true"
          v-model="capabilityValue"
        />
        <label for="boolean-true">Vrai</label>
      </div>
      <div class="p-field-radiobutton">
        <RadioButton
          id="boolean-false"
          name="boolean"
          value="false"
          v-model="capabilityValue"
        />
        <label for="boolean-false">Faux</label>
      </div>
    </template>
    <div class="p-grid" v-else>
      <InputText class="p-col-6" type="text" v-model="capabilityValue" />
    </div>
  </Fieldset>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import RadioButton from "primevue/radiobutton";
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "ScenarioCapabilityValue",
  components: {
    RadioButton,
    Fieldset,
    InputText
  },
  props: {
    capability: Object,
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const capabilityValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });

    return {
      capabilityValue
    };
  }
});
</script>