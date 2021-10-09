import { vars } from './vars';
import cssVars from '../scss/abstract/variables.scss';

export class BreathContainer {
  constructor(_options) {
    this.inhaleTime = _options.breathPattern[0];
    this.holdTime = _options.breathPattern[1];
    this.exhaleTime = _options.breathPattern[2];
    this.hold2Time = _options.breathPattern[3];

    this.blockContainer = document.querySelector('.breath__container');

    this.createBlock(this.inhaleTime, 0);
    this.createBlock(this.holdTime, 1);
    this.createBlock(this.exhaleTime, 2);
    this.createBlock(this.hold2Time, 3);
  }

  createBlock(phaseTime, phaseOrder) {
    const phaseWidth = phaseTime * vars.timeMultiplier;
    const phaseBlock = document.createElement('div');
    let phaseName;
    let phaseSvg;

    switch (phaseOrder) {
      case 0:
        phaseName = 'inhale';
        phaseSvg = `<svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient-inhale" gradientTransform="">
            <stop offset="0%"  stop-color="${cssVars.colorGray}" />
            <stop offset="20%"  stop-color="${cssVars.colorInhale}" />
            <stop offset="80%" stop-color="${cssVars.colorInhale}" />
            <stop offset="100%" stop-color="${cssVars.colorGray}" />
          </linearGradient>
        </defs>
        <path class="cls-1" d="M0,${vars.blocksHeight}C${phaseWidth / 2},${
          vars.blocksHeight
        },${phaseWidth / 2},0,${phaseWidth},0"/></svg>`;
        break;
      case 1:
        phaseName = 'hold1';
        phaseSvg = `<svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none"><path class="cls-1" d="M0,0L${phaseWidth},0"/></svg>`;
        break;
      case 2:
        phaseName = 'exhale';
        phaseSvg = `<svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient-exhale" gradientTransform="">
            <stop offset="0%"  stop-color="${cssVars.colorGray}" />
            <stop offset="20%"  stop-color="${cssVars.colorExhale}" />
            <stop offset="80%" stop-color="${cssVars.colorExhale}" />
            <stop offset="100%" stop-color="${cssVars.colorGray}" />
          </linearGradient>
        </defs>
        <path  d="M0,0C${phaseWidth / 2},0,${phaseWidth / 2},${
          vars.blocksHeight
        },${phaseWidth},${vars.blocksHeight}"/></svg>`;
        break;
      case 3:
        phaseName = 'hold2';
        phaseSvg = `<svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none"><path class="cls-1" d="M0,${vars.blocksHeight}L${phaseWidth},${vars.blocksHeight}"/></svg>`;
        break;
      default:
        console.error(`No such phase order '${phaseOrder}'`);
        throw 'Error';
    }

    phaseBlock.classList.add(phaseName, 'breath');
    phaseBlock.style.width = phaseWidth + 'px';
    phaseBlock.innerHTML = phaseSvg;

    this.blockContainer.appendChild(phaseBlock);
  }

  getWidth() {
    const totalTime =
      this.inhaleTime + this.holdTime + this.exhaleTime + this.hold2Time;
    return totalTime * vars.timeMultiplier;
  }

  destroy() {
    this.blockContainer.remove();
  }
}
