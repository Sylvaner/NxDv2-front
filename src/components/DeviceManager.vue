<template>
  <div v-for="category in definedCategories" :key="`cat-${category}`">
    <h2>{{ category }}</h2>
      <li v-for="device in devicesByCategory(category)" :key="device._id">
        <span>{{ device.name }}</span>
      </li>
  </div>
  <div v-if="unknownDevices.length > 0">
    <h2>Unknown devices</h2>
    <ul>
      <li v-for="device in unknownDevices" :key="device._id">
        <span>{{ device.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Device } from '../types';
import NextDomApi from '../services/NextDomApi';

export default defineComponent({
  data(): {
    devices: Device[]
  } {
    return {
      devices: []
    }
  },
  mounted() {
    this.updateDevices();
  },
  methods: {
    updateDevices() {
      NextDomApi.getDevices().then((devices) => {
        this.devices = devices;
      });
    },
    devicesByCategory(category: string): Device[] {
      return this.devices.filter(device => device.category === category);
    },
    setDeviceCategory(device: Device, category: string) {
      device.category = category;
      NextDomApi.setCategory(device.id, category).then(() => {
        this.updateDevices();
      });
    }
  },
  computed: {
    definedCategories(): string[] {
      // [...new Set()] pour supprimer les doublons
      return [...new Set(this.devices.filter(device => device.category !== 'unknown').map(device => device.category))];
    },
    unknownDevices(): Device[] {
      return this.devicesByCategory('unknown');
    }
  }
})
</script>
