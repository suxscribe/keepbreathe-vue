<template lang="pug">
.breath__container(:class='`${getBreathId()}`', :style='cssProps')
  .breath.inhale(:style='`${breathPhaseStyle(0)}`')
    svg(xmlns='http://www.w3.org/2000/svg', preserveaspectratio='none')
      defs
        linearGradient#gradient-inhale(gradientTransform='')
          stop(offset='0%', :stop-color='`${colors.colorGray}`')
          stop(offset='20%', :stop-color='`${colors.colorInhale}`')
          stop(offset='80%', :stop-color='`${colors.colorInhale}`')
          stop(offset='100%', :stop-color='`${colors.colorGray}`')
      path(:d='`M0,${blocksHeight}C${breathPhaseWidth(0) / 2},${blocksHeight},${breathPhaseWidth(0) / 2},0,${breathPhaseWidth(0)},0`')

  .breath.hold1(:style='`${breathPhaseStyle(1)}`')
    svg(xmlns='http://www.w3.org/2000/svg', preserveaspectratio='none')
      path.cls-1(:d='`M0,0L${breathPhaseWidth(1)},0`')

  .breath.exhale(:style='`${breathPhaseStyle(2)}`')
    svg(xmlns='http://www.w3.org/2000/svg', preserveaspectratio='none')
      defs
        linearGradient#gradient-exhale(gradientTransform='')
          stop(offset='0%', :stop-color='`${colors.colorGray}`')
          stop(offset='20%', :stop-color='`${colors.colorExhale}`')
          stop(offset='80%', :stop-color='`${colors.colorExhale}`')
          stop(offset='100%', :stop-color='`${colors.colorGray}`')
      path(:d='`M0,0C${breathPhaseWidth(2) / 2},0,${breathPhaseWidth(2) / 2},${blocksHeight},${breathPhaseWidth(2)},${blocksHeight}`')

  .breath.hold2(:style='`${breathPhaseStyle(3)}`')
    svg(xmlns='http://www.w3.org/2000/svg', preserveaspectratio='none')
      path.cls-1(:d='`M0,${blocksHeight}L${breathPhaseWidth(3)},${blocksHeight}`')

</template>

<script>
import { breathData } from '../js/breath-data';
import { vars } from '../js/vars';
import cssVars from '../scss/abstract/variables.scss';

export default {
  data() {
    return {
      breathDataLocal: breathData,
      phaseWidth: 0,
      blocksHeight: vars.blocksHeight,
      colors: cssVars,
    };
  },
  mounted() {},
  methods: {
    calculateWidth(duration) {
      return duration * vars.timeMultiplier;
    },
    getBreathId() {
      return this.$store.getters.getBreath;
    },
    getTime(phase) {
      return breathData[this.getBreathId()].breathPattern[phase];
    },
    breathPhaseStyle(phase) {
      return {
        width: `${this.calculateWidth(this.getTime(phase))}px`,
      };
    },
    breathPhaseWidth(phase) {
      return this.calculateWidth(this.getTime(phase));
    },
  },
  computed: {
    cssProps() {
      return {
        '--inhale-width': this.breathPhaseWidth(0) + 'px',
        '--hold1-width': this.breathPhaseWidth(1) + 'px',
        '--exhale-width': this.breathPhaseWidth(2) + 'px',
        '--hold2-width': this.breathPhaseWidth(3) + 'px',
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
