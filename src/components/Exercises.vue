<template lang="pug">
  .container
    include ../pug/utils/mixins.pug
    .exercises__header
      .exercises__header-logo
        img(src='/assets/img/logo.svg')
    .exercises 
      .exercises__list 
        .exercises__item(v-for="breath in breathDataLocal", :data-breath-id="breath.id" @click="selectBreath(breath.id)")
          .exercises__item-name {{breath.name}}
          .exercises__item-pattern {{renderPattern(breath.breathPattern)}}
      div {{ 0 | localizeData('name') }}

    modal(name='breath-modal', classes='modal__container', height='auto')
      button.modal__close(@click='modalHide')
        +svg({name: 'close'})
      .exercise 
        .exercise__name {{breathDataLocal[selectedBreathId].name}} 
        .exercise__pattern {{renderPattern(breathDataLocal[selectedBreathId].breathPattern)}}
        .exercise__description {{breathDataLocal[selectedBreathId].description}} 
        .exercise__buttons
          .button.button--primary(@click='goToBreathe') {{ 'StartButtonText' | localize }}
</template>

<script>
import { breathData } from '../js/breath-data';
import { Visualizer } from '../js/visualizer';

export default {
  data() {
    return {
      selectedBreathId: 0,
      breathDataLocal: breathData,
      breathVisuals: null,
    };
  },
  mounted() {},
  methods: {
    renderPattern(pattern) {
      return pattern.join(' — ');
    },
    modalShow() {
      this.$modal.show('breath-modal');
    },
    modalHide() {
      this.$modal.hide('breath-modal');
    },
    selectBreath(id) {
      this.selectedBreathId = id;
      // console.log(this.selectedBreathId);
      this.stopBreathVisuals();
      this.setBreath();
      this.modalShow();
    },
    getBreath() {
      // get breath id from store
      return this.$store.getters.getBreath;
    },
    setBreath() {
      // set breath id to store
      this.$store.commit('setBreath', this.selectedBreathId);
    },
    stopBreathVisuals() {
      if (this.breathVisuals !== null) {
        this.breathVisuals.destroy();
        this.breathVisuals = null;
        console.log(this.breathVisuals);
      }
    },
    startBreathVisuals() {
      this.stopBreathVisuals();
      this.breathVisuals = new Visualizer({
        breathPattern: this.breathDataLocal[this.getBreath()].breathPattern,
      });
    },
    goToBreathe() {
      this.$router.push('/breath');
    },
  },
};
</script>

<style lang="scss" scoped></style>
