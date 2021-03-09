import NextDomApi from '../../services/NextDomApi';

export default {
  props: {
    state: {
      type: Object,
      required: true
    }
  },
  computed: {
    stateValue(): any {
      return this.$store.getters.deviceState(this.state.deviceId, this.state.capability);
    }
  },
  methods: {
    update(newValue: any) {
      NextDomApi.setDeviceAction(this.state.deviceId, this.state.capability, newValue);
    }
  }
}
