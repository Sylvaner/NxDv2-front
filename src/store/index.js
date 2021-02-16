import { createStore } from 'vuex';

export default createStore({
  state: {
    states: []
  },
  mutations: {
    setState(state, payload) {
      state.states[payload.deviceId] = payload.state;
    }
  },
  getters: {
    deviceState: (state) => (deviceId) => {
      if (state.states[deviceId] !== undefined) {
        return state.states[deviceId];
      }
      return undefined;
    }
  },
  actions: {
  },
  modules: {
  }
});
