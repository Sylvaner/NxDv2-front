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

<script lang="ts">
import { computed, defineComponent } from "vue";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

export interface CapabilityCondition {
  test: string;
  value: any;
}

interface Equality {
  name: string;
  code: string;
}

export default defineComponent({
  name: "ScenarioCapabilityValue",
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
    return new (class {
      conditionValue: string = "";
      conditionEquality: string = "==";
    })();
  },
  emits: ["update:modelValue"],
  mounted() {
    this.updateCondition();
  },
  methods: {
    updateCondition(): void {
      if (
        this.capability !== undefined &&
        this.capability.get.type === "boolean"
      ) {
        this.conditionEquality = "==";
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
      set: (value) => emit("update:modelValue", value)
    });
    const equalities = computed(() => {
      const baseEqualities: Equality[] = [
        { name: "<", code: "<" },
        { name: "<=", code: "<=" },
        { name: "=", code: "==" },
        { name: ">", code: ">" },
        { name: ">=", code: ">=" },
        { name: "!=", code: "!=" }
      ];
      if (
        props.capability !== undefined &&
        props.capability.get !== undefined &&
        props.capability.get.type === "number"
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