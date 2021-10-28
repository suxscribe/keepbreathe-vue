<template lang="pug">
  header.header
    .header__right
      a.header__lang-switch(href="#",@click="switchLocale") {{ 'LocaleTitle' | localize }}
      a.header__sound-switch(href="#",@click="switchSound") Sound {{ renderSoundSwitch() }}
</template>

<script>
export default {
  data() {
    return {
      locale: null,
      soundState: true,
    };
  },
  mounted() {
    this.locale = this.getLocale();
    this.soundState = this.getSoundState();
  },
  methods: {
    getLocale() {
      return this.$store.getters.locale;
    },
    getSoundState() {
      return this.$store.getters.getSoundState;
    },
    renderSoundSwitch() {
      if (this.soundState) {
        return 'ON';
      } else {
        return 'OFF';
      }
    },

    switchLocale(e) {
      e.preventDefault();
      if (this.getLocale() === 'en-US') this.locale = 'ru-RU';
      else this.locale = 'en-US';
      this.$store.commit('setLocale', this.locale);
    },
    switchSound(e) {
      e.preventDefault();
      console.log(this.soundState);

      this.soundState = this.soundState ? false : true;

      this.$store.commit('setSoundState', this.soundState);
      // todo get sound status from store and switch it
    },
  },
};
</script>

<style></style>
