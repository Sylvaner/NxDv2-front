<template>
  <Dialog v-model:visible="showedValue" modal :style="{width: '90vw', height: '90vw'}">
    <template #header>
      Device Wizard
    </template>
    <SelectButton v-model="deviceValue.category" :options="deviceCategories" optionLabel="name" optionValue="value"></SelectButton>
    <Fieldset v-if="deviceValue.category === 'light'" legend="Light">
      <h5>Etat</h5>
      <Dropdown v-model="bufferedConfig.state" :options="Object.keys(deviceValue.capabilities)" placeholder="Information d'état" />
      <h5>Luminosité</h5>
      <Dropdown v-model="bufferedConfig.brightness" :options="Object.keys(deviceValue.capabilities)" placeholder="Information de la luminosité" />
    </Fieldset>
    <template #footer>
      <Button label="Annuler" icon="pi pi-times" @click="showedValue = false" class="p-button-text"/>
      <Button label="Sauvegarder" icon="pi pi-check" @click="saveChanges" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Fieldset from 'primevue/fieldset';
import Dropdown from 'primevue/dropdown';
import {computed, defineComponent} from "vue";
import NextDomApi from '@/services/NextDomApi';

export default defineComponent({
  name: "DeviceWizard",
  components: {
    Button,
    SelectButton,
    Fieldset,
    Dropdown,
    Dialog
  },
  props: {
    modelValue: Object,
    showed: Boolean,
  },
  data: () => {
    return new (class {
      deviceCategories: {name: string; value: string}[] = [
        {name: 'Unknown', value: 'unknown'},
        {name: 'Light', value: 'light'}
      ];
    bufferedConfig = {
      state: null,
      brightness: null
    }
    })();
  },
  emits: ["update:modelValue", "update:showed"],
  setup(props, { emit }) {
    const showedValue = computed({
      get: () => props.showed,
      set: (value) => emit('update:showed', value)
    })
    const deviceValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    return {
      showedValue,
      deviceValue
    }
  },
  methods: {
    saveChanges() {
      console.log(this.modelValue);
      NextDomApi.setCategory(this.deviceValue!.id, this.deviceValue!.category, this.bufferedConfig).then(() => {
        console.log('OK');
      });
      this.showedValue = false;
    }
  }
});
</script>

<style scoped>

</style>