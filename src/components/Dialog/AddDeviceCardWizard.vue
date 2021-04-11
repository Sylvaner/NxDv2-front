<template>
  <Dialog header="Assistant d'ajout d'une carte" v-model:visible="showed">
    <Steps v-model="currentStep" :items="wizardSteps" v-on:change="stepChange"/>
        <component :is="currentStepComponent" />
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

export default {
    name: 'AddDeviceCardWizard',
    components: {
        Button,
        Dialog,
        Steps,
        ModelsChoice
    },
    data: () => {
        return {
            showed: false,
            wizardSteps: [],
            currentStep: 0
        };
    },
    created() {
        this.wizardSteps = [
                {
                label: 'Choix du modèle',
                component: 'ModelsChoice'
                },
                {
                    label: 'Configuration du modèle',
                    component: 'dazd'
                }
            ]
    },
    methods: {
        showAddDeviceWizard() {
            this.showed = true;
        },
        stepChange() {
            console.log('coucou');
            console.log(this.currentStep);
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