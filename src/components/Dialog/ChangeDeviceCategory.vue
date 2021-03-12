<template>
  <Dialog header="Change device category" v-model:visible="showed">
    <template #header>
    </template>
    <Listbox v-model="selectedCategory" :options="sortedCategories" optionLabel="name" optionValue="code">
      <template #option="slotProps">
        <div class="device-choice">
          <i :class="slotProps.option.icon + ' fa-fw'"></i>
          <span>{{slotProps.option.name}}</span>
        </div>
      </template>
    </Listbox>
    <template #footer>
		  <Button label="Cancel" icon="pi pi-times" @click="showed = false"/>
      <Button label="Save" icon="pi pi-check" @click="validChoice" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dialog from 'primevue/dialog';
import { Device } from '../../types';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import NextDomApi from '../../services/NextDomApi';

interface CategoryDesc {
  code?: string;
  name: string;
  icon: string;
  score: number;
}

export default defineComponent({
  name: 'ChangeDeviceCategory',
  components: {
    Dialog,
    Button,
    Listbox
  },
  data(): {
    showed: Boolean,
    categories: { [code: string]: CategoryDesc }
    directPoints: { [key: string]: { [name: string]: number } },
    linkedPoints: { [key: string]: any },
    selectedCategory: string,
    deviceId: string
  } {
    return {
      showed: false,
      categories: {
        light: { name: 'Light', icon: 'fa fa-lightbulb', score: 0},
        wallPlug: { name: 'Wall Plug', icon: 'fa fa-plug', score: 0},
        remoteControl: { name: 'Remote control', icon: 'fa fa-gamepad', score: 0},
        doorSensor: { name: 'Door sensor', icon: 'fa fa-door-open', score: 0},
        motionSensor: { name: 'Motion sensor', icon: 'fa fa-running', score: 0},
        other: { name: 'Others', icon: 'fa fa-question', score: 0}
      },
      directPoints: {
        on: {light: 1, wallPlug: 1},
        brightness: {light: 1},
        bri: {light: 1},
        consumption: {wallPlug: 1}
      },
      linkedPoints: {
        ct: {links: ['bri'], target: 'light', score: 10}
      },
      selectedCategory: '',
      deviceId: ''
    }
  },
  mounted() {
    this.eventBus.on('showChangeDeviceCategoryDialog', e => { this.showDialog(e); });
  },
  methods: {
    showDialog(deviceData: Device) {
      this.resetScores();
      this.scoring(deviceData);
      this.deviceId = deviceData.id;
      this.showed = true;
      this.selectedCategory = this.sortedCategories[0].code!;
    },
    resetScores() {
      for (const scoreCategory in this.categories) {
        this.categories[scoreCategory].score = 0;
      }
    },
    scoring(deviceData: Device) {
      const capabilities = Object.keys(deviceData.capabilities);
      this.searchDirectPointsFromCapabilitiesNames(capabilities);
      this.searchLinkedPointsFromCapabilitiesNames(capabilities);
    },
    searchDirectPointsFromCapabilitiesNames(deviceCapabilities: string[]) {
      for (const capabilityToTest in this.directPoints) {
        if (deviceCapabilities.includes(capabilityToTest)) {
          this.attribDirectPoints(capabilityToTest)
        }
      }
    },
    attribDirectPoints(foundCapability: string) {
      for (const target in this.directPoints[foundCapability]) {
        this.categories[target].score += this.directPoints[foundCapability][target];
      }
    },
    searchLinkedPointsFromCapabilitiesNames(deviceCapabilities: string[]) {
      for (const capabilityToTest in this.linkedPoints) {
        if (deviceCapabilities.includes(capabilityToTest)) {
          this.testLinkPoints(deviceCapabilities, this.linkedPoints[capabilityToTest])
        }
      }
    },
    testLinkPoints(deviceCapabilities: string[], linkData: {links: string[], target: string, score: number}) {
      let linksFound = 0;
      for (const link of linkData.links) {
        if (deviceCapabilities.includes(link)) {
          ++linksFound;
        }
      }
      if (linksFound === linkData.links.length) {
        this.categories[linkData.target].score += linkData.score;
      }
    },
    validChoice() {
      NextDomApi.setCategory(this.deviceId, this.selectedCategory).then(() => {
        this.$emit('change');
        this.showed = false;
      });
    }
  },
  computed: {
    sortedCategories(): CategoryDesc[] {
      const listCategoriesFormat = Object.keys(this.categories).map((code) => { return {code, ...this.categories[code]}});
      return listCategoriesFormat.sort((a: any, b: any) => (a.score < b.score) ? 1 : -1);
    }
  }
})
</script>

<style>
.device-choice span {
  margin-left: 1rem;
}
</style>