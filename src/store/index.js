import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    selectedBreath: 0,
    locale: 'ru-RU',
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getBreath: (state) => {
      return state.selectedBreath;
    },
    locale: (state) => state.locale,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setBreath(state, payload) {
      state.selectedBreath = payload;
    },
  },
  actions: {},
});
