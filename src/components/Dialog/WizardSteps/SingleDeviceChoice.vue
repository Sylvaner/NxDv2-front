<template>
    <Listbox v-model="modelValue.config[currentStep]" :options="devices" optionLabel="name">
        <template #option="slotProps">
            <div>{{ slotProps.option.name }} ({{ slotProps.option.id }})</div>
        </template>
    </Listbox>
</template>

<script>
import Listbox from 'primevue/listbox';
import NextDomApi from '../../../services/NextDomApi';

export default {
    name: 'TextInput',
    components: {
        Listbox
    },
    props: {
        modelValue: Object,
        currentStep: Number
    },
    emits: ['update:modelValue'],
    created() {
      NextDomApi.getDevices().then((devices) => {
        this.$store.commit('updateDevices', devices);
      });
    },
    computed: {
        devices() {
            return Object.values(this.$store.getters.devices());
        }
    }
}
</script>

<style>

</style>
