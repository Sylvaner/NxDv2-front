<template>
  <div class="content-section">
    <Card v-if="devices.length > 0">
      <template #content>
        <Fieldset legend="Informations">
          <div class="p-fluid p-grid">
            <div class="p-col-6">
              <span class="p-float-label">
                <InputText
                  id="scenarioName"
                  type="text"
                  v-model="scenarioName"
                />
                <label for="scenarioName">Scenario name</label>
              </span>
            </div>
          </div>
        </Fieldset>
        <Fieldset legend="Déclencheur">
          <div class="p-fluid p-grid">
            <div class="p-col-6">
              <CapabilitySelector
                filter="get"
                :devices="devices"
                v-model="trigger"
              ></CapabilitySelector>
            </div>
            <div class="p-col-6" v-if="trigger !== null">
              {{ trigger.device.name }} - {{ trigger.capability.name }}
            </div>
          </div>
        </Fieldset>
        <Fieldset v-if="trigger !== null" legend="Si la valeur est">
          <ScenarioCapabilityCondition
            :capability="trigger.capability.capabilityData"
            v-model="triggerCondition"
          ></ScenarioCapabilityCondition>
        </Fieldset>
        <Fieldset legend="Action" v-if="triggerCondition !== null">
          <div class="p-fluid p-grid">
            <div class="p-col-6">
              <CapabilitySelector
                filter="set"
                :devices="devices"
                v-model="action"
              ></CapabilitySelector>
            </div>
            <div class="p-col-6" v-if="action !== null">
              {{ action.device.name }} - {{ action.capability.name }}
            </div>
          </div>
        </Fieldset>
        <Fieldset v-if="action !== null" legend="Valeur">
          <ScenarioCapabilityValue
            :capability="action.capability.capabilityData"
            v-model="actionValue"
          ></ScenarioCapabilityValue>
        </Fieldset>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Ajouter" @click="add" />
      </template>
    </Card>
  </div>
</template>

<script>
import NextDomApi from '@/services/NextDomApi';
import ScenarioCapabilityValue from '@/components/ScenarioCapabilityValue.vue';
import ScenarioCapabilityCondition from '@/components/ScenarioCapabilityCondition.vue';
import CapabilitySelector from '@/components/CapabilitySelector.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';

export default ({
  name: 'Scenarios',
  components: {
    InputText,
    CapabilitySelector,
    ScenarioCapabilityCondition,
    ScenarioCapabilityValue,
    Button,
    Card,
    Fieldset
  },
  data: () => {
    return {
      devices: [],
      scenarioName: '',
      trigger: null,
      triggerCondition: null,
      action: null,
      actionValue: null
    };
  },
  mounted() {
    NextDomApi.getDevices().then((devices) => {
      this.devices = devices;
    });
  },
  methods: {
    add() {
      if (
        this.trigger !== null &&
        this.triggerCondition !== null &&
        this.action !== null
      ) {
        const modelData = {
          model: 'if-then',
          name: this.scenarioName,
          triggerDevice: this.trigger.device.name,
          triggerCapability: this.trigger.capability,
          triggerCondition: this.triggerCondition.test,
          triggerValue: this.triggerCondition.value,
          actionDevice: this.action.device.name,
          actionCapability: this.action.capability,
          actionValue: this.actionValue
        };
        NextDomApi.postScenario(modelData);
      }
    }
  }
});
</script>

<style scoped>
fieldset {
  margin-bottom: 1rem;
}
</style>
