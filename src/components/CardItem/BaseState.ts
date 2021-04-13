import NextDomApi from '../../services/NextDomApi';

export default {
  props: {
    state: {
      type: Object,
      required: true
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    stateValue: {
      get(): any {
        try {
          return this.$store.getters.deviceState(this.state.deviceId, this.state.capability);
        } catch(_) {
          return false;
        }
      },
      set(newValue: any) {
        this.update(newValue);
      }
    }
  },
  methods: {
    update(newValue: any) {
      if (this.enabled) {
        NextDomApi.setDeviceAction(this.state.deviceId, this.state.capability, newValue);
      }
    },
    toggle() {
      this.update(!this.stateValue);
    }
  }
}
