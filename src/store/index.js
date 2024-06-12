import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    selectedBreath: 0,
    locale: '', // 'en-US',
    soundState: true,
    hapticState: true,
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
    getHapticState: (state) => state.hapticState,
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
    setHapticState(state, payload) {
      state.hapticState = payload;
      localStorage.hapticState = state.hapticState.toString();
    },
  },
  actions: {
    loadLocale({ commit, dispatch }) {
      const locales = ['ru-RU', 'en-US']; // todo get this array from locales object keys from localize.filter.js

      //if localstorage.locale -> use it. if no - get system language
      const lsLocale = localStorage.locale;

      if (lsLocale) {
        commit('setLocale', locales.includes(lsLocale) ? lsLocale : locales[0]);
      } else {
        const language = window.navigator
          ? window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage
          : locales[0];
        console.log(language);
        commit('setLocale', locales.includes(language) ? language : locales[0]);
      }
    },
    loadSoundState({ commit, dispatch }) {
      commit('setSoundState', localStorage.soundState === 'true');
    },
    loadHapticState({ commit, dispatch }) {
      commit('setHapticState', localStorage.hapticState === 'true');
    },
  },
});
