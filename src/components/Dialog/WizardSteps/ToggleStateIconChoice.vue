<template>
    <h4>Label</h4>
    <InputText v-model="modelValue.config[currentStep].label" />
    <h4>On</h4>
    <Listbox v-model="modelValue.config[currentStep].onIcon" :options="icons">
        <template #option="slotProps">
            <i :class="slotProps.option"></i>
        </template>
    </Listbox>
    <h4>Off</h4>
    <Listbox v-model="modelValue.config[currentStep].offIcon" :options="icons">
        <template #option="slotProps">
            <i :class="slotProps.option"></i>
        </template>
    </Listbox>
    <h4>Capacité</h4>
    <Listbox v-model="modelValue.config[currentStep].capability" :options="formattedCapabilities" optionLabel="name" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';

export default {
    name: 'ToggleStateIconChoice',
    components: {
        InputText,
        Listbox
    },
    props: {
        modelValue: {
            type: Object,
            default: {}
        },
        currentStep: Number
    },
    data: () => {
        return {
            onIcon: '',
            offIcon: '',
            icons: icons
        }
    },
    emits: ['update:modelValue'],
    computed: {
        formattedCapabilities() {
            const capabilities = [];
            for (const capabilityName of Object.keys(this.modelValue.getDevice().capabilities)) {
                capabilities.push({
                    name: capabilityName,
                    capability: this.modelValue.getDevice().capabilities[capabilityName]
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