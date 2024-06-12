<template lang="pug">
header.header
  .header__right
    a.header__lang-switch(href="#",@click="switchLocale") {{ 'LocaleTitle' | localize }}
    a.header__sound-switch(href="#",@click="switchSound") Sound {{ renderSoundSwitch() }}
    a.header__haptic-switch(href="#",@click="switchHaptic") Vibrate {{ renderHapticSwitch() }}
</template>

<script>
export default {
  data() {
    return {
      locale: null,
      soundState: true,
      hapticState: false,
    };
  },
  mounted() {
    this.locale = this.getLocale();
    this.soundState = this.getSoundState();
    this.hapticState = this.getHapticState();
  },
  methods: {
    getLocale() {
      return this.$store.getters.locale;
    },
    getSoundState() {
      return this.$store.getters.getSoundState;
    },
    getHapticState() {
      return this.$store.getters.getHapticState;
    },
    renderSoundSwitch() {
      return this.soundState ? 'ON' : 'OFF';
    },
    renderHapticSwitch() {
      return this.hapticState ? 'ON' : 'OFF';
    },

    switchLocale(e) {
      e.preventDefault();
      if (this.getLocale() === 'en-US') this.locale = 'ru-RU';
      else this.locale = 'en-US';
      this.$store.commit('setLocale', this.locale);
    },
    switchSound(e) {
      e.preventDefault();
      this.soundState = this.soundState ? false : true;
      this.$store.commit('setSoundState', this.soundState);
    },
    switchHaptic(e) {
      this.hapticState = this.hapticState ? false : true;
      this.$store.commit('setHapticState', this.hapticState);
    },
  },
};
</script>

<style></style>
