<template>
  <CascadeSelect
    v-model="selectedCapability"
    :options="filteredDevices"
    optionLabel="name"
    optionGroupLabel="name"
    :optionGroupChildren="['capabilities']"
    @change="capabilitySelected"
    @group-change="groupChanged"
  />
</template>

<script>
import { computed } from 'vue';
import CascadeSelect from 'primevue/cascadeselect';

export default ({
  name: 'CapabilitySelector',
  components: {
    CascadeSelect
  },
  props: {
    devices: Array,
    filter: {
      type: String,
      default: ''
    },
    modelValue: Object
  },
  data: () => {
    return {
      filteredDevices: [],
      selectedCapability: {
        name: '',
        capabilityData: {}
      },
      lastSelectedDevice: { name: '', capabilities: [] }
    };
  },
  mounted() {
    if (this.filter !== '') {
      this.filteredDevices = this.getDevicesCapabilities(
        this.devices,
        this.filter
      );
    }
  },
  methods: {
    getDevicesCapabilities(devices, accessorType) {
      const devicesCapabilities = [];
      for (const device of devices) {
        const capabilities = [];
        if ('capabilities' in device) {
          for (const capability of Object.entries(device.capabilities)) {
            if (
              Object.prototype.hasOwnProperty.call(capability[1], accessorType)
            ) {
              capabilities.push({
                name: capability[0],
                capabilityData: capability[1]
              });
            }
          }
        }
        if (capabilities.length > 0) {
          devicesCapabilities.push({
            name: device.name,
            capabilities: capabilities
          });
        }
      }
      return devicesCapabilities;
    },
    capabilitySelected(e) {
      this.choice = {
        device: this.lastSelectedDevice,
        capability: e.value
      };
      this.$emit('change');
    },
    groupChanged(e) {
      this.lastSelectedDevice = e.value;
    }
  },
  setup(props, { emit }) {
    const choice = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    });
    return {
      choice
    };
  }
});
</script>
