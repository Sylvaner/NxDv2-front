<template>
  <h5>Dimensions</h5>
  <div class="section">
    <div class="p-field-radiobutton">
      <RadioButton id="responsive" name="responsivity" value="1" v-model="responsiveChoice" />
      <label for="responsive">Responsive</label>
    </div>
    <div class="p-field-radiobutton">
      <RadioButton id="fixed" name="responsivity" value="0" v-model="responsiveChoice" />
      <label for="fixed">Fixe</label>
    </div>
  </div>
  <div v-if="responsiveChoice === '0'">
    <InputText v-model="modelValue.config[currentStep].size.width" />
    x
    <InputText v-model="modelValue.config[currentStep].size.height" />
    <Dropdown v-model="modelValue.config[currentStep].size.unit" :options="units" optionLabel="name" optionValue="value" />
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';

export default {
    name: 'ScreenDimenChoice',
    components: {
        InputText,
      RadioButton,
      Dropdown
    },
    props: {
        modelValue: Object,
        currentStep: Number
    },
  data: () => {
      return {
        units: [
          { name: 'Pixels', value: 'px' },
          { name: 'Pourcentage', value: '%' },
          { name: 'REM', value: 'rem' }
        ]
      }
  },
    computed: {
      responsiveChoice: {
        get() {
          return this.modelValue.config[this.currentStep].responsive ? '1' : '0';
        },
        set(newValue) {
          this.modelValue.config[this.currentStep].responsive = newValue === '1';
        }
      }
  }
}
</script>

<style>

</style>
