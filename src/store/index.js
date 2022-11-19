import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    selectedBreath: 0,
    locale: '', // 'en-US',
    soundState: true,
    appVersion: '0.0.0',
    packageVersion: process.env.PACKAGE_VERSION || '0',
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
    getAppVersion: (state) => state.packageVersion,
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
      localStorage.locale = state.locale; // save locale to localStorage
    },
    setSoundState(state, payload) {
      state.soundState = payload;
      localStorage.soundState = state.soundState.toString();
    },
  },
  actions: {
    loadLocale({ commit, dispatch }) {
      const locales = ['ru-RU', 'en-US']; // todo get this array from locales object keys from localize.filter.js

      const data = localStorage.locale;
      commit('setLocale', locales.includes(data) ? data : locales[0]);
    },
    loadSoundState({ commit, dispatch }) {
      console.log(localStorage.soundState);

      commit('setSoundState', localStorage.soundState === 'true');
    },
  },
});
