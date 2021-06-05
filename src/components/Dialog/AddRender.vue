<template>
  <Dialog header="Ajout d'un rendu" v-model:visible="showed">
    <Steps v-model="currentStep" :items="renderData.wizardSteps"/>
    <component :is="currentStepComponent" v-model="renderData" :currentStep="currentStep" />
    <Button label="Suivant" v-if="currentStep >= 0 && currentStep < renderData.wizardSteps.length - 1" @click="++currentStep" />
    <Button label="Ajouter" v-if="currentStep === renderData.wizardSteps.length - 1" @click="addRender"/>
  </Dialog>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Steps from './Steps.vue';
import ModelsChoice from './WizardSteps/ModelsChoice.vue';
import TextChoice from './WizardSteps/TextChoice.vue';
import ScreenDimenChoice from '../RenderHelpers/ScreenDimenChoice.vue';
import ToggleStateIconChoice from './WizardSteps/ToggleStateIconChoice.vue';
import SingleDeviceChoice from './WizardSteps/SingleDeviceChoice.vue';
import DimmerChoice from './WizardSteps/DimmerChoice.vue';
import { RenderModel } from '../RenderHelpers/RenderModel';
import NextDomApi from "../../services/NextDomApi";
export default {
    name: 'AddRender',
    components: {
        Button,
        Dialog,
        Steps,
        ModelsChoice,
        TextChoice,
        ScreenDimenChoice,
        SingleDeviceChoice,
        ToggleStateIconChoice,
        DimmerChoice
    },
    props: {
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    data: () => {
        return {
            currentStep: 0,
            renderData:  new RenderModel()
        };
    },
    methods: {
        addRender() {
          const renderToSave = {
              name: this.renderData.config[0],
              config: {
                responsive: this.renderData.config[1].responsive,
                size: this.renderData.config[1].size
              },
              cards: []
          }
          NextDomApi.addRender(renderToSave).then((response) => {
            this.showed = false;
          })
        }
    },
    computed: {
        currentStepComponent() {
            console.log(this.renderData);
            return this.renderData.wizardSteps[this.currentStep].component;
        },
        showed: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                return newValue;
            }
        }
    }
}
</script>

<style scoped>
.fab-buttons {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
}

.fab-buttons .p-button.p-button-icon-only {
    height: 3rem;
    width: 3rem;
}

.fab-buttons .pi {
    font-size: 1.5rem;
}
</style>
