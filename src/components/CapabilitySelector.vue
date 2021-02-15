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

<script lang="ts">
import { computed, defineComponent } from "vue";
import CascadeSelect from "primevue/cascadeselect";
import { CapabilityAccessor, Device } from "@/services/NextDomApi";

type AccessorType = "get" | "set" | "";

interface DeviceChoice {
  name: string;
  capabilities: Array<CapabilityChoice>;
}

export interface CapabilityChoice {
  name: string;
  capabilityData: CapabilityAccessor;
}

export interface CapabilitySelectorChoice {
  device: DeviceChoice;
  capability: CapabilityChoice;
}

interface ChangeEvent {
  originalEvent: Event;
  value: any;
}

export default defineComponent({
  name: "CapabilitySelector",
  components: {
    CascadeSelect
  },
  emits: ["update:modelValue", "change"],
  props: {
    devices: Object,
    filter: {
      type: String,
      default: ""
    },
    modelValue: Object
  },
  data: () => {
    return new (class {
      devices!: Array<Device>;
      filter!: AccessorType;
      filteredDevices: Array<DeviceChoice> = [];
      selectedCapability: CapabilityChoice = {
        name: "",
        capabilityData: {}
      };
      lastSelectedDevice: DeviceChoice = { name: "", capabilities: [] };
    })();
  },
  mounted() {
    if (this.filter !== "") {
      this.filteredDevices = this.getDevicesCapabilities(
        this.devices,
        this.filter
      );
    }
  },
  methods: {
    getDevicesCapabilities(
      devices: Array<Device>,
      accessorType: AccessorType
    ): Array<DeviceChoice> {
      const devicesCapabilities: Array<DeviceChoice> = [];
      for (const device of devices) {
        const capabilities: Array<CapabilityChoice> = [];
        if ("capabilities" in device) {
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
    capabilitySelected(e: ChangeEvent) {
      this.choice = {
        device: this.lastSelectedDevice,
        capability: e.value
      };
      this.$emit("change");
    },
    groupChanged(e: ChangeEvent) {
      this.lastSelectedDevice = e.value;
    }
  },
  setup(props, { emit }) {
    const choice = computed({
      get: () => props.modelValue,
      set: (newValue) => emit("update:modelValue", newValue)
    });
    return {
      choice
    };
  }
});
</script>