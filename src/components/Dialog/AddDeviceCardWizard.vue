<template>
  <Dialog header="Assistant d'ajout d'une carte" v-model:visible="showed" @change="ttt">
    <Steps v-model="currentStep" :items="wizardSteps" @change="ttt" />
    <ModelsChoice @change="onModelSelected" v-if="currentStep === 0" />
    <component :is="currentStepComponent" v-model="cardConfig[currentStep - 1]" :deviceConfig="cardConfig[deviceStep]" v-else />
    <keep-alive>
    </keep-alive>
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

export default {
    name: 'AddDeviceCardWizard',
    components: {
        Button,
        Dialog,
        Steps,
        ModelsChoice,
        TextChoice,
        SingleDeviceChoice,
        ToggleStateIconChoice
    },
    data: () => {
        return {
            showed: false,
            wizardSteps: [],
            deviceStep: 0,
            currentStep: 0,
            cardConfig: []
        };
    },
    created() {
        this.wizardSteps = [
                {
                    label: 'Choix du modèle'
                }
            ];
        console.log(this.$store.getters.devices());
    },
    methods: {
        showAddDeviceWizard() {
            this.showed = true;
        },
        onModelSelected(selectedModel) {
            this.wizardSteps = [this.wizardSteps[0], ...selectedModel.wizardSteps];
            this.deviceStep = selectedModel.deviceStep;
            this.cardConfig = selectedModel.defaultValues;
            ++this.currentStep;
        },
        ttt() {
            console.log(this.deviceStep);
            console.log(this.cardConfig);
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