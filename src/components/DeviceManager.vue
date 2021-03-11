<template>
  <div v-for="category in definedCategories" :key="`cat-${category}`" class="devices-category">
    <h2>{{ category }}</h2>
    <DataView :value="devicesByCategory(category)" layout="grid">
      <template #grid="slotProps">
        <div class="p-col-12 p-md-4">
          <Card>
            <template #title>
              {{ slotProps.data.name }}
            </template>
          </Card>
        </div>
      </template>
    </DataView>
  </div>
  <div v-if="unknownDevices.length > 0">
    <h2>Unknown devices</h2>
    <DataTable :value="unknownDevices" v-model:expandedRows="expandedRows" dataKey="_id">
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column field="id" header="id" sortable></Column>      
      <Column field="name" header="Name" sortable></Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="{data}">
          <Button type="button" icon="pi pi-cog" @click="changeDeviceCategory(data)"></Button>
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="expanded-datatable">
          <h5>Capabilities of {{slotProps.data.name}}</h5>
          <DataTable :value="capabilitiesToDataTable(slotProps.data.capabilities)">
            <Column field="name" header="Name" sortable></Column>
            <Column field="access.get.topic" header="Topic" sortable></Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
    <ul>
      <li v-for="device in unknownDevices" :key="device._id">
        <span>{{ device.name }}</span>
      </li>
    </ul>
  </div>
  <ChangeDeviceCategory />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Device } from '../types';
import mitt, { Emitter } from 'mitt';
import NextDomApi, { Capabilities } from '../services/NextDomApi';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import ChangeDeviceCategory from './Dialog/ChangeDeviceCategory.vue';

export default defineComponent({
  components: {
    Button,
    Column,
    DataTable,
    DataView,
    Card,
    ChangeDeviceCategory
  },
  data(): {
    devices: Device[],
    expandedRows: Boolean[],
    changeDeviceCategoryDialogShowed: Boolean,
    emitter: Emitter
  } {
    return {
      devices: [],
      expandedRows: [],
      changeDeviceCategoryDialogShowed: false,
      emitter: mitt()
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
    },
    capabilitiesToDataTable(capabilities: Capabilities) {
      const result = [];
      for (let name in capabilities) {
        result.push({
          name,
          access: capabilities[name]
        });
      }
      return result;
    },
    changeDeviceCategory(data: any) {
      this.eventBus.emit('showChangeDeviceCategoryDialog', data);
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

<style>
.expanded-datatable {
  padding: 0rem 2rem 1rem 2rem;
}

.devices-category .p-col-12 {
  padding: 1rem !important;
}
</style>