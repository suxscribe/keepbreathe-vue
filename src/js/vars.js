import cssVars from '../scss/abstract/variables.scss';

export const vars = {
  swiperSpeed: 500,
  scrollOffset: 92,
  breakpointWidthM: 960,
  breakpointWidtnS: 640,

  blocksWrap: '.breath__wrap',
  clsBreathBlock: 'breath__container',
  selectorContainer: '.container',
  selectorText: '.breath__text',
  ball: '.breath__ball',
  ballHeight: parseInt(cssVars.ballSize, 10),
  blocksHeight: parseInt(cssVars.breatheBlockHeight, 10),
  clsActive: 'active',

  inhaleTime: 6,
  holdTime: 2,
  exhaleTime: 7,
  hold2Time: 2,

  timeMultiplier: 50,
  breathTextItems: '.breath__text-item',
  breathTextInhale: '.breath__text-item--inhale',
  breathTextHold1: '.breath__text-item--hold1',
  breathTextExhale: '.breath__text-item--exhale',
  breathTextHold2: '.breath__text-item--hold2',
  // totalTime:
  //   variables.inhaleTime +
  //   variables.holdTime +
  //   variables.exhaleTime +
  //   variables.hold2Time,
};

// todo method to get totalTime
