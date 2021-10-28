import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    selectedBreath: 0,
    locale: 'en-US',
    soundState: true,
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getBreath: (state) => {
      return state.selectedBreath;
    },
    locale: (state) => state.locale,
    getSoundState: (state) => state.soundState,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setBreath(state, payload) {
      state.selectedBreath = payload;
    },
    setLocale(state, payload) {
      state.locale = payload;
    },
    setSoundState(state, payload) {
      state.soundState = payload;
    },
  },
  actions: {},
});
