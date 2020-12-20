<template>
  <div class="content-section">
    <Card v-if="devices.length > 0">
      <template #content>
        <div class="p-fluid p-grid">
          <div class="p-col-6">
            <span class="p-float-label">
              <InputText id="scenarioName" type="text" v-model="scenarioName" />
              <label for="scenarioName">Scenario name</label>
            </span>
          </div>
        </div>
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
        <ScenarioCapabilityCondition
          v-if="trigger !== null"
          :capability="trigger.capability.capabilityData"
          v-model="triggerCondition"
        ></ScenarioCapabilityCondition>
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
        <ScenarioCapabilityValue
          v-if="action !== null"
          :capability="action.capability.capabilityData"
          v-model="actionValue"
        ></ScenarioCapabilityValue>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Ajouter" @click="add" />
      </template>
    </Card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NextDomApi, { Device } from "@/services/NextDomApi";
import CapabilitySelector, {
  CapabilitySelectorChoice
} from "@/components/CapabilitySelector.vue";
import ScenarioCapabilityCondition, {
  CapabilityCondition
} from "@/components/ScenarioCapabilityCondition.vue";
import ScenarioCapabilityValue from "@/components/ScenarioCapabilityValue.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import Fieldset from "primevue/fieldset";

export default defineComponent({
  name: "Scenarios",
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
    return new (class {
      devices: Array<Device> = [];
      scenarioName: string = "";
      trigger: CapabilitySelectorChoice | null = null;
      triggerCondition: CapabilityCondition | null = null;
      action: CapabilitySelectorChoice | null = null;
      actionValue: boolean | number | string | null = null;
    })();
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
          model: "if-then",
          name: this.scenarioName,
          triggerDevice: this.trigger.device.name,
          triggerCapability: this.trigger.capability,
          triggerCondition: this.triggerCondition.test,
          triggerValue: this.triggerCondition.value,
          actionDevice: this.action.device.name,
          actionCapability: this.action.capability,
          actionValue: this.actionValue
        };
        console.log(modelData);
        NextDomApi.postScenario(modelData);
        console.log("add");
      }
    }
  }
});
</script>