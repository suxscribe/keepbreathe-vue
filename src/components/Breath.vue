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

import BreathGraphContainer from './BreathGraphContainer.vue';

// console.log(BreathContainer)

export default {
  data() {
    return {
      breathDataLocal: breathData,
      breathVisuals: null,
    };
  },
  mounted() {
    this.startBreathVisuals();
  },
  methods: {
    getBreath() {
      return this.$store.getters.getBreath;
    },
    stopBreathVisuals() {
      if (this.breathVisuals !== null) {
        this.breathVisuals.destroy();
        this.breathVisuals = null;
      }
    },
    startBreathVisuals() {
      this.stopBreathVisuals();
      this.breathVisuals = new Visualizer({
        breathPattern: this.breathDataLocal[this.getBreath()].breathPattern,
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
