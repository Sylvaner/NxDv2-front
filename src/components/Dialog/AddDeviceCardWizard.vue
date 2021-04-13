<template>
  <Dialog header="Assistant d'ajout d'une carte" v-model:visible="showed">
    <Steps v-model="currentStep" :items="wizardSteps"/>
    <ModelsChoice @change="onModelSelected" v-if="currentStep === 0" />
    <component :is="currentStepComponent" v-model="currentModel" :currentStep="currentStep - 1" v-else />
    <!--
    <keep-alive>
    </keep-alive>
    -->
    <Button label="Suivant" v-if="currentStep > 0 && currentStep < wizardSteps.length - 1" @click="++currentStep" />
    <Button label="Ajouter" v-if="currentStep === wizardSteps.length - 1" @click="addCard"/>
  </Dialog>
  <div class="fab-buttons">
    <Button icon="pi pi-plus" class="p-button-rounded" @click="showAddDeviceWizard"/>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Steps from './Steps.vue';
import ModelsChoice from './WizardSteps/ModelsChoice.vue';
import TextChoice from './WizardSteps/TextChoice.vue';
import ToggleStateIconChoice from './WizardSteps/ToggleStateIconChoice.vue';
import SingleDeviceChoice from './WizardSteps/SingleDeviceChoice.vue';
import DimmerChoice from './WizardSteps/DimmerChoice.vue';

export default {
    name: 'AddDeviceCardWizard',
    components: {
        Button,
        Dialog,
        Steps,
        ModelsChoice,
        TextChoice,
        SingleDeviceChoice,
        ToggleStateIconChoice,
        DimmerChoice
    },
    data: () => {
        return {
            showed: false,
            wizardSteps: [],
            currentStep: 0,
            currentModel: {}
        };
    },
    created() {
        this.wizardSteps = [
                {
                    label: 'Choix du modèle'
                }
            ];
    },
    methods: {
        showAddDeviceWizard() {
            this.showed = true;
        },
        onModelSelected(selectedModel) {
            this.wizardSteps = [this.wizardSteps[0], ...selectedModel.wizardSteps];
            this.currentModel = selectedModel;
            ++this.currentStep;
        },
        addCard() {
            this.$store.commit('addRenderCard', this.currentModel.getResult());
            this.showed = false;
            this.currentStep = 0;
        }
    },
    computed: {
        currentStepComponent() {
            return this.wizardSteps[this.currentStep].component;
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