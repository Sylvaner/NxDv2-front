<template>
    <Listbox v-model="modelValue" :options="devices" optionLabel="name" @change="deviceChanged">
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
        modelValue: Object
    },
    emits: ['update:modelValue'],
    created() {
      NextDomApi.getDevices().then((devices) => {
        this.$store.commit('updatesDevices', devices);
      });
    },
    methods: {
        deviceChanged() {
            this.$emit('update:modelValue', this.modelValue);
        }
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