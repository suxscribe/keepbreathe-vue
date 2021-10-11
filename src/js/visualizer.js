import gsap from 'gsap';
import { vars } from './vars';

export class Visualizer {
  constructor(_options) {
    this.breathTextItemsElements = document.querySelectorAll(
      vars.breathTextItems
    );

    this.breathTextInhaleElement = document.querySelector(
      vars.breathTextInhale
    );
    this.breathTextHold1Element = document.querySelector(vars.breathTextHold1);
    this.breathTextExhaleElement = document.querySelector(
      vars.breathTextExhale
    );
    this.breathTextHold2Element = document.querySelector(vars.breathTextHold2);

    this.inhaleTime = _options.breathPattern[0];
    this.holdTime = _options.breathPattern[1];
    this.exhaleTime = _options.breathPattern[2];
    this.hold2Time = _options.breathPattern[3];

    this.counter = 0;
    this.startTime = new Date();
    this.elapsedTime = 0;
    this.timeInterval = null;

    this.ballElement = document.querySelector(vars.ball);
    this.blockWrapEl = document.querySelector(vars.blocksWrap);

    this.timerElement = document.querySelector('.breath__timer');
    this.counterElement = document.querySelector('.breath__counter-count');

    this.timelineBlocks = new gsap.timeline({ repeat: -1 });
    this.timelineBall = new gsap.timeline({ repeat: -1 });

    if (
      this.breathTextInhaleElement &&
      this.breathTextHold1Element &&
      this.breathTextExhaleElement &&
      this.breathTextHold2Element &&
      this.ballElement
    ) {
      this.setBallAnimation();
    }
    if (this.blockWrapEl) this.setBreathAnimation(); //start animation

    this.updateTime();
  }

  setBallAnimation() {
    const ballTopY = -vars.blocksHeight + vars.ballHeight / 2;
    const ballBottomY = vars.ballHeight / 2;

    this.timelineBall.to(this.ballElement, {
      duration: this.inhaleTime,
      ease: 'power1.inOut',
      y: ballTopY,
      onStart: () => {
        this.breathTextInhaleElement.classList.add('active');
      },
      onComplete: () => {
        this.removeBreathTextClasses();
      },
    });
    this.timelineBall.to(this.ballElement, {
      duration: this.holdTime,
      ease: 'power1.inOut',
      y: ballTopY,
      onStart: () => {
        this.breathTextHold1Element.classList.add('active');
      },
      onComplete: () => {
        this.removeBreathTextClasses();
      },
    });
    this.timelineBall.to(this.ballElement, {
      duration: this.exhaleTime,
      ease: 'power1.inOut',
      y: ballBottomY,
      onStart: () => {
        this.breathTextExhaleElement.classList.add('active');
      },
      onComplete: () => {
        this.removeBreathTextClasses();
      },
    });
    this.timelineBall.to(this.ballElement, {
      duration: this.hold2Time,
      ease: 'power1.inOut',
      y: ballBottomY,
      onStart: () => {
        this.breathTextHold2Element.classList.add('active');
      },
      onComplete: () => {
        this.removeBreathTextClasses();
        this.increaseCounter();
        this.updateCounter();
      },
    });
  }

  setBreathAnimation() {
    const totalTime =
      this.inhaleTime + this.holdTime + this.exhaleTime + this.hold2Time;
    const breathBlockWidth = totalTime * vars.timeMultiplier;

    this.timelineBlocks.to(this.blockWrapEl, {
      duration: totalTime,
      ease: 'linear',
      x: breathBlockWidth * -1,
    });
  }

  getElapsedTime() {
    const now = new Date();
    const timeDiff = now - this.startTime;
    this.elapsedTime = new Date(timeDiff);

    this.timerElement.innerHTML = this.elapsedTime.toISOString().substr(14, 5);
  }
  updateTime() {
    this.timeInterval = setInterval(this.getElapsedTime.bind(this), 1000);
  }

  increaseCounter() {
    this.counter += 1;
  }
  updateCounter() {
    this.counterElement.innerHTML = this.counter;
  }

  removeBreathTextClasses() {
    this.breathTextItemsElements.forEach((item) =>
      item.classList.remove('active')
    );
  }

  destroy() {
    this.timelineBall.kill();
    this.timelineBlocks.kill();
    this.timelineBall = null;
    this.timelineBlocks = null;

    delete this.blockWrapEl._gsap;
    delete this.ballElement._gsap;

    this.blockWrapEl.style = '';
    this.ballElement.style = '';

    clearInterval(this.timeInterval);

    this.removeBreathTextClasses();
  }
}
