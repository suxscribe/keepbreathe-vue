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

      if (icons) {
        icons.forEach((icon) => {
          console.log(iconsHtml);
          if (icon === 'inhale-nose') {
            iconsHtml += `<svg class="icon__exhale" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 285">
            <g id="Face_inhale" data-name="Face inhale">
              <path class="icon__inhale-path"
                d="M102.3,13.39s12,24.86,8.08,51.69c7.42,17.19,18.75,29.81,42.86,55.64,7.32,11.27-15.64,19-20,22.25,1.73,5.16,3.38,13.41,9,17.72-1.29,7.75-6.38,11.12-10.26,15,4.31,6,6,9.48,6.46,13.35-3.66,2.91-15.07,13.35-15.07,13.35s18.51,59-40,40.46C64.2,238.32,58,261.35,55.8,270" />
              <line class="icon__inhale-path" x1="36" y1="233.23" x2="80.75" y2="242.38" />
              <line class="icon__inhale-path" x1="116.07" y1="181.42" x2="132" y2="175.68" />
            </g>
            <g id="Arrow_inhale_nose" data-name="Arrow inhale nose">
              <path class="icon__inhale-path" d="M240.58,183.4S197,192.91,159,157.9" />
              <path class="icon__inhale-path" d="M194.05,134.31l-18.76,5.19c47.34,20.65,85.41-2.59,85.41-2.59" />
              <line class="icon__inhale-path" x1="190.93" y1="156.47" x2="175.29" y2="139.5" />
              <polyline class="icon__inhale-path" points="177.37 160.11 159.03 157.9 166.67 178.46" />
            </g>
          </svg>`;
          } else if (icon === 'exhale-nose') {
            iconsHtml += `<svg class="icon__exhale" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 285">
            <g id="Face_exhale_nose" data-name="Face exhale nose">
              <path class="icon__exhale-path"
                d="M102.3,14s12,24.86,8.08,51.7c7.42,17.18,18.75,29.81,42.86,55.64,7.32,11.26-15.64,19-20,22.24,1.73,5.17,3.38,13.42,9,17.72-1.29,7.75-6.38,11.12-10.26,15,4.31,6,6,9.47,6.46,13.34C134.8,192.52,123.39,203,123.39,203s18.51,59-40,40.47C64.2,238.91,58,261.94,55.8,270.55" />
              <line class="icon__exhale-path" x1="36" y1="233.81" x2="80.75" y2="242.97" />
              <line class="icon__exhale-path" x1="116.07" y1="182.01" x2="132" y2="176.27" />
            </g>
            <g id="Arrow_exhale_nose" data-name="Arrow exhale nose">
              <path class="icon__exhale-path" d="M171.7,157.86s31.12,31.95,82.1,23.68" />
              <path class="icon__exhale-path" d="M237.85,135.89l18.75,5.19c-47.33,20.65-85.4-2.59-85.4-2.59" />
              <line class="icon__exhale-path" x1="240.97" y1="158.04" x2="256.6" y2="141.08" />
              <polyline class="icon__exhale-path" points="237.28 173.27 253.8 181.54 236.09 194.47" />
            </g>
          </svg>`;
          }
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
