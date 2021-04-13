<template>
    <h4>On</h4>
    <Listbox v-model="modelValue.onIcon" :options="icons" @change="selectedInformation">
        <template #option="slotProps">
            <i :class="slotProps.option"></i>
        </template>
    </Listbox>
    <h4>Off</h4>
    <Listbox v-model="modelValue.offIcon" :options="icons" @change="selectedInformation">
        <template #option="slotProps">
            <i :class="slotProps.option"></i>
        </template>
    </Listbox>
    <h4>Command</h4>
    <Listbox v-model="modelValue.capability" :options="formattedCapabilities" optionLabel="name" @change="selectedInformation">
    </Listbox>
</template>

<script>
import Listbox from 'primevue/listbox';

export default {
    name: 'ToggleStateIconChoice',
    components: {
        Listbox
    },
    props: {
        modelValue: {
            type: Object,
            default: {}
        },
        deviceConfig: Object
    },
    data: () => {
        return {
            onIcon: '',
            offIcon: '',
            icons: icons
        }
    },
    emits: ['update:modelValue'],
    methods: {
        selectedInformation() {
            console.log(this.deviceConfig);
//            this.$emit('update:modelValue', this.modelValue);
        }
    },
    computed: {
        formattedCapabilities() {
            const capabilities = [];
            for (const capabilityName of Object.keys(this.deviceConfig.capabilities)) {
                capabilities.push({
                    name: capabilityName,
                    capability: this.deviceConfig.capabilities[capabilityName]
                })
            }
            console.log(capabilities);
            return capabilities;
        }
    }
}

const icons = [
    'pi pi-circle-on',
    'pi pi-circle-off',
    'pi pi pi-check',
    'pi pi pi-times'
];
</script>

<style>

</style>