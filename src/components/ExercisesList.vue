<template lang="pug">
.container
  .exercises 
    include ../pug/utils/mixins.pug
    .exercises__header
      .exercises__header-logo
        img(src='/assets/img/logo.svg')
    .exercises__list 
      .exercises__item(v-for="breath in breathDataLocal", :data-breath-id="breath.id" @click="selectBreath(breath.id)")
        .exercises__item-name {{ breath.id | localizeData('name') }}
        .exercises__item-pattern {{renderPattern(breath.breathPattern)}}

  modal(name='breath-modal', classes='modal__container', height='auto')
    button.modal__close(@click='modalHide')
      +svg({name: 'close'})
    .exercise
      .exercise__name {{ selectedBreathId | localizeData('name') }}
      .exercise__pattern {{renderPattern(breathDataLocal[selectedBreathId].breathPattern)}}
      .exercise__how-long(v-if="renderDuration()", v-html="renderDuration()") 
      .exercise__icons(v-if="renderBreathIcons()", v-html="renderBreathIcons()")
      .exercise__description.exercise__what
        .exercise__what-title.text__h3 {{ 'DescriptionHeader' | localize }}
        .exercise__what-content(v-html="renderDescription()")
      .exercise__how(v-if="renderHowTo()")
        .exercise__how-title.text__h3 {{ 'HowToHeader' | localize }}
        .exercise__how-content(v-html="renderHowTo()")
      .exercise__tips(v-if="renderTips()")
        .exercise__tips-title.text__h3 {{ 'TipsHeader' | localize }}
        .exercise__tips-content(v-html="renderTips()")
      .exercise__buttons
        .button.button--primary(@click='goToBreathe') {{ 'StartButtonText' | localize }}
</template>

<script>
import { breathData } from '../js/breath-data';
import { Visualizer } from '../js/visualizer';
import localizeData from '../filters/localizeData.filter';

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
    renderDescription() {
      return localizeData(this.selectedBreathId, 'description');
    },
    renderTips() {
      return localizeData(this.selectedBreathId, 'tips');
    },
    renderHowTo() {
      return localizeData(this.selectedBreathId, 'howto');
    },
    renderDuration() {
      return '⏱️&nbsp;&nbsp;' + localizeData(this.selectedBreathId, 'duration');
    },
    renderBreathIcons() {
      //return '<img src="/assets/img/breath-icon-inhale-nose.svg" /> <img src="/assets/img/breath-icon-exhale-nose.svg" />';
      const icons = this.breathDataLocal[this.selectedBreathId].icons;
      let iconsHtml = '';

      if (Array.isArray(icons)) {
        icons.forEach((icon) => {
          iconsHtml += `<svg class="breath-icon breath-icon--${icon}">
            <use xlink:href="#breath-icon-${icon}"></use>
          </svg>`;
        });
      }

      return iconsHtml;
    },

    goToBreathe() {
      this.$router.push('/breath');
    },
  },
};
</script>

<style lang="scss" scoped></style>
