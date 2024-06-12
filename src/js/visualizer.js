import gsap from 'gsap';
import { vars } from './vars';

export class Visualizer {
  constructor(_options) {
    // text elements
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

    // breath durations
    this.inhaleTime = _options.breathPattern[0];
    this.holdTime = _options.breathPattern[1];
    this.exhaleTime = _options.breathPattern[2];
    this.hold2Time = _options.breathPattern[3];

    // audio
    this.audio = document.createElement('audio');
    this.audio.src = '/assets/sounds/chime.ogg';
    this.isSound = _options.isSound;
    this.isVibro = _options.isHaptic; // todo pass vibro setting here

    // misc
    this.isActive = false; // if exercise active
    this.counter = 0;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timeInterval = null;
    this.startDelay = 3;
    this.startDelayRemaining = this.startDelay;

    // elements
    this.ballElement = document.querySelector(vars.ball);
    this.blockWrapEl = document.querySelector(vars.blocksWrap);

    this.timerElement = document.querySelector('.breath__timer');
    this.counterElement = document.querySelector('.breath__counter-count');

    this.countdownElement = document.querySelector('.breath__countdown');

    // start
    this.countdown();
    this.countdownTimer = setInterval(this.countdown.bind(this), 1000);
    this.startTimeout = setTimeout(this.startEverything.bind(this), 3000);
  }

  setBallAnimation() {
    const ballTopY = -vars.blocksHeight + vars.ballHeight / 2;
    const ballBottomY = vars.ballHeight / 2;

    this.timelineBall.to(this.ballElement, {
      duration: this.inhaleTime,
      ease: 'power1.inOut',
      y: ballTopY,
      onStart: () => {
        this.breathTextInhaleElement.classList.add(vars.clsActive);
        this.playSound(this.inhaleTime);
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
        this.breathTextHold1Element.classList.add(vars.clsActive);
        this.playSound(this.holdTime);
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
        this.breathTextExhaleElement.classList.add(vars.clsActive);
        this.playSound(this.exhaleTime);
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
        this.breathTextHold2Element.classList.add(vars.clsActive);
        this.playSound(this.hold2Time);
      },
      onComplete: () => {
        this.removeBreathTextClasses();
        this.increaseCounter();
        this.updateCounterElement();
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
  updateCounterElement() {
    this.counterElement.innerHTML = this.counter;
  }

  removeBreathTextClasses() {
    this.breathTextItemsElements.forEach((item) =>
      item.classList.remove(vars.clsActive)
    );
  }

  playSound(duration) {
    if (this.isSound) {
      setTimeout(() => {
        if (this.isActive) {
          this.audio.play();
        }
      }, duration * 1000 - 500); // play audio at the end of current breath part minus delay to position the beep properly
    }
    if (this.isVibro) {
      navigator.vibrate([100]);
    }
  }

  startEverything() {
    this.startTime = new Date();
    this.timelineBlocks = new gsap.timeline({ repeat: -1 });
    this.timelineBall = new gsap.timeline({ repeat: -1 });
    this.isActive = true;

    if (
      this.breathTextInhaleElement &&
      this.breathTextHold1Element &&
      this.breathTextExhaleElement &&
      this.breathTextHold2Element &&
      this.ballElement &&
      this.blockWrapEl
    ) {
      this.setBallAnimation(); //start animation
      this.setBreathAnimation();
      this.updateTime();
    }
  }
  countdown() {
    this.countdownElement.innerHTML = this.startDelayRemaining;
    this.startDelayRemaining -= 1;

    if (this.startDelayRemaining < 0) {
      this.countdownElement.innerHTML = '';
      this.countdownElement.classList.remove(vars.clsActive);
      clearInterval(this.countdownTimer);
    }
  }

  destroy() {
    this.timelineBall?.kill();
    this.timelineBlocks?.kill();
    this.timelineBall = null;
    this.timelineBlocks = null;

    delete this.blockWrapEl._gsap;
    delete this.ballElement._gsap;

    this.blockWrapEl.style = '';
    this.ballElement.style = '';

    clearInterval(this.timeInterval);
    clearTimeout(this.startTimeout);

    this.removeBreathTextClasses();
    this.isActive = false;
  }
}
