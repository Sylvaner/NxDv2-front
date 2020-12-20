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
import { Options, Vue, prop, setup } from "vue-class-component";
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

class CapabilitySelectProps {
  devices = prop({
    type: Object,
    required: true
  });
  filter = prop({
    type: String,
    default: "",
    required: false
  });
}

function useChoice(props: any, emit: any) {
  function set(capabilityChoice: CapabilitySelectorChoice) {
    emit("update:modelValue", capabilityChoice);
  }
  return {
    set
  };
}

@Options({
  components: {
    CascadeSelect
  },
  emits: ["update:modelValue", "change"]
})
export default class CapabilitySelector extends Vue.with(
  CapabilitySelectProps
) {
  devices!: Array<Device>;
  filter!: AccessorType;
  private filteredDevices: Array<DeviceChoice> = [];
  private selectedCapability: CapabilityChoice = {
    name: "",
    capabilityData: {}
  };
  private lastSelectedDevice: DeviceChoice = { name: "", capabilities: [] };

  mounted() {
    if (this.filter !== "") {
      this.filteredDevices = this.getDevicesCapabilities(
        this.devices,
        this.filter
      );
    }
  }

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
  }

  choice = setup(() => {
    return useChoice(this.$props, this.$emit);
  });

  capabilitySelected(e: ChangeEvent) {
    this.choice.set({
      device: this.lastSelectedDevice,
      capability: e.value
    });
    this.$emit("change");
  }

  groupChanged(e: ChangeEvent) {
    this.lastSelectedDevice = e.value;
  }
}
</script>