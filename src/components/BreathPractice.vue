<template lang="pug">
.breath__practice
  .breath__text
    .breath__countdown.active 3
    .breath__text-item.breath__text-item--inhale {{ 'InhaleText' | localize }}
    .breath__text-item.breath__text-item--hold1 {{ 'HoldText' | localize }}
    .breath__text-item.breath__text-item--exhale {{ 'ExhaleText' | localize }}
    .breath__text-item.breath__text-item--hold2 {{ 'HoldText' | localize }}
  .breath__visualizer
    .breath__ball
    .breath__wrap
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
      BreathGraphContainer
  .breath__timer 00:00
  .breath__counter 
    | {{ 'CycleLabel' | localize }} 
    span.breath__counter-count 0
</template>

<script>
import { Visualizer } from '../js/visualizer';
import { breathData } from '../js/breath-data';

import NoSleep from '@uriopass/nosleep.js';

import BreathGraphContainer from './BreathGraphContainer.vue';

// console.log(BreathContainer)

export default {
  data() {
    return {
      breathDataLocal: breathData,
      breathVisuals: null,
      noSleep: new NoSleep(),
    };
  },
  mounted() {
    this.startBreathVisuals();
  },
  computed: {},
  methods: {
    getBreath() {
      return this.$store.getters.getBreath;
    },
    getSoundState() {
      return this.$store.getters.getSoundState;
    },
    getHapticState() {
      return this.$store.getters.getHapticState;
    },
    stopBreathVisuals() {
      this.noSleep.disable(); // allow screen to sleep

      if (this.breathVisuals !== null) {
        this.breathVisuals.destroy();
        this.breathVisuals = null;
      }
    },
    startBreathVisuals() {
      // this.stopBreathVisuals();

      this.noSleep.enable(); // prevent screen sleep while in practice
      // ! nosleep.js should have fix for Opera on Android:
      // window.navigator.userAgent.indexOf("Samsung" && "OPR") === -1;
      // https://github.com/Uriopass/NoSleep.js/pull/2

      this.breathVisuals = new Visualizer({
        breathPattern: this.breathDataLocal[this.getBreath()].breathPattern,
        isSound: this.getSoundState(),
        isHaptic: this.getHapticState(),
      });
    },
  },
  beforeDestroy() {
    this.stopBreathVisuals();
  },
  components: {
    BreathGraphContainer,
  },
};
</script>

<style lang="scss" scoped></style>
