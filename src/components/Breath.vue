<template lang="pug">
  .breath__practice
    .breath__text
      .breath__text-item.breath__text-item--inhale Inhale
      .breath__text-item.breath__text-item--hold1 Hold
      .breath__text-item.breath__text-item--exhale Exhale
      .breath__text-item.breath__text-item--hold2 Hold
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
</template>

<script>
import { Visualizer } from '../js/visualizer';
import {breathData} from '../js/breath-data';

import BreathGraphContainer from './BreathGraphContainer.vue'

// console.log(BreathContainer)


export default {
  data () {
    return {
      breathDataLocal: breathData,
      breathVisuals: null,
    }
  },
  mounted () {
    this.startBreathVisuals()
  },
  methods: {
    getBreath() {
      return this.$store.getters.getBreath
    },
    stopBreathVisuals() {
      if (this.breathVisuals !== null) {
        this.breathVisuals.destroy()
        this.breathVisuals = null
        console.log(this.breathVisuals)
        
      }
    },
    startBreathVisuals() {
      this.stopBreathVisuals();
      this.breathVisuals = new Visualizer({
        breathPattern: this.breathDataLocal[this.getBreath()].breathPattern,
      });
    },
  },
  components: {
    BreathGraphContainer
  }
}

</script>

<style lang="scss" scoped>

</style>
