<template>
  <div v-if="capability.get.type === 'boolean'" class="p-grid">
    <div class="p-field-radiobutton p-col-6">
      <RadioButton
        id="boolean-true"
        name="boolean"
        value="true"
        v-model="conditionValue"
        @change="updateCondition"
      />
      <label for="boolean-true">Vrai</label>
    </div>
    <div class="p-field-radiobutton p-col-6">
      <RadioButton
        id="boolean-false"
        name="boolean"
        value="false"
        v-model="conditionValue"
        @change="updateCondition"
      />
      <label for="boolean-false">Faux</label>
    </div>
  </div>
  <div class="p-grid" v-else>
    <Dropdown
      class="p-col-6"
      v-model="conditionEquality"
      :options="equalities"
      optionLabel="name"
      optionValue="code"
      placeholder="Select a condition"
      @change="updateCondition"
    />
    <InputText
      class="p-col-6"
      type="text"
      v-model="conditionValue"
      @change="updateCondition"
    />
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { computed } from 'vue';

export default ({
  name: 'ScenarioCapabilityValue',
  components: {
    RadioButton,
    Dropdown,
    InputText
  },
  props: {
    capability: Object,
    modelValue: Object
  },
  data: () => {
    return {
      conditionValue: '',
      conditionEquality: '=='
    };
  },
  mounted() {
    this.updateCondition();
  },
  methods: {
    updateCondition() {
      if (
        this.capability !== undefined &&
        this.capability.get.type === 'boolean'
      ) {
        this.conditionEquality = '==';
      }
      this.condition = {
        test: this.conditionEquality,
        value: this.conditionValue
      };
    }
  },
  setup(props, { emit }) {
    const condition = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });
    const equalities = computed(() => {
      const baseEqualities = [
        { name: '<', code: '<' },
        { name: '<=', code: '<=' },
        { name: '=', code: '==' },
        { name: '>', code: '>' },
        { name: '>=', code: '>=' },
        { name: '!=', code: '!=' }
      ];
      if (
        props.capability !== undefined &&
        props.capability.get !== undefined &&
        props.capability.get.type === 'number'
      ) {
        return baseEqualities;
      } else {
        return [baseEqualities[2], baseEqualities[5]];
      }
    });

    return {
      condition,
      equalities
    };
  }
});
</script>
