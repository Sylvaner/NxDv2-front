<template>
    <h4>Label</h4>
    <InputText v-model="modelValue.config[currentStep].label" />
    <h4>Réglage</h4>
    <div class="p-grid">
        <div class="p-col">
            <Knob v-model="sampleValue" :min="0" :max="255" />
            <input type="radio" name="sliderChoice" value="KnobState" @click="updateValue" />
        </div>
        <div class="p-col">
            <Slider v-model="sampleValue" :min="0" :max="255" />
            <input type="radio" name="sliderChoice" value="SliderState" @click="updateValue" />
        </div>
    </div>
    <h4>Capacité</h4>
    <Listbox v-model="modelValue.config[currentStep].capability" :options="formattedCapabilities" optionLabel="name" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';

export default {
    name: 'DimmerChoice',
    components: {
        InputText,
        Knob,
        Listbox,
        Slider
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
            sampleValue: 128
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
            return capabilities;
        }
    },
    methods: {
        updateValue(event) {
            this.modelValue.config[this.currentStep].type = event.path[0].value;
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