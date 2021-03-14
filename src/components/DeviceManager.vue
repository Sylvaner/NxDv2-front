<template>
  <Panel v-for="category in definedCategories" :key="`cat-${category}`" :header="category" toggleable>
    <DataView :value="$store.getters.devicesByCategory(category)" layout="grid">
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
  </Panel>
  <Panel v-if="$store.getters.devicesToManage(showHiddenDevices).length > 0" header="Devices to manage" toggleable>
    <DataTable :value="$store.getters.devicesToManage(showHiddenDevices)" v-model:expandedRows="expandedRows" dataKey="_id">
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column field="id" header="id" sortable></Column>      
      <Column field="name" header="Name" sortable></Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="{data}">
          <Button type="button" icon="pi pi-eye-slash" @click="hideDevice(data)"></Button>
        </template>
      </Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="{data}">
          <Button type="button" icon="pi pi-cog" @click="showChangeDeviceCategoryDialog(data)"></Button>
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="expanded-datatable">
          <h5>Capabilities of {{slotProps.data.name}}</h5>
          <DataTable :value="convertCapabilitiesToDataTableFormat(slotProps.data.capabilities)">
            <Column field="name" header="Name" sortable></Column>
            <Column field="access.get.topic" header="Topic" sortable></Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </Panel>

  <Button class="sidebar-fab" id="sidebar-fab-onpage" type="button" icon="pi pi-cog" @click="sidebarShowed = !sidebarShowed"></Button>
  <Sidebar v-model:visible="sidebarShowed" position="right">
    <h3>Show hidden devices</h3>
    <InputSwitch v-model="showHiddenDevices" />
    <Button class="sidebar-fab" id="sidebar-fab-onbar" type="button" icon="pi pi-cog" @click="sidebarShowed = !sidebarShowed"></Button>
  </Sidebar>
  <ConfirmDialog></ConfirmDialog>
  <ChangeDeviceCategory v-on:change="updateDevices"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Device } from '../services/NextDomApi';
import mitt, { Emitter } from 'mitt';
import NextDomApi, { Capabilities } from '../services/NextDomApi';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import ChangeDeviceCategory from './Dialog/ChangeDeviceCategory.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import Sidebar from 'primevue/sidebar';
import InputSwitch from 'primevue/inputswitch';
import Panel from 'primevue/panel';

export default defineComponent({
  components: {
    Button,
    Column,
    DataTable,
    DataView,
    Card,
    ChangeDeviceCategory,
    ConfirmDialog,
    Sidebar,
    InputSwitch,
    Panel
  },
  data(): {
    expandedRows: Boolean[],
    showChangeDeviceCategoryDialogDialogShowed: Boolean,
    emitter: Emitter,
    sidebarShowed: Boolean,
    showHiddenDevices: Boolean
  } {
    return {
      expandedRows: [],
      showChangeDeviceCategoryDialogDialogShowed: false,
      emitter: mitt(),
      sidebarShowed: false,
      showHiddenDevices: false
    }
  },
  methods: {
    updateDevices() {
      NextDomApi.getDevices().then((devices) => {
        this.$store.commit('updatesDevices', devices);
      });
    },
    setDeviceCategory(device: Device, category: string) {
      device.category = category;
      NextDomApi.setCategory(device.id, category).then(() => {
        this.updateDevices();
      });
    },
    convertCapabilitiesToDataTableFormat(capabilities: Capabilities) {
      const result = [];
      for (let name in capabilities) {
        result.push({
          name,
          access: capabilities[name]
        });
      }
      return result;
    },
    showChangeDeviceCategoryDialog(data: any) {
      this.eventBus.emit('showChangeDeviceCategoryDialog', data);
    },
    hideDevice(data: Device) {
      this.$confirm.require({
        message: 'Do you want to hide this device ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (data.config === undefined) {
            data.config = {};
          }
          data.config['hidden'] = true;
          NextDomApi.setConfig(data.id, data.config).then(() => this.updateDevices());
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    definedCategories(): string[] {
      const devices: Device[] = Object.values(this.$store.getters.devices());
      const deviceWithcategory = devices.filter((device: Device) => device.category !== 'unknown');
      // [...new Set()] pour supprimer les doublons
      return [...new Set(deviceWithcategory.map((device: Device) => device.category))];
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

.sidebar-fab {
  height: 3rem;
  width: 3rem !important;
  border-radius: 1rem 0px 0px 1rem !important;
  z-index: 999;
}

.sidebar-fab span.pi {
  font-size: 1.5rem;
}

#sidebar-fab-onpage {
  position: fixed !important;
  top: 5rem;
  right: 0;
}

#sidebar-fab-onbar {
  position: absolute !important;
  top: 4rem;
  left: -4rem;
}
</style>